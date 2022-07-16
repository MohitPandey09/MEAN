var express = require('express');
var router = express.Router();
var userController = require('../controllers/userController');
var productController = require('../controllers/productController');
var cartController = require('../controllers/cartController');
var passport = require('passport');
require('../config/passport')(passport);
var verifyToken = passport.authenticate('jwt', { session: false });

router.post('/register', userController.register);

router.post('/login', userController.login);

router.get('/getCategories', verifyToken, productController.getCategoriesList);

router.get('/getSubCategoriesByID/:categoryID', verifyToken, productController.getSubCategoriesByID);

router.get('/getProductsBySubcategoryID/:subcategoryID', verifyToken, productController.getProductsBySubcategoryID);

router.get('/getProductDetails/:productID', verifyToken, productController.getProductDetails);

router.post('/addItemToCart', verifyToken, cartController.addItemToCart);

router.get('/getCartItems', verifyToken, cartController.getCartItems);

router.delete('/deleteCartItem/:productID', verifyToken, cartController.deleteCartItem);

router.get('/favourite/:productID', verifyToken, productController.favourite);

router.get('/getFavourites', verifyToken, productController.getFavourites);

router.get('/checkCoupon/:couponCode', verifyToken, cartController.checkCoupon);

router.delete('/emptyCart', verifyToken, cartController.emptyCart);

router.post('/createPaymentIntent', verifyToken, cartController.createPaymentIntent);

module.exports = router;