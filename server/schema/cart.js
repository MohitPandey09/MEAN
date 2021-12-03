var mongoose = require('mongoose');

var cartSchema = mongoose.Schema({
	productID: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Product'
	}],
	created_at: { type: Date, default: Date.now },
	updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Cart', cartSchema);