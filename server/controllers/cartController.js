const Cart = require("../schema/cart");
const Product = require('../schema/product');
const Coupon = require('../schema/coupon');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

module.exports.addItemToCart = async (req, res, next) => {
	const { productID } = req.body;
	// COMMENT: CHECK PRODUCT IS VALID
	let product = await Product.findById(productID);
	if (!product) {
		return res.json({
			statusCode: 0,
			msgCode: 454,
			message: 'Invalid request, Product not Found'
		});
	}
	const items = {
		product: productID,
		quantity: 1,
		price: product.price
	};

	let cart = await Cart.findOne({ userID: req.user._id });
	if (cart) {
		// COMMENT: CART IS NOT EMPTY
		var updatedValue;
		let isProductAdded = cart.items.find( item => item.product == productID );
		if (isProductAdded) {
			// COMMENT: ITEM EXISTS INCREASE QUANTITY
			updatedValue = await Cart.findOneAndUpdate(
				{ userID: req.user._id, "items.product": productID },
				{ 
					$inc: {
						'items.$.quantity': 1,
						totalPrice: product.price
					}
				},
				{ new: true }
			);
		} else {
			// COMMENT: ITEM NOT EXISTS ADD ANOTHER ITEM IN CART
			updatedValue = await Cart.findOneAndUpdate(
				{ userID: req.user._id }, 
				{
					$push: { "items": items },
					$inc: { totalPrice: product.price }
				},
				{ new: true }
			);
		}
		res.status(200).json({
			statusCode: 1,
			message: 'Item added succesfully',
			responseData: updatedValue
		});
	} else {
		// COMMENT: CART IS EMPTY SAVE ITEM IN CART
		let cartItem = new Cart({
			userID: req.user._id,
			items: [ items ],
			totalPrice: product.price
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
					message: savedCart
				});
			}
		} catch (error) {
			console.log('Server Error: ', error);
			next(new Error('Server Error, Something was wrong!'));
		}
	}
}

module.exports.getCartItems = async (req, res, next) => {
	try {
		let cart = await Cart.findOne({ 'userID': req.user._id })
			.populate('items.product', '_id name');
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
				message: cart
			});
		}
	} catch(err) {
		console.log('Server Error: ', err);
		next(new Error('Server Error, Something was wrong!'));
	}
}

module.exports.createPaymentIntent = async (req, res, next) => {
	const cartItems = await Cart.findOne({ userID: req.user._id });
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
	const { productID } = req.params;
	var condition, update;
	// COMMENT: check product is available or not
	const product = await Product.findById(productID);
	if (product) {
		// COMMENT: check product available & quantity is <=1
		const productInCart = await Cart.findOne({ userID: req.user._id,
			items: {
				$elemMatch: { // COMMENT: it matches the array with condition
					product: productID,
					quantity: { $lte: 1 }
				}
			}
		}, { "items.$": 1 }); // COMMENT: it returns first match from array
		// COMMENT: pull/delete product if quantity is <=1
		if (productInCart !== null) {
			condition = { userID: req.user._id, 
				items: { $elemMatch: { product: productID, quantity: { $lte: 1 } } } 
			},
			update = { $inc: { totalPrice: -product.price }, $pull: { items: { product: productID } } }
		} else { // COMMENT: decrement quantity of product
			condition =  { userID: req.user._id, "items.product": productID }
			update = { $inc: { 'items.$.quantity': -1, totalPrice: -product.price } }
		}
		try {
			const cart = await Cart.findOneAndUpdate(condition, update, { new: true });
			// TODO: if product is not found show error not found
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
					message: 'Not found'
				});
			}
		} catch (err) {
			console.log('Server Error: ', err);
			next(new Error('Server Error, Something was wrong!'));
		}
	} else {
		// COMMENT: if product not available
		res.json({
			statusCode: 0,
			msgCode: 463,
			message: 'Sorry, seems like your product is not available'
		});
	}	
}

module.exports.emptyCart = async (req, res, next) => {
	try {
		const cart = await Cart.findOneAndRemove({ userID: req.user._id });
		if (cart !== null) {
			res.status(200).json({
				statusCode: 1,
				message: "Cart Emptied"
			});
		} else {
			res.json({
				statusCode: 0,
				msgCode: 463,
				message: 'Not found'
			});
		}

	} catch (err) {
		console.log('Server Error: ', err);
		next(new Error('Server Error, Something was wrong!'));
	}
}

module.exports.checkCoupon = async (req, res, next) => {
	const { couponCode } = req.params;
	try {
		// COMMENT: check coupon is active and available
		let coupon = await Coupon.findOne({ coupon: couponCode, isActive: true });
	
		if (coupon !== null) {
			// COMMENT: get cart for user
			let cart = await Cart.findOne({ userID: req.user._id });
			if (cart !== null) {
				// COMMENT: check cart value is valid for coupon
				if (cart.totalPrice >= coupon.applicablePrice) {
					// COMMENT: calculate discount
					let discountAmount, finalPrice;
					discountAmount = parseInt(cart.totalPrice * coupon.discount/100);
					finalPrice = parseInt(cart.totalPrice - discountAmount);
					// await Cart.findUpdate()
					res.status(200).json({
						statusCode: 1,
						message: 'Coupon Applied',
						responseData: { discountAmount, finalPrice }
					})
				} else {
					res.json({
						statusCode: 0,
						msgCode: 464,
						message: 'Cart value should be ' + coupon.applicablePrice +' or above'
					})
				}
			} else {
				res.json({
					statusCode: 0,
					msgCode: 464,
					message: 'No items in cart.'
				})
			}
		} else {
			res.json({
				statusCode: 0,
				msgCode: 465,
				message: 'Invalid Code'
			})
		}		
	} catch (error) {
		console.log('Server Error: ', error);
		next(new Error('Server Error, Something was wrong!'));
	}
}