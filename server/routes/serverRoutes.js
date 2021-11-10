const express = require('express');
const router = express.Router();

var connection = require('../connection');

router.post('/create', function(req, res) {
    console.log("hi");
    let data = [
        req.body.fname,
        req.body.lname,
        req.body.email,
        req.body.password,
        req.body.city,
        req.body.state,
        req.body.zip,
        req.body.country,
        req.body.mobile,
        req.body.address,
        0
    ];
    let sql = `INSERT INTO users(first_name, last_name, email, password, city, state, zip, country, mobile, address, 
        email_verified) VALUES (?)`;

    connection.query(sql, [data], function(err) {
        if(err)
            res.status(500).send( {errorMsg: err} );
        res.status(200).send( {successMsg: "1 record created."} )
    });
});

router.get('/read', function(req, res) {
    let sql = `SELECT * from users`;

    connection.query(sql, function(err, result) {
        if(err)
            res.status(500).send( {errorMsg: err} );
        res.status(200).send( {data: result} );
    });
});

router.put('/update', function(req, res) {
    var id = req.body.id;

    let sql =  `UPDATE users SET first_name = '${req.body.fname}', last_name = '${req.body.lname}', 
        email = '${req.body.email}', password = '${req.body.password}', city = '${req.body.city}', 
        state = '${req.body.state}', zip = '${req.body.zip}', country = '${req.body.country}', 
        address = '${req.body.address}' WHERE user_id = ${id}`;

        connection.query(sql, function(err) {
            if(err)
                res.status(500).send( {errorMsg: err} );
            res.status(200).send( {successMsg: "1 record updated"} );
        });
});

router.delete('/delete/:id', function(req, res) {
    var id = req.params.id;
    let sql = `DELETE FROM users WHERE user_id = ${id}`;

    connection.query(sql, function(err) {
        if(err)
            res.status(500).send( {errorMsg: err} );
        res.status(200).send( {successMsg: "1 record deleted"} );
    });
});

module.exports = router;
