var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var subcategorySchema = mongoose.Schema({
    cat_id: [{
        type: Schema.Types.ObjectId,
        ref: 'Categories',
    }],
    subcat_name: String,
    descripton: String,
    image: String,
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

var subcategoryModel = mongoose.model('Subcategories', subcategorySchema);

module.exports = subcategoryModel;