/**
 * Moment 4 uppgift 1
 */
let express = require('express');
let bodyParser = require('body-parser');
let jwt = require('jsonwebtoken');
require('dotenv').config();

let app = express();
app.use(bodyParser.json());

let port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log('Server is running on port: ' + port);
});