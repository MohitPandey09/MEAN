var express = require('express');
var router = express.Router();
var userController = require('../controllers/userController');
var productController = require('../controllers/productController');

router.post('/register', userController.register);

router.post('/login', userController.login);

router.post('/getCategories', productController.getCategoryList);

router.post('/getSubCategories', productController.getSubCategoryList);

router.post('/getProducts', productController.getProductList);

module.exports = router;