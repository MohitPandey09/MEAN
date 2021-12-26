var express = require('express');
var router = express.Router();
var userController = require('../controllers/userController');
var productController = require('../controllers/productController');
var cartController = require('../controllers/cartController');
var verifyToken = require('../middlewares/verifyUser');

router.post('/register', userController.register);

router.post('/login', userController.login);

router.get('/getCategories', verifyToken, productController.getCategoryList);

router.get('/getSubCategories', verifyToken, productController.getSubCategoryList);

router.get('/getProducts', verifyToken, productController.getProductList);

router.post('/getProductByID', verifyToken, productController.getProductByID);

router.post('/addItemToCart', verifyToken, cartController.addItemToCart);

router.get('/getCartItems', verifyToken, cartController.getCartItems);

router.delete('/deleteCartItem', verifyToken, cartController.deleteCartItem);

router.delete('/emptyCart', verifyToken, cartController.emptyCart);

router.post('/createPaymentIntent', verifyToken, cartController.createPaymentIntent);

module.exports = router;