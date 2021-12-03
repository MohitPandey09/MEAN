var mongoose = require('mongoose');

var categorySchema = mongoose.Schema({
    categoryName: String,
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Category', categorySchema);