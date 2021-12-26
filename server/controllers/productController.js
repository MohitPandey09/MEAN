const Category = require('../schema/category');
const Subcategory = require('../schema/subcategory');
const Product = require('../schema/product');

module.exports.getCategoryList = async (req, res) => {
    let categories = await Category.find({});
    try {
        if (categories !== null) {
            res.status(200).json({
                statusCode: 1,
                message: 'Category List',
                responseData: categories
            });
        } else {
            res.json({
                statusCode: 0,
                msgCode: 452,
                message: 'Not found',
                responseData: null
            });
        }
    } catch (error) {
        console.log('Server Error: ', error);
        next(new Error('Invalid request'));
    }
}

module.exports.getSubCategoryList = async (req, res) => {
    let subcategories = await Subcategory.find({});
    try {
        // return await Subcategory.find().populate('subcategory');
        if (subcategories !== null) {
            res.status(200).json({
                statusCode: 1,
                message: 'Sub-Category List',
                responseData: subcategories
            });
        } else {
            res.json({
                statusCode: 0,
                msgCode: 452,
                message: 'Not found',
                responseData: null
            });
        }
    } catch (error) {
        console.log('Server Error: ', error);
        next(new Error('Invalid request'));
    }
}

module.exports.getProductList = async (req, res) => {
    let products = await Product.find({});
    try {
        if (products !== null) {
            res.status(200).json({
                statusCode: 1,
                message: 'Product List',
                responseData: products
            });
        } else {
            res.json({
                statusCode: 0,
                msgCode: 453,
                message: 'Products not found',
                responseData: null
            });
        }
    } catch (error) {
        console.log('Server Error: ', error);
        next(new Error('Invalid request'));
    }
}

module.exports.getProductByID = async (req, res) => {
    let product = await Product.findById(req.body.id);
    try {
        if (product !== null) {
            res.json({
                statusCode: 1,
                message: 'Product',
                responseData: product
            });
        } else {
            res.json({
                statusCode: 0,
                msgCode: 454,
                message: 'Product not found',
                responseData: null
            });
        }
    } catch (error) {
        console.log('Server Error: ', error);
        next(new Error('Invalid request'));
    }
}