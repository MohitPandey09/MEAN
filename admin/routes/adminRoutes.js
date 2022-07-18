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

router.post('/subcategory/add',	upload.single('image'), function (req, res, err, next) {
	if (err instanceof multer.MulterError && err.code === 'LIMIT_FILE_SIZE') {
		return res.send({ message: 'File size is greater than 5mb' })
	} else if(err) {
		return res.send({ message: `Unknown error occured: ${ err }` })
	} next
}, adminController.addSubcategory);

router.get('/subcategory/:id/edit', adminController.editSubcategory);

router.post('/subcategory/:id/update', upload.single('image'), function (req, res, err, next) {
	if (err instanceof multer.MulterError && err.code === 'LIMIT_FILE_SIZE') {
		return res.send({ message: 'File size is greater than 5mb' })
	} else if (err) {
		return res.send({ message: `Unknown error occured: ${ err }` })
	} next
}, adminController.updateSubcategory);

router.get('/subcategory/:id/delete', adminController.deleteSubcategory);

// ------------------------------------ Product routes ------------------------------------

router.get('/products', adminController.getProducts);

router.get('/product/add', adminController.getCategoriesListForProduct);

router.get('/product/:id', adminController.getSubcategoryByID)

router.post('/product/add', upload.single('image'), function(req, res, err, next) {
	if (err instanceof multer.MulterError && err.code === 'LIMIT_FILE_SIZE') {
		return res.send({ message: 'File size is greater than 5mb' })
	} else if (err) {
		return res.send({ message: `Unknown error occured: ${ err }` })
	} next
}, adminController.addProduct);

router.get('/product/:id/edit', adminController.editProduct);

router.post('/product/:id/update', upload.single('image'), function(req, res, err, next) {
	if (err instanceof multer.MulterError && err.code === 'LIMIT_FILE_SIZE') {
		return res.send({ message: 'File size is greater than 5mb' })
	} else if (err) {
		return res.send({ message: `Unexpected error occured: ${ err }` })
	} next
}, adminController.updateProduct);

router.get('/product/:id/delete', adminController.deleteProduct);

// ------------------------------------ Coupon routes ------------------------------------

router.get('/coupons', adminController.getCoupons);

router.get('/coupon/add', (req, res) => {
	res.render('coupons/add-coupon', { title: 'Add Coupon' });
});

router.post('/coupon/add', adminController.addCoupon);

router.get('/coupon/:id/edit', adminController.editCoupon);

router.post('/coupon/:id/update', adminController.updateCoupon);

router.get('/coupon/:id/activeNotActive/:isActive', adminController.activeNotActive);

router.get('/coupon/:id/delete', adminController.deleteCoupon);

// ------------------------------------ Payment routes ------------------------------------

router.get('/payments', adminController.getPayments);

// router.get('/payment/add', (req, res) => {
// 	res.render('payments/add-payment', { title: 'Add Payment' });
// });

// router.post('/payment/add', adminController.addPayment);

// router.get('/payment/:id/edit', adminController.editPayment);

// router.post('/payment/:id/update', adminController.updatePayment);

// router.get('/payment/:id/delete', adminController.deletePayment);

// ------------------------------------ Invalid routes ------------------------------------

router.get('*', function(req, res) {
	res.render('404');
});

module.exports = router;