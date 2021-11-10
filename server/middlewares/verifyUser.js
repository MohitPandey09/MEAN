const jwt = require('jsonwebtoken');
const key = require('../secretkey');

module.exports = (req, res, next) => {
    if ( !req.headers.authorization ) {
        res.status(401).send("Unauthorized User Access");
    }

    let token = req.headers.authorization.split(' ')[1];
    if ( !token ) {
        res.status(401).send("Unauthorized User Access");
    }

    let payload = jwt.verify(token, key.secret);
    if ( payload === 'null') {
        res.status(401).send("Unauthorized User Access");
    }
    
    req.data = payload;
    next();
}
