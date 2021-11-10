var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var userSchema = mongoose.Schema({
    role: Number,
    name: String,
    email: String,
    password: String,
    address: String,
    city: String,
    state: String,
    zip: String,
    country: String,
    mobile: String,
    email_verified: Number,
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

var userModel = mongoose.model('users', userSchema);

module.exports = userModel;