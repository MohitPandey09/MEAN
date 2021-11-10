const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const verifyToken = require('../middlewares/verifyUser');

// router.get('/getcategories', productController.getCategories);

// router.post('/addproduct', verifyToken, productController.addProduct);

module.exports = router;