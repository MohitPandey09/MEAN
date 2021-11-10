const query = require('../query');
const connection = require('../connection');
var bcrypt = require('bcrypt');
const userModel = require('../models/users');

// module.exports.saveUser = (userData) => {
//     return new Promise((resolve, reject) => {
//         const user = new userModel({
//             role: 4,
//             name: userData.name,
//             email: userData.email,
//             password: bcrypt.hashSync(userData.password, 10),
//             address: userData.address,
//             city: userData.city,
//             state: userData.state,
//             zip: userData.zip,
//             country: userData.country,
//             mobile: userData.mobile,
//             email_verified: 0
//         });
//         user.save(function(error, row) {
//             if (error) reject(error);
//             else {
//                 resolve(row);
//             }
//         });
        // let sql = 'INSERT INTO users(role, name, email, password, city, state, zip, country, mobile, address) VALUES (?)';
        // let data = [
        //     4,
        //     userData.name,
        //     userData.email,
        //     userData.password,
        //     userData.city,
        //     userData.state,
        //     userData.zip,
        //     userData.country,
        //     userData.mobile,
        //     userData.address
        // ];
        // console.log('model data--', data);
        // connection.query(sql, [data], (error, row) => {
        //     if (error) reject(error);
        //     else {
        //         resolve(row);
        //     }
        // });
//     });
// }

module.exports.login = async (user) => {
    const userFound = await userModel.findOne({ email: user.email }).exec();
    if (userFound === null)
        return userFound;
    else{
        try {
            const isMatch = await bcrypt.compare(user.password, userFound.password);
            console.log('->>', isMatch);
            return isMatch;
        } catch(err) {
            console.log('Error: ', err);
        }
    }
    // return new Promise((resolve, reject) => {
    //     userModel.findOne({ email: user.email }, (error, row) => {
    //         if (error) reject(error)
    //         else{
    //             bcrypt.compareSync(user.password, row.password)
    //             resolve(row);
    //         }
    //     });

        // SQL CODE
        // let sql = `SELECT email, password FROM users WHERE email=? and password=?`;

        // var data = [
        //     user.email,
        //     user.password
        // ];
    
        // connection.query(sql, data, (error, row) => {
        //     if (error) reject(error);
        //     else {
        //         resolve(row);
        //     }
        // });
    // });
}

// module.exports.getUsers = (callback) => {
//     let sql = ` SELECT name FROM users `;

//     query.rawQuery( (rows) => {
//         callback(rows);
//     }, sql);
// }