const express = require('express');
const router = express.Router();

const {getProductById,createProduct,getProduct,getFile,deleteProduct,updateProduct,getAllProducts,getAllUniqueCategories} = require('../controllers/product');
const {getUserById} = require('../controllers/user');
const {isLoggedIn,isAuthorized,isAdmin} = require('../controllers/auth');

router.param('userId',getUserById);
router.param('productId',getProductById);

router.post('/product/create/:userId',isLoggedIn,isAuthorized,isAdmin,createProduct);
router.delete('/product/:productId/:userId',isLoggedIn,isAuthorized,isAdmin,deleteProduct);
router.put('/product/:productId/:userId',isLoggedIn,isAuthorized,isAdmin,updateProduct);
router.get('/product/:productId',getProduct);
router.get('/products',getAllProducts);
//router.get("/product/photo/:productId",getFile);

router.get("/products/categories",getAllUniqueCategories);

module.exports = router;
