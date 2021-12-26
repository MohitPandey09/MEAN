var mongoose = require('mongoose');

let itemSchema = mongoose.Schema({
    productID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
    },
    quantity: Number,
    price: Number
});

var cartSchema = mongoose.Schema({
	userID:{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	items: [itemSchema],
	totalPrice: { type: Number, default: 0 },
	created_at: { type: Date, default: Date.now },
	updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Cart', cartSchema);