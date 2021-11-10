const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const verifyToken = require('../middlewares/verifyUser');

// router.post('/checklogin', userController.login);

// router.get('/getusers', verifyToken, userController.getUsers);

module.exports = router;