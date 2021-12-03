const userModel = require('../services/userModel');
const Validator = require('../shared/helpers/validate');
const jwt = require('jsonwebtoken');

// COMMENT: USER REGISTER HANDLER
module.exports.register = (req, res) => {
	var user = {
		name: req.body.name,
		email: req.body.email,
		password: req.body.password,
		city: req.body.city,
		state: req.body.state,
		zip: req.body.zip,
		country: req.body.country,
		mobile: req.body.mobile,    
		address: req.body.address
	};
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
    
    Validator(user, rules, {}, async (err, status) => {
        if (!status) {
            res.json({
                status: 0,
                msgCode: 412,
                message: 'Validation failed',
                responseData: err
            });
        } else {
            try{
                let savedUser = await userModel.saveUser(user);
                console.log('user save response-> ', savedUser);
                if (savedUser) {
                    res.status(200).json({
                        status: 1,
                        message: 'Registered successfully',
                        responseData: {}
                    });
                } else {
                    res.json({
                        status: 0,
                        msgCode: 420,
                        message: savedUser,
                        responseData: {}
                    });
                }
            } catch(err) {
                res.json({
                    status: 0,
                    msgCode: 421,
                    message: error,
                    responseData: {}
                });
            }
            // userModel.saveUser(user).then((dbResponse) => {
            //     console.log('user save response-> ', dbResponse);
            //     if (dbResponse) {
            //         res.status(200).json({
            //             status: 1,
            //             message: 'Registered successfully',
            //             responseData: {}
            //         });
            //     } else {
            //         res.json({
            //             status: 0,
            //             msgCode: 420,
            //             message: dbResponse,
            //             responseData: {}
            //         });
            //     }
            // }).catch((error) => {
            //     res.json({
            //         status: 0,
            //         msgCode: 421,
            //         message: error,
            //         responseData: {}
            //     });
            // });
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
            res.json({
                status: 0,
                msgCode: 412,
                message: 'Validation failed',
                responseData: err
            });
        } else {
            userModel.login(user).then((dbResponse) => {
                console.log(dbResponse);
                if (!dbResponse) {
                    res.json({
                        status: 0,
                        msgCode: 420,
                        message: 'Invalid Credentials',
                        responseData: {}
                    });
                } else {
                    jwt.sign(user, process.env.APP_SECRET_KEY, { expiresIn: 600000 }, (error, token) => {
                        if (error) console.log('JWT Error: ', error);
                        else {
                            res.status(200).json({
                                msgCode: 1,
                                message: 'Login successful',
                                responseData: { token: token, userData: dbResponse }
                            });
                        }
                    });
                }
            }).catch((error) => {
                res.json({
                    status: 0,
                    msgCode: 421,
                    message: error,
                    responseData: {}
                });
            });
        }
    });
}

// userModel.login((rows) => {
//     if (rows.length > 0) {
//         jwt.sign(user, key.secret, { expiresIn: 600000 }, (error, token) => {
//             if (error) throw error;
//             res.status(200).send({ successMsg: 'Login successful', token: token } );
//         });
//     } else
//         res.status(500).send({ errorMsg: 'Invalid email & password' });
// }, user);

// module.exports.getUsers = (req, res) => {
//     userModel.getUsers( (rows) => {
//         if(rows.length > 0)
//             res.status(200).send( rows );
//         else
//             res.status(500).send( {errorMsg: 'No Data found'} );
//     });
// }
