const Cart = require("../schema/cart");
const Product = require('../schema/product');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

module.exports.addItemToCart = async (req, res, next) => {
	const { userID, items } = req.body;
	// COMMENT: CHECK PRODUCT IS VALID
	let product = await Product.findById(items.productID);
	if (!product) {
		// next(new Error('Invalid request, Product not found'));
		return res.json({
			statusCode: 0,
			msgCode: 454,
			message: 'Invalid request, Product not Found',
			responseData: null,
		});
	}

	let cart = await Cart.findOne({ userID: userID});
	if (cart) {
		// COMMENT: CART IS NOT EMPTY
		var updateValue;
		let isProductAdded = cart.items.find( item => item.productID == items.productID );
		if (isProductAdded) {
			// COMMENT: ITEM EXISTS INCREASE QUANTITY
			updateValue = await Cart.findOneAndUpdate(
				{ userID: userID, "items.productID": items.productID },
				{ $inc: { 'items.$.quantity': 1 } },
				{ new: true }
			);
		} else {
			// COMMENT: ITEM NOT EXISTS ADD ANOTHER ITEM IN CART
			updateValue = await Cart.findOneAndUpdate(
				{ userID: userID }, 
				{ $push: { "items": items } },
				{ new: true }
			);
		}
		res.status(200).json({
			statusCode: 1,
			message: 'Item added succesfully',
			responseData: updateValue
		});
	} else {
		// COMMENT: CART IS EMPTY SAVE ITEM IN CART
		let cartItem = new Cart({
			userID: userID,
			items: [ items ],
			totalPrice: items.price
		});
		let savedCart = await cartItem.save();
		try {
			if (savedCart !== null) {
				res.status(200).json({
					statusCode: 1,
					message: 'Item added succesfully',
					responseData: savedCart
				});
			} else {
				res.json({
					statusCode: 0,
					msgCode: 460,
					message: savedCart,
					responseData: null
				});
			}
		} catch (error) {
			console.log('Server Error: ', error);
			next(new Error('Server Error, Something was wrong!'));
		}
	}
}

module.exports.getCartItems = async (req, res, next) => {
	let cart = await Cart.find({'userID': req.body.userID});
	try {
		if (cart !== null) {
			res.status(200).json({
				statusCode: 1,
				message: "Cart Items",
				responseData: cart
			});
		} else {
			res.json({
				statusCode: 0,
				msgCode: 461,
				message: cart,
				responseData: null
			});
		}
	} catch(err) {
		console.log('Server Error: ', err);
		next(new Error('Server Error, Something was wrong!'));
	}
}

module.exports.createPaymentIntent = async (req, res, next) => {
	console.log(req.body);
	const cartItems = await Cart.findOne({ userID: req.body._id });
	const paymentIntent = await stripe.paymentIntents.create({
		amount: cartItems.totalPrice * 100,
		currency: 'inr',
		payment_method_types: ['card'],
	});
	if (paymentIntent.client_secret) {
		// delete cart items
		res.status(200).json({ clientKey: paymentIntent.client_secret })
	}
}

module.exports.deleteCartItem = async (req, res, next) => {
	var condition;
	var update;
	const product = await Cart.findOne({ userID: req.body.userID,
		items: {
			$elemMatch: {
				productID: req.body.productID,
				quantity: { $lte: 0 }
			}
		} 
	});
	if (product !== null) {
		condition = { userID: req.body.userID, 
			items: { $elemMatch: { productID: req.body.productID, quantity: { $lte: 0 } } } 
		},
		update = { $pull: { items: { quantity: { $lte: 0 } } } }
	} else {
		condition =  { userID: req.body.userID, "items.productID": req.body.productID }
		update = { $inc: { 'items.$.quantity': -1 } }
	}
	try {
		const cart = await Cart.findOneAndUpdate(condition, update, { new: true });
		// TODO: IF PRODUCT IS NOT FOUND SHOW ERROR NOT FOUND
		if (cart !== null) {
			res.status(200).json({
				statusCode: 1,
				message: "Item Removed",
				responseData: cart
			});
		} else {
			res.json({
				statusCode: 0,
				msgCode: 462,
				message: 'Not found',
				responseData: null
			});
		}

	} catch (err) {
		console.log('Server Error: ', err);
		next(new Error('Server Error, Something was wrong!'));
	}
}

module.exports.emptyCart = async (req, res, next) => {
	try {
		const cart = await Cart.findOneAndRemove({userID: req.body.userID});

		if (cart !== null) {
			res.status(200).json({
				statusCode: 1,
				message: "Cart Emptied",
				responseData: null
			});
		} else {
			res.json({
				statusCode: 0,
				msgCode: 463,
				message: 'Not found',
				responseData: null
			});
		}

	} catch (err) {
		console.log('Server Error: ', err);
		next(new Error('Server Error, Something was wrong!'));
	}
}