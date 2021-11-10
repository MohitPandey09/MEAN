const query = require('../query');
const connection = require('../connection');
const categoryModel = require('../models/categories');
const subcategoryModel = require('../models/subcategories');

module.exports.getCategoryList = () => {
    return new Promise( (resolve, reject) => {
        categoryModel.find().then( rows => {
            if (rows.length > 0) {
                resolve(rows);
            }
        });
        // let sql = 'SELECT * FROM product_sub_category';
        
        // connection.query(sql, (error, row) => {
        //     if (error) reject(error);
        //     else {
        //         resolve(row);
        //     }
        // });
    });
}

module.exports.getSubCategoryList = (subcategory) => {
    return new Promise((resolve, reject) => {
        subcategoryModel.find().populate('subcategory').then( rows => {
            if (error) reject(error);
            else {
                resolve(rows);
            }
        });
        // let sql = 'SELECT product_sub_category.id, product_sub_category.pro_sub_cat_name AS subcategory_name FROM product_sub_category '
        //     + 'JOIN product_category ON product_sub_category.fk_pro_cat = product_category.id '
        //     + 'WHERE product_sub_category.fk_pro_cat = ' + subcategory;
        
        // connection.query(sql, (error, row) => {
        //     if (error) reject(error);
        //     else {
        //         resolve(row);
        //     }
        // });
    });
}

// module.exports.getProductList = (product) => {
//     return new Promise((resolve, reject) => {
//         let sql = 'SELECT products.*, product_sub_category.pro_sub_cat_name, product_type.pro_type FROM products '
//             + 'JOIN product_sub_category ON products.fk_pro_sub_cat = product_sub_category.id '
//             + 'JOIN product_category ON product_sub_category.fk_pro_type = product_type.id '
//             + 'WHERE products.id =' + product;

//         connection.query(sql, (error, row) => {
//             if (error) reject(error);
//             else {
//                 resolve(row);
//             }
//         });
//     });
// }

// module.exports.getCategories = (callback) => {
//     let sql = `SELECT * FROM categories`;

//     query.rawQuery( (rows) => {
//         callback(rows);
//     }, sql);
// }

// module.exports.addProduct = (product) => {
//     console.log('model');
//     let sql = `INSERT INTO products(pro_name, pro_price, pro_short_desc, pro_long_desc, pro_quantity, cat_id) VALUES ?`;
//     let data = [
//         product.pro_name,
//         product.pro_price,
//         product.pro_short_desc,
//         product.pro_long_desc,
//         product.pro_quantity,
//         product.pro_cat_id
//     ];

//     query.dataQuery( (response) => {
//         console.log(response);
//     }, sql, data);

// }
