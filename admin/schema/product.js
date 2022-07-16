var mongoose = require('mongoose');

var productSchema = mongoose.Schema({
    name: String,
    description: String,
    price: Number,
    image: String,
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
    subcategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subcategory'
    },
    availableSize: Array,
    availableColors: Array,
    discount: Number,
    weight: String,
    inStock: Number,
    productAvailable: Boolean,
    discountAvailable: Boolean,
    isDeleted: { type: Number, default: 0 },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Product', productSchema);