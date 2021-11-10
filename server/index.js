var express = require('express');
var app  = express();
var http = require('http');
var dotenv = require('dotenv');
dotenv.config();

var bodyParser = require('body-parser');
var apiRoutes = require('./routes/apiRoute');
var cors = require('cors');

var port =  process.env.PORT || 3000;

app.use( bodyParser.urlencoded({ extended: true }) );
app.use( bodyParser.json() );

app.use(cors());
app.use('/api', apiRoutes);

app.use( (req, res, next) => {

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
