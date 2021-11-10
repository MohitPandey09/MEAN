var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var productSchema = mongoose.Schema({
    subcat_id: [{ 
        type: Schema.Types.ObjectId,
        ref: 'SubCategory' 
    }],
    product_name: String,
    description: String,
    price: Number,
    image: String,
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

var productModel = mongoose.model('Product', productSchema);

module.exports = productModel;