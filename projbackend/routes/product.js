const express = require('express');
const router = express.Router();

const {getProductById,createProduct,getProduct,getFile} = require('../controllers/product');
const {getUserById} = require('../controllers/user');
const {isLoggedIn,isAuthorized,isAdmin} = require('../controllers/auth');

router.param('userId',getUserById);
router.param('productId',getProductById);

router.post('/product/create/:userId',isLoggedIn,isAuthorized,isAdmin,createProduct);
router.get('/product/:productId',getProduct);
//router.get("/product/photo/:productId",getFile);

module.exports = router;
