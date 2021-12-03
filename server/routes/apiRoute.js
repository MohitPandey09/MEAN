var express = require('express');
var router = express.Router();
var userController = require('../controllers/userController');
var productController = require('../controllers/productController');
var cartController = require('../controllers/cartController');
var verifyToken = require('../middlewares/verifyUser');

router.post('/register', userController.register);

router.post('/login', userController.login);

router.post('/getCategories', verifyToken, productController.getCategoryList);

router.post('/getSubCategories', verifyToken, productController.getSubCategoryList);

router.post('/getProducts', verifyToken, productController.getProductList);

router.post('/getProductByID', verifyToken, productController.getProductByID);

router.post('/addItemToCart', verifyToken, cartController.addItemToCart);

module.exports = router;