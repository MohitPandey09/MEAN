var mongoose = require('mongoose');

var categorySchema = mongoose.Schema({
    cat_name: String,
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

var categoryModel = mongoose.model('Categories', categorySchema);

module.exports = categoryModel;