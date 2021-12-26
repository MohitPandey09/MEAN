var mongoose = require("mongoose");

var userSchema = mongoose.Schema({
    role: Number,
    name: String,
    email: String,
    password: { type: String, select: false },
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

module.exports = mongoose.model('User', userSchema);