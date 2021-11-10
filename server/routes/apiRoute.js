var express = require('express');
var router = express.Router();
var userController = require('../controllers/userController');
var productController = require('../controllers/productController');

// router.post('/register', userController.register);

router.post('/login', userController.login);

// router.post('/getCategoryList', productController.getCategoryList);

// router.post('/getSubCategoryList', productController.getSubCategoryList);

// router.post('/getProductList', productController.getProductList);

module.exports = router;