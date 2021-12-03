var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var productSchema = mongoose.Schema({
    SKU: String,
    productName: String,
    productDescription: String,
    price: Number,
    image: String,
    categoryID: [{ 
        type: Schema.Types.ObjectId,
        ref: 'Category'
    }],
    subcategoryID: [{ 
        type: Schema.Types.ObjectId,
        ref: 'SubCategory'
    }],
    // supplierProductID: [{ 
    //     type: Schema.Types.ObjectId,
    //     ref: 'SubCategory'
    // }],
    // supplierID: [{ 
    //     type: Schema.Types.ObjectId,
    //     ref: 'Supplier'
    // }],
    quantityPerUnit: Number,
    unitSize: String,
    unitPrice: Number,
    MSRP: String,
    availableSize: String,
    availableColors: String,
    sizeID: Number,
    colorID: Number,
    discount: Number,
    unitWeight: String,
    unitsOnOrder: Number,
    reorderLevel: Number,
    unitsInStock: Number,
    productAvailable: Number,
    discountAvailable: Number,
    currentOrder: Number,
    picture: String,
    ranking: Number,
    note: String,
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
});

var productModel = mongoose.model('Product', productSchema);

module.exports = productModel;