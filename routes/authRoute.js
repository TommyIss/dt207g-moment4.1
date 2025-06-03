/**
 * Route för autentisering
 */
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
require('dotenv').config();

// Anslut till MongoDB
mongoose.set('strictQuery', false);
mongoose.connect(process.env.DATABASE).then(() => {
    console.log('Ansluten till MongoDB');
}).catch((error) => {
    console.error('Fel vid anslutning till databas: ' + error);
});

router.post('/register', async(req, res) => {
    try {
        let {username , email, password} = req.body;
        
        // Validera input
        if(!username || !password || !email) {
            return res.status(400).json({error: 'Fel input! Skicka användarnamn, e-post samt lösenord'});
        } 

        res.status(201).json({message: 'Användaren är skapad'});
    } catch(error) {
        res.status(500).json({error: 'Server fel'});
    }
    
});

module.exports = router;