var mongoose = require('mongoose');

var subcategorySchema = mongoose.Schema({
    categoryID: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
    }],
    subcategoryName: String,
    descripton: String,
    image: String,
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Subcategory', subcategorySchema);