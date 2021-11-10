const query = require('../query');
const connection = require('../connection');
var bcrypt = require('bcrypt');
const userModel = require('../schema/users');

module.exports.saveUser = async (userData) => {
    const saltRounds = 10;
    let hashedPassword = await bcrypt.hash(userData.password, saltRounds);
    const user = new userModel({
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
                console.log('user save output-> ', row);
                return row;
            }
        });   
    } catch(err) {
        console.log('Error: ', err);
    }
    // COMMENT: SQL CODE FOR REGISTER USER
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
}

module.exports.login = async (user) => {
    const userFound = await userModel.findOne({ email: user.email }).exec();
    if (userFound === null)
        return userFound;
    else{
        try {
            const isMatch = await bcrypt.compare(user.password, userFound.password)
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

        // COMMENT: SQL CODE FOR LOGIN
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

// COMMENT: SQL CODE FOR GET USERS
// module.exports.getUsers = (callback) => {
//     let sql = ` SELECT name FROM users `;

//     query.rawQuery( (rows) => {
//         callback(rows);
//     }, sql);
// }