var mongoose = require('mongoose');

var favouriteSchema = mongoose.Schema({
	user: {
		type: mongoose.Types.ObjectId,
		ref: 'User'
	},
	product: [{
		type: mongoose.Types.ObjectId,
		ref: 'Product'
	}],
	created_at: { type: Date, default: Date.now },
	updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Favourite', favouriteSchema);