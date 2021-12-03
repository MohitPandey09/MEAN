// const productModel = require('../services/productModel');
const categoryModel = require('../schema/categories');
const subcategoryModel = require('../schema/subcategories');
const productModel = require('../schema/product');

module.exports.getCategoryList = async (req, res) => {
    let categories = await categoryModel.find({});
    try {
        if (categories !== null) {
            res.status(200).json({
                status: 1,
                message: 'Category List',
                responseData: categories
            });
        } else {
            res.json({
                status: 0,
                msgCode: 412,
                message: 'Not found',
                responseData: categories
            });
        }
    } catch (error) {
        res.json({
            status: 0,
            msgCode: 421,
            message: error,
            responseData: {}
        });
    }
}

module.exports.getSubCategoryList = async (req, res) => {
    let subcategories = await subcategoryModel.find({});
    try {
        // return await subcategoryModel.find().populate('subcategory');
        if (subcategories !== null) {
            res.status(200).json({
                status: 1,
                message: 'Sub-Category List',
                responseData: subcategories
            });
        } else {
            res.json({
                status: 0,
                msgCode: 412,
                message: 'Not found',
                responseData: subcategories
            });
        }
    } catch (error) {
        console.log('Error: ', error);
    }
}

module.exports.getProductList = async (req, res) => {
    let products = await productModel.find({});
    try {
        if (products !== null) {
            res.status(200).json({
                status: 1,
                message: 'Product List',
                responseData: products
            });
        } else {
            res.json({
                status: 0,
                msgCode: 412,
                message: 'Products not found',
                responseData: products
            });
        }
    } catch (error) {
        console.log('Error: ', error);
    }
}