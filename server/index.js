const express = require('express');
const app  = express();
const http = require('http');
const dotenv = require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const passport = require('passport');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require("path")
const apiRoutes = require('./routes/apiRoute');
const adminRoutes = require('./routes/adminRoute');
require('./config/connection')

const port =  process.env.PORT || 3000;

app.set('view engine', 'ejs');

// COMMENT: middlewares
app.use( bodyParser.urlencoded({ extended: false }) );
app.use( bodyParser.json() );
app.use( cors() );

app.use('/api', apiRoutes);
app.use('/admin', adminRoutes);

app.use(express.static(path.join(__dirname,'public')));
app.use( passport.initialize() );

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
