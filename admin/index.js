const express = require('express');
const app = express();
const http = require('http');
const bodyParser = require('body-parser')
const adminRoutes = require('./routes/adminRoutes');
const path = require("path");
const cors = require('cors');
const port = process.env.PORT || 3002;
const dotenv = require('dotenv').config();
require('./config/connection.js');

app.set('view engine', 'ejs');

app.use(cors())
app.use( bodyParser.urlencoded({ extended: true }) );
app.use( bodyParser.json() );

app.use('/admin', adminRoutes);
app.use(express.static(path.join(__dirname,'public')));

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
console.log('Server listening to: ', port)