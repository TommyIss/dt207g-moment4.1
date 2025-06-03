/**
 * Route för autentisering
 */
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let jwt = require('jsonwebtoken');
require('dotenv').config();

// Anslut till MongoDB
mongoose.set('strictQuery', false);
mongoose.connect(process.env.DATABASE).then(() => {
    console.log('Ansluten till MongoDB');
}).catch((error) => {
    console.error('Fel vid anslutning till databas: ' + error);
});

// Användare model
let User = require('../models/User');

router.post('/register', async(req, res) => {
    try {
        let {username , email, password} = req.body;
        
        // Validera input
        if(!username || !password || !email) {
            return res.status(400).json({error: 'Fel input! Skicka användarnamn, e-post samt lösenord'});
        } 

        // Rätt inmatning - spara
        let user = new User({username, email, password});
        await user.save();
        res.status(201).json({message: 'Användaren är skapad'});
    } catch(error) {
        res.status(500).json({error: 'Server fel'});
    }
    
});

router.post('/login', async(req, res) => {
    try {
        let { email, password } = req.body;

        // Validera input
        if(!email || !password) {
            return res.status(400).json({error: 'Fel input! Du måste fylla både e-post samt lösenordet'});
        }

        let user = await User.findOne({ email });
        if(!user) {
            return res.status(401).json({error: 'Felaktigt e-post/lösenord'});
        }
        // Kontrollera lösenordet
        let isPasswordMatched = await user.comparePassword(password);
        if(!isPasswordMatched) {
            return res.status(401).json({error: 'Felaktigt e-post/lösenord'});
        } else {
            // Skapa JWT
            let payload = {email: email};
            let token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {expiresIn: '1h'});
            let response = {
                message: 'Användare är inloggad',
                token: token
            }
            res.status(200).json({ response });
        }

    } catch (error) {
        res.status(500).json({error: 'Server fel'});
    }
});

module.exports = router;