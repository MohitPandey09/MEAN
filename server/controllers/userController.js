const User = require('../schema/user');
const Validator = require('../shared/helpers/validate');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// COMMENT: USER REGISTER HANDLER
module.exports.register = async (req, res, next) => {
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
    
    const validate = Validator(req.body, rules, {});
    if (!validate) {
        return res.json({
            statusCode: 0,
            msgCode: 412,
            message: 'Validation failed',
            responseData: validate
        });
    }
    try {
        const saltRounds = 10;
        let hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
        const user = new User({
            role: 1,
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
        let savedUser = await user.save();
        if (savedUser) {
            res.status(200).json({
                statusCode: 1,
                message: 'Registered successfully'
            });
        } else {
            res.json({
                statusCode: 0,
                msgCode: 420,
                message: savedUser
            });
        }     
    } catch (error) {
        console.log('Server error: ', error);
        next(new Error('Server error, Something was wrong!'));
    }
};

// COMMENT: USER LOGIN HANDLER
module.exports.login = async (req, res, next) => {
    var user = {
        email: req.body.email,
        password: req.body.password
    };
	var rules = {
		email: 'required|email',
		password: 'required' 
    };

    let validate = Validator(user, rules, {});
    if (!validate) {
        return res.json({
            statusCode: 0,
            msgCode: 412,
            message: 'Validation failed',
            responseData: err
        });
    }
    try {
        const userFound = await User.findOne({ email: user.email, role: 2 }).select("+password").exec();
        if (userFound === null) {
            res.json({
                statusCode: 0,
                msgCode: 412,
                message: 'Invalid Email'
            });
        } else{
            const isMatch = await bcrypt.compare(user.password, userFound.password);
            if (isMatch) {
                jwt.sign(user, process.env.APP_SECRET_KEY, { expiresIn: 600000 }, (error, token) => {
                    if (error) console.log('JWT Error: ', error);
                    else {
                        let userData = {
                            id: userFound._id,
                            name: userFound.name,
                            email: userFound.email
                        }
                        res.status(200).json({
                            statusCode: 1,
                            message: 'Login successful',
                            responseData: { token: token, userData: userData }
                        });
                    }
                });
            } else {
                return res.json({
                    statusCode: 0,
                    msgCode: 412,
                    message: 'Invalid Password'
                });
            }
        }
    } catch (error) {
        console.log('Server Error: ', error);
        next(new Error('Server Error, Something was wrong!'));
    }
}
