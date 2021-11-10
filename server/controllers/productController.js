const productModel = require('../services/productModel');

module.exports.getCategoryList = (req, res) => {
    productModel.getCategoryList().then((dbResponse) => {
        if (dbResponse != null) {
            res.status(200).json({
                status: 1,
                message: 'Category List',
                responseData: dbResponse
            });
        } else {
            res.json({
                status: 0,
                msgCode: 412,
                message: dbResponse,
                responseData: {}
            });
        }
    });
}

module.exports.getSubCategoryList = (req, res) => {
    productModel.getSubCategoryList(req.body.id).then((dbResponse) => {
        if (dbResponse.length > 0) {
            res.status(200).json({
                status: 1,
                message: 'Sub-Category List',
                responseData: dbResponse
            });
        } else {
            res.json({
                status: 0,
                msgCode: 412,
                message: dbResponse,
                responseData: {}
            });
        }
    });
}

// module.exports.getProductList = (req, res) => {
//     productModel.getProductList(req.body.id).then((dbResponse) => {
//         if (dbResponse.length > 0) {
//             res.status(200).json({
//                 status: 1,
//                 message: 'Product List',
//                 responseData: dbResponse
//             });
//         } else {
//             res.json({
//                 status: 0,
//                 msgCode: 412,
//                 message: dbResponse,
//                 responseData: {}
//             });
//         }
//     });
// }

// module.exports.getCategories = (req, res) => {
//     productModel.getCategories( (category) => {
//         if(category.length > 0)
//             res.status(200).send( category );
//         else
//             res.status(401).send( {errorMsg: 'No Data Found'} );
//     });
// }

// module.exports.addProduct = (req, res) => {
//     const product = {
//         pro_name: req.body.pro_name,
//         pro_price: req.body.pro_price,
//         pro_short_desc: req.body.pro_short_desc,
//         pro_long_desc: req.body.pro_long_desc,
//         pro_cat_id: req.body.pro_cat_id,
//         pro_quantity: req.body.pro_quantity
//     };
//     console.log(product);
    

//     productModel.addProduct(product);
// }