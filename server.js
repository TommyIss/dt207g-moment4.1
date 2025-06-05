/**
 * Moment 4 uppgift 1
 */
let express = require('express');
let cors = require('cors');
let bodyParser = require('body-parser');
let authRoute = require('./routes/authRoute');
let jwt = require('jsonwebtoken');
require('dotenv').config();

let app = express();
app.use(bodyParser.json());
app.use(cors());

let port = process.env.PORT || 3000;

// Routes
app.use('/', authRoute);

// Användare
let User = require('./models/User');

// Skyddad route
app.get('/protected/:email', authenticateToken, async(req, res) => {
    let email = req.params.email;

    try {
        let result = await User.findOne({email: email});
        return res.json({result});
    } catch(error){
        return res.status(500).json(error);
    }
    
});

function authenticateToken(req, res, next) {
    let authHeaders = req.headers['authorization'];
    let token = authHeaders && authHeaders.split(' ')[1]; 

    if(token === null) {
        res.status(401).json({message: 'Obehörig för denna route - token saknas'});
    }
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, email) => {
        if(err) {return res.status(403).json({message: 'Felaktigt JWT'})}

        req.email = email;
        next();
    });
}

// Starta applikationen
app.listen(port, () => {
    console.log('Server is running on port: ' + port);
});