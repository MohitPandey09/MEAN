const Category = require('../schema/category');
const Subcategory = require('../schema/subcategory');
const Product = require('../schema/product');
const Favourite = require('../schema/favourite');

module.exports.getCategoriesList = async (req, res, next) => {
    try {
        let categories = await Category.find({ isDeleted: 0 }).exec();
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
                message: 'Not found'
            });
        }
    } catch (error) {
        console.log('Server Error: ', error);
        next(new Error('Invalid request'));
    }
}

module.exports.getSubCategoriesByID = async (req, res, next) => {
    try {
        let subcategories = await Subcategory.find({ category: req.params.categoryID })
        .populate('category', 'name').exec();
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
                message: 'Not found'
            });
        }
    } catch (error) {
        console.log('Server Error: ', error);
        next(new Error('Invalid request'));
    }
}

module.exports.getProductsBySubcategoryID = async (req, res, next) => {
    try {
        let product = await Product.find({ subcategory: req.params.subcategoryID })
        .populate('subcategory');

        if (!product) {
            res.json({
                statusCode: 0,
                msgCode: 454,
                message: 'Product not found'
            });
        } else {
            res.status(200).json({
                statusCode: 1,
                message: 'Product List',
                responseData: product
            });
        }
    } catch (error) {
        console.log('Server Error: ', error);
        next(new Error('Invalid request'));
    }
}

module.exports.getProductDetails = async (req, res, next) => {
    try {
        let product = await Product.findById({ _id: req.params.productID })
        .populate('subcategory', 'subcategoryName');

        if (product !== null) {
            res.status(200).json({
                statusCode: 1,
                message: 'Product Details',
                responseData: product
            });
        } else {
            res.json({
                statusCode: 0,
                msgCode: 453,
                message: 'Product not found'
            });
        }
    } catch (error) {
        console.log('Server Error: ', error);
        next(new Error('Invalid request'));
    }
}

module.exports.favourite = async (req, res, next) => {
    const { productID } = req.params;
    try {
        // COMMENT: check user exist or not
        let user = await Favourite.findOne({ user: req.user._id });
        if (user !== null) {
            // COMMENT: check product exist or not
            let product = await Favourite.findOne(
                { user: req.user._id, product: productID },
                { 'product.$': 1 } // COMMENT: it returns first match from array
            );
            if (product !== null) {
                // COMMENT: if product exist remove from list
                let remove = await Favourite.findOneAndUpdate(
                    { user: req.user._id, product: productID },
                    { $pull: { 'product': productID } },
                    { new: true }
                );
                res.status(200).json({
                    statusCode: 1,
                    message: 'Product removed from list',
                    responseData: remove
                });
            } else {
                // COMMENT: if product not exist add to list
                let update = await Favourite.findOneAndUpdate(
                    { user: req.user._id },
                    { $push: { 'product': productID } },
                    { new: true }
                );
                res.status(200).json({
                    statusCode: 1,
                    message: 'Product added to list',
                    responseData: update
                });
            }
        } else {
            // COMMENT: if user not exist add to list
            const fav = new Favourite({
                user: req.user._id,
                product: productID
            });
            let saved = await fav.save();
            res.status(200).json({
                statusCode: 1,
                message: 'Product added to list',
                responseData: saved
            });
        }
        
    } catch (error) {
        console.log('Server Error: ', error);
        next(new Error('Server error, Something was wrong!'));
    }
}

module.exports.getFavourites = async (req, res, next) => {
    try {
        let favourite = await Favourite.findOne({ user: req.user._id })
        .populate('product', 'name  price subcategory');
        if (favourite !== null) {
            res.status(200).json({
                statusCode: 1,
                message: 'Favourites List',
                responseData: favourite
            });
        } else {
            res.json({
                statusCode: 0,
                msgCode: 455,
                message: 'Not found'
            });            
        }        
    } catch (error) {
        console.log('Server Error: ', error);
        next(new Error('Server error, Something was wrong!'));
    }
}