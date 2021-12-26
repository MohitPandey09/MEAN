const query = require('../query');
const connection = require('../connection');
var bcrypt = require('bcrypt');
const User = require('../schema/user');

module.exports.saveUser = async (userData) => {
    const saltRounds = 10;
    let hashedPassword = await bcrypt.hash(userData.password, saltRounds);
    const user = new User({
        role: 4,
        name: userData.name,
        email: userData.email,
        password: hashedPassword,
        address: userData.address,
        city: userData.city,
        state: userData.state,
        zip: userData.zip,
        country: userData.country,
        mobile: userData.mobile,
        email_verified: 0
    });

    try{
        user.save((error, row) => {
            if (error) console.log('Error: ', error);
            else {
                return row;
            }
        });   
    } catch(err) {
        console.log('Error: ', err);
    }
}

module.exports.login = async (user) => {
    const userFound = await User.findOne({ email: user.email }).select("+password").exec();
    if (userFound === null) return false;
    else{
        try {
            const isMatch = await bcrypt.compare(user.password, userFound.password);
            if (isMatch) return userFound;
        } catch(err) {
            console.log('Error: ', err);
        }
    }
}