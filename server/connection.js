const mongoose = require('mongoose');

mongoose.connect(process.env.APP_DB_URL , {
	useNewUrlParser: true,
	useUnifiedTopology: true
});

const connection = mongoose.connection;
connection.on('error', console.error.bind(console, 'Connection error: '));
connection.once('open', function() {
    console.log('Connected to MongoDB Database');
});

module.exports = connection;

// ---------------sql connection---------------

// var mysql = require('mysql');

// let connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: 'root',
//     database: 'ecommerce'
// });

// connection.connect(function(err) {
//     if (!!err)
//         console.log('Error -> ' + err);
//     else
//         console.log("Connected!");
// });
