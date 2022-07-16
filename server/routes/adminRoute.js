var express = require('express');
const multer = require('multer');
var router = express.Router();
var adminController = require('../controllers/adminController');
var upload = require('../middlewares/uploadImage');

router.get('/', function(req, res) {
	res.redirect('admin/login')
});

router.get('/login', function(req, res) {
	res.render('login')
})

router.post('/login', adminController.login);

router.get('/dashboard', function(req, res) {
	res.render('dashboard')
});

// ------------------------------------ Users routes ------------------------------------

router.get('/users', adminController.getUsers);

router.get('/user/:id/edit', adminController.editUser);

router.post('/user/:id/update', adminController.updateUser);

router.get('/user/:id/blockUnblock/:isBlocked', adminController.blockUnblockUser);

router.get('/user/:id/delete', adminController.deleteUser);

// ------------------------------------ Category routes ------------------------------------

router.get('/categories', adminController.getCategories);

router.get('/category/add', function(req, res) {
	res.render('categories/add-category', { title: 'Add Category' });
});

router.post('/category/add', adminController.addCategory);

router.get('/category/:id/edit', adminController.editCategory);

router.post('/category/:id/update', adminController.updateCategory);

router.get('/category/:id/delete', adminController.deleteCategory);

// ------------------------------------ Subcategory routes ------------------------------------

router.get('/subcategories', adminController.getSubcategories);

router.get('/subcategory/add', adminController.getCategoriesList);

router.post('/subcategory/add', function(req, res) {
	upload.single('image')(req, res, err => {
		if (err instanceof multer.MulterError && err.code === 'LIMIT_FILE_SIZE') {
			return res.send({ message: 'File size is greater than 5mb' })
		}
	})
}, adminController.addSubcategory);

router.get('/subcategory/:id/edit', adminController.editSubcategory);

router.post('/subcategory/:id/update', adminController.updateSubcategory);

router.get('/subcategory/:id/delete', adminController.deleteSubcategory);

// ------------------------------------ Product routes ------------------------------------

router.get('/products', adminController.getProducts);

router.get('/product/add', function(req, res) {
	res.render('products/add-product', { title: 'Add Product' });
});

router.post('product/add', adminController.addProduct);

router.get('/product/:id/edit', adminController.editProduct);

router.post('/product/:id/update', adminController.updateProduct);

router.get('/product/:id/delete', adminController.deleteProduct);

// ------------------------------------ Product routes ------------------------------------

// router.get('/getProducts', adminController.getProducts);
// router.get('/getCategories', adminController.getCategoriesList);
// router.get('/getSubCategoriesByID/:categoryID', adminController.getSubCategoriesByID);

router.get('*', function(req, res) {
	res.render('404');
})

module.exports = router;