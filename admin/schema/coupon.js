var mongoose = require('mongoose');

var couponSchema = mongoose.Schema({
	name: String,
	discount: Number,
	maxApplicablePrice: Number,
	userApplied: Number,
	maxUses: Number,
	isActive: Number,
	isDeleted: { type: Number, default: 0 },
	expiresOn: { type: Date },
	created_at: { type: Date, default: Date.now },
	updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Coupon', couponSchema)
