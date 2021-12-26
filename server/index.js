const express = require('express');
const app  = express();
const http = require('http');
const dotenv = require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const bodyParser = require('body-parser');
const apiRoutes = require('./routes/apiRoute');
const cors = require('cors');

const port =  process.env.PORT || 3000;

app.use( bodyParser.urlencoded({ extended: true }) );
app.use( bodyParser.json() );

app.use(cors());
app.use('/api', apiRoutes);

app.use( (req, res, next) => {
    const err = new Error('Not found');
    err.status = 404;
    next(err);
});

app.use( (err, req, res, next) => {
    res.status(err. status || 500);
    res.send({
        error: {
            status: err.status || 500,
            message: err.message
        }
    });
});

http.createServer(app).listen(port);

console.log('Server listening to : ', port);
