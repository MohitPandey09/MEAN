const User = require('../schema/user');
const userModel = require('../services/userModel');
const Validator = require('../shared/helpers/validate');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// COMMENT: USER REGISTER HANDLER
module.exports.register = (req, res) => {
	var rules = {
		name: 'required',
		email: 'required|email',
		password: 'required',
        city: 'required',
        state: 'required',
        zip: 'required',
        country: 'required',
        mobile: 'required',
        address: 'required'
    };
    
    Validator(req.body, rules, {}, (err, status) => {
        if (!status) {
            return res.json({
                statusCode: 0,
                msgCode: 412,
                message: 'Validation failed',
                responseData: err
            });
        }
        const saltRounds = 10;
        let hashedPassword = bcrypt.hash(req.body.password, saltRounds);
        const user = new User({
            role: 4,
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
            address: req.body.address,
            city: req.body.city,
            state: req.body.state,
            zip: req.body.zip,
            country: req.body.country,
            mobile: req.body.mobile,
            email_verified: 0
        });
        let savedUser = user.save();
        try{
            if (savedUser) {
                res.status(200).json({
                    statusCode: 1,
                    message: 'Registered successfully',
                    responseData: null
                });
            } else {
                res.json({
                    statusCode: 0,
                    msgCode: 420,
                    message: savedUser,
                    responseData: null
                });
            }
        } catch(err) {
            console.log('Server error: ', err);
			next(new Error('Invalid request'));
        }
    });
};

// COMMENT: USER LOGIN HANDLER
module.exports.login = async (req, res) => {
    var user = {
        email: req.body.email,
        password: req.body.password
    };
	var rules = {
		email: 'required|email',
		password: 'required' 
    };

    Validator(user, rules, {}, (err, status) => {
        if (!status) {
            return res.json({
                statusCode: 0,
                msgCode: 412,
                message: 'Validation failed',
                responseData: err
            });
        }
        userModel.login(user).then((dbResponse) => {
            if (!dbResponse) {
                res.json({
                    statusCode: 0,
                    msgCode: 420,
                    message: 'Invalid Credentials',
                    responseData: null
                });
            } else {
                jwt.sign(user, process.env.APP_SECRET_KEY, { expiresIn: 600000 }, (error, token) => {
                    if (error) console.log('JWT Error: ', error);
                    else {
                        let userData = {
                            id: dbResponse._id,
                            name: dbResponse.name,
                            email: dbResponse.email
                        }
                        res.status(200).json({
                            statusCode: 1,
                            message: 'Login successful',
                            responseData: { token: token, userData: userData }
                        });
                    }
                });
            }
        }).catch((error) => {
            console.log('Server Error: ', error);
			next(new Error('Invalid request'));
        });
    });
}
