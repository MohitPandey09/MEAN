var mongoose = require('mongoose');

var categorySchema = mongoose.Schema({
    name: String,
    isDeleted: { type: Number, default: 0 },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Category', categorySchema);