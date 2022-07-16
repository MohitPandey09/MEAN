const User = require('../schema/user');
const Category = require('../schema/category');
const Subcategory = require('../schema/subcategory');
const Product = require('../schema/product');
const Validator = require('../shared/helpers/validate');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// COMMENT: admin login handler
module.exports.login = async (req, res, next) => {
    var user = {
        email: req.body.email,
        password: req.body.password
    };
	var rules = {
		email: 'required|email',
		password: 'required'
    };

    const validate = Validator(user, rules, {});
    if (!validate) {
        res.json({
            statusCode: 0,
            msgCode: 412,
            message: 'Validation failed',
            responseData: validate
        });
    }
    const userFound = await User.findOne({ email: user.email, role: 1 }).select('+password');
    try {
        if (userFound === null) {
            res.render('login', { errorMsg: 'Invalid Email' })
        } else{
            const isMatch = await bcrypt.compare(user.password, userFound.password);
            if (isMatch) {
                jwt.sign(user, process.env.APP_SECRET_KEY, { expiresIn: 600000 }, (error, token) => {
                    if (error) console.log('JWT Error: ', error);
                    else {
                        res.redirect('/admin/dashboard');
                    }
                });
            } else {
                res.render('login', { errorMsg: 'Invalid Password' })
            }
        }
    } catch (error) {
        console.log('Server Error: ', error);
        next(new Error('Server Error, Something was wrong!'));
    }
}

// ------------------------------------ Users controller ------------------------------------

// COMMENT: get all users
module.exports.getUsers = async (req, res, next) => {
    try {
        let users = await User.find({ isDeleted: 0, role: { $ne: 1 }}).exec();
        if (users !== null) {
            res.render('users/list-user', { users: users, title: 'Users List' })
        } else {
            res.json({ message: 'No users found' })
        }
    } catch (error) {
        console.log('Server error: ', error);
        next(new Error('Server error, Something was wrong!'));        
    }
}

// COMMENT: edit user
module.exports.editUser = async (req, res, next) => {
    let userID = req.params.id;
    try {
        let user = await User.findOne({ _id: userID });
        if (user !== null) {
            res.render('users/edit-user', { user: user, title: 'Edit User' })
        } else {
            res.json({ message: 'Records not found' })
        }
    } catch (error) {
        console.log('Server error: ', error);
        next(new Error('Server error, Something was wrong!'));        
    }
}

// COMMENT: udpate user
module.exports.updateUser = async (req, res, next) => {
    let userID = req.params.id;
	let rules = {
		name: 'required',
		email: 'required|email',
		password: 'required',
        city: 'required',
        state: 'required',
        zip: 'required',
        country: 'required',
        mobile: 'required',
        address: 'required'
    };
    let validate = Validator(req.body, rules, {});
    if (!validate) {
        return res.json({
            message: 'Validation failed',
            responseData: validate
        });
    }
    try {
        let user = await User.findByIdAndUpdate(userID, req.body, { new: true });
        if (user !== null) {
            res.redirect('/admin/users')
        } else {
            res.json({ message: 'Can`t update' })
        }
    } catch (error) {
        console.log('Server error: ', error);
        next(new Error('Server error, Something was wrong!'));        
    }
}

// COMMENT: block/unblock user
module.exports.blockUnblockUser = async (req, res, next) => {
    let { id, isBlocked } = req.params;
    let updateIsBlocked = Number(isBlocked) ? 0 : 1;
    try {
        let user = await User.findByIdAndUpdate(id, { isBlocked: updateIsBlocked }, { new: true });
        if (user !== null) {
            res.redirect('/admin/users')
        } else {
            res.json({ message: 'User not found' })
        }
    } catch (error) {
        console.log('Server error: ', error);
        next(new Error('Server error, Something was wrong!'));        
    }
}

// COMMENT: delete user
module.exports.deleteUser = async (req, res, next) => {
    let { id } = req.params;
    try {
        let user = await User.findByIdAndUpdate(id, { isDeleted: 1 }, { new: true });
        if (user !== null) {
            res.redirect('/admin/users')
        } else {
            res.json({ message: `User doesn't found` })
        }
    } catch (error) {
        console.log('Server error: ', error);
        next(new Error('Server error, Something was wrong!'));
    }
}

// ------------------------------------ Categories controller ------------------------------------

//  COMMENT: add category
module.exports.addCategory = async (req, res, next) => {
    let rules = {
        name: 'required'
    }
    let validate = Validator(req.body, rules, {});
    if (!validate) {
        return res.json({
            message: 'Validation failed',
            responseData: validate
        })
    }
    try {
        let category = new Category({
            name: req.body.name
        });
        let savedCategory = await category.save();
        if (savedCategory) {
            res.redirect('/admin/categories');
        }
    } catch (error) {
        console.log('Server error: ', error);
        next(new Error('Server error, Something was wrong!'));         
    }
}

// COMMENT: get all category
module.exports.getCategories = async (req, res, next) => {
    try {
        let categories = await Category.find({ isDeleted: 0 }).exec();
        if (categories !== null) {
            res.render('categories/list-category', { categories: categories, title: 'Categories List' })
        } else {
            res.json({ message: 'No categories found' })
        }
    } catch (error) {
        console.log('Server error: ', error);
        next(new Error('Server error, Something was wrong!'));        
    }
}

// COMMENT: edit category
module.exports.editCategory = async (req, res, next) => {
    let categoryID = req.params.id;
    try {
        let category = await Category.findOne({ _id: categoryID });
        if (category !== null) {
            res.render('categories/edit-category', { category: category, title: 'Edit Category' })
        } else {
            res.json({ message: 'Records not found' })
        }
    } catch (error) {
        console.log('Server error: ', error);
        next(new Error('Server error, Something was wrong!'));        
    }
}

// COMMENT: udpate category
module.exports.updateCategory = async (req, res, next) => {
    let categoryID = req.params.id;
	let rules = {
		name: 'required'
    };
    let validate = Validator(req.body, rules, {});
    if (!validate) {
        return res.json({
            message: 'Validation failed',
            responseData: validate
        });
    }
    try {
        let category = await Category.findByIdAndUpdate(categoryID, req.body, { new: true });
        if (category !== null) {
            res.redirect('/admin/categories')
        } else {
            res.json({ message: 'Can`t update' })
        }
    } catch (error) {
        console.log('Server error: ', error);
        next(new Error('Server error, Something was wrong!'));        
    }
}

// COMMENT: delete category
module.exports.deleteCategory = async (req, res, next) => {
    let { id } = req.params;
    try {
        let category = await Category.findByIdAndUpdate(id, { isDeleted: 1 }, { new: true });
        if (category !== null) {
            res.redirect('/admin/categories')
        } else {
            res.json({ message: `Category doesn't found` })
        }
    } catch (error) {
        console.log('Server error: ', error);
        next(new Error('Server error, Something was wrong!'));        
    }
}

// ------------------------------------ Subcategories controller ------------------------------------

// COMMENT: get category list
module.exports.getCategoriesList = async (req, res, next) => {
    try {
        let categories = await Category.find({ isDeleted: 0 }).exec();
        if (categories !== null) {
            res.render('subcategories/add-subcategory', { categories: categories, title: 'Add Subcategory' })
        } else {
            res.json({ message: 'No categories found' })
        }
    } catch (error) {
        console.log('Server error: ', error);
        next(new Error('Server error, Something was wrong!'));        
    }
}

//  COMMENT: add subcategory
module.exports.addSubcategory = async (req, res, next) => {
    console.log(req.file)
    let rules = {
        name: 'required',
        category: 'required'
    }
    let validate = Validator(req.body, rules, {});
    if (!validate) {
        return res.json({
            message: 'Validation failed',
            responseData: validate
        })
    }
    try {
        let subcategory = new Subcategory({
            name: req.body.name,
            category: req.body.category,
            image: req.file.filename
        });
        let savedSubcategory = await subcategory.save();
        if (savedSubcategory) {
            res.redirect('/admin/subcategories');
        }
    } catch (error) {
        console.log('Server error: ', error);
        next(new Error('Server error, Something was wrong!'));         
    }
}

// COMMENT: get all subcategory
module.exports.getSubcategories = async (req, res, next) => {
    try {
        let subcategories = await Subcategory.find({ isDeleted: 0 }).exec();
        if (subcategories !== null) {
            res.render('subcategories/list-subcategory', { subcategories: subcategories, title: 'Subcategories List' })
        } else {
            res.json({ message: 'No Subcategories found' })
        }
    } catch (error) {
        console.log('Server error: ', error);
        next(new Error('Server error, Something was wrong!'));        
    }
}

// COMMENT: edit subcategory
module.exports.editSubcategory = async (req, res, next) => {
    let subcategoryID = req.params.id;
    try {
        let subcategory = await Subcategory.findOne({ _id: subcategoryID });
        if (subcategory !== null) {
            res.render('subcategory/edit-subcategory', { subcategory: subcategory, title: 'Edit subcategory' })
        } else {
            res.json({ message: 'Records not found' })
        }
    } catch (error) {
        console.log('Server error: ', error);
        next(new Error('Server error, Something was wrong!'));        
    }
}

// COMMENT: udpate subcategory
module.exports.updateSubcategory = async (req, res, next) => {
    let subcategoryID = req.params.id;
	let rules = {
		name: 'required',
		description: 'required',
		image: 'required'
    };
    let validate = Validator(req.body, rules, {});
    if (!validate) {
        return res.json({
            message: 'Validation failed',
            responseData: validate
        });
    }
    try {
        let subcategory = await Subcategory.findByIdAndUpdate(subcategoryID, req.body, { new: true });
        if (subcategory !== null) {
            res.redirect('/admin/subcategories')
        } else {
            res.json({ message: 'Can`t update' })
        }
    } catch (error) {
        console.log('Server error: ', error);
        next(new Error('Server error, Something was wrong!'));        
    }
}

// COMMENT: delete subcategory
module.exports.deleteSubcategory = async (req, res, next) => {
    let { id } = req.params;
    try {
        let subcategory = await Subcategory.findByIdAndUpdate(id, { isDeleted: 1 }, { new: true });
        if (subcategory !== null) {
            res.redirect('/admin/subcategories')
        } else {
            res.json({ message: `Subcategory doesn't found` })
        }
    } catch (error) {
        console.log('Server error: ', error);
        next(new Error('Server error, Something was wrong!'));        
    }
}

// ------------------------------------ Products controller ------------------------------------

//  COMMENT: add product
module.exports.addProduct = async (req, res, next) => {
    let rules = {
        name: 'required',
        description: 'xyz',
        image: 'path'
    }
    let validate = Validator(req.body, rules, {});
    if (!validate) {
        return res.json({
            message: 'Validation failed',
            responseData: validate
        })
    }
    try {
        let product = new Product({
            name: req.body.name
        });
        let savedProduct = await product.save();
        if (savedProduct) {
            res.redirect('/admin/products');
        }
    } catch (error) {
        console.log('Server error: ', error);
        next(new Error('Server error, Something was wrong!'));         
    }
}

// COMMENT: get all product
module.exports.getProducts = async (req, res, next) => {
    try {
        let products = await Product.find({ isDeleted: 0 }).exec();
        if (products !== null) {
            res.render('product/list-category', { products: products, title: 'Products List' })
        } else {
            res.json({ message: 'No Products found' })
        }
    } catch (error) {
        console.log('Server error: ', error);
        next(new Error('Server error, Something was wrong!'));        
    }
}

// COMMENT: edit product
module.exports.editProduct = async (req, res, next) => {
    let productID = req.params.id;
    try {
        let product = await Product.findOne({ _id: productID });
        if (product !== null) {
            res.render('product/edit-product', { product: product, title: 'Edit product' })
        } else {
            res.json({ message: 'Records not found' })
        }
    } catch (error) {
        console.log('Server error: ', error);
        next(new Error('Server error, Something was wrong!'));        
    }
}

// COMMENT: udpate product
module.exports.updateProduct = async (req, res, next) => {
    let productID = req.params.id;
	let rules = {
		name: 'required',
		description: 'required',
		image: 'required'
    };
    let validate = Validator(req.body, rules, {});
    if (!validate) {
        return res.json({
            message: 'Validation failed',
            responseData: validate
        });
    }
    try {
        let product = await Product.findByIdAndUpdate(productID, req.body, { new: true });
        if (product !== null) {
            res.redirect('/admin/products')
        } else {
            res.json({ message: 'Can`t update' })
        }
    } catch (error) {
        console.log('Server error: ', error);
        next(new Error('Server error, Something was wrong!'));        
    }
}

// COMMENT: delete product
module.exports.deleteProduct = async (req, res, next) => {
    let { id } = req.params;
    try {
        let product = await Product.findByIdAndUpdate(id, { isDeleted: 1 }, { new: true });
        if (product !== null) {
            res.redirect('/admin/products')
        } else {
            res.json({ message: `Product doesn't found` })
        }
    } catch (error) {
        console.log('Server error: ', error);
        next(new Error('Server error, Something was wrong!'));        
    }
}

// ------------------------------------ Products controller ------------------------------------

//  TODO: REMOVE IT FROM HERE
// module.exports.addSubcategory = async (req, res, next) => {
//     const subcategory = new Subcategory({
//         name: req.body.name,
//         category: req.body.categoryID,
//         image: req.body.image
//     });
//     await subcategory.save();
//     res.json({msg: 'Subcategory saved'});
// }

//  TODO: REMOVE IT FROM HERE
// module.exports.addProduct = async (req, res, next) => {
//     const product = new Product({
//         name: req.body.name,
//         description: req.body.description,
//         price: req.body.price,
//         category: req.body.category,
//         subcategory: req.body.subcategory,
//         image: req.body.image,
//         availableSize: req.body.availableSize,
//         availableColors: req.body.availableColors,
//         discount: req.body.discount,
//         weight: req.body.weight,
//         inStock: req.body.inStock,
//         productAvailable: req.body.productAvailable,
//         discountAvailable: req.body.discountAvailable
//     });
//     await product.save();
//     res.json({msg: 'Product saved'});
// }

// module.exports.getProducts = async (req, res, next) => {
//     let product = await Product.find({}).exec();
//     return res.status(200).json({responseData: product});
// }
