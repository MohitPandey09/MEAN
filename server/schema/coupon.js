var mongoose = require('mongoose');

var couponSchema = mongoose.Schema({
	coupon: String,
	isActive: Boolean,
	applicablePrice: Number,
	discount: Number,
	created_at: { type: Date, default: Date.now },
	updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Coupon', couponSchema)