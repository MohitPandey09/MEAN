var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var subcategorySchema = mongoose.Schema({
    categoryID: [{
        type: Schema.Types.ObjectId,
        ref: 'Categories',
    }],
    subcategoryName: String,
    descripton: String,
    image: String,
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

var subcategoryModel = mongoose.model('Subcategories', subcategorySchema);

module.exports = subcategoryModel;