/**
 * Moment 4 uppgift 1
 */
let express = require('express');
let bodyParser = require('body-parser');
let authRoute = require('./routes/authRoute');
let jwt = require('jsonwebtoken');
require('dotenv').config();

let app = express();
app.use(bodyParser.json());

let port = process.env.PORT || 3000;

// Routes
app.use('/', authRoute);

// Starta applikationen
app.listen(port, () => {
    console.log('Server is running on port: ' + port);
});