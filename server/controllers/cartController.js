const Cart = require("../schema/cart");

module.exports.addItemToCart = async (req, res) => {
	var cart =  new Cart({
		productID: mongoose.Types.ObjectId(req.body.productID),
	});
	var savedCart = await cart.save();
	try {
		if (savedCart !== null) {
			res.status(200).json({
				msgCode: 1,
				message: 'Item added succesfully',
				responseData: savedCart
			});
		} else {
			res.json({
				status: 0,
				msgCode: 460,
				message: savedCart,
				responseData: {}
			})
		}
	} catch (error) {
		console.log('Server Error: ', error);
	}
}