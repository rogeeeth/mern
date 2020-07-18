const express = require('express');
const router = express.Router();

const {getProductById,createProduct,getProduct,getFile,deleteProduct,updateProduct,getAllProducts,getAllUniqueCategories} = require('../controllers/product');
const {getUserById} = require('../controllers/user');
const {isLoggedIn,isAuthorized,isAdmin} = require('../controllers/auth');

//Params
router.param('userId',getUserById);
router.param('productId',getProductById);

router.get('/product/:productId',getProduct);
router.get('/products',getAllProducts);
router.get("/products/categories",getAllUniqueCategories);
//router.get("/product/photo/:productId",getFile);
router.post('/product/create/:userId',isLoggedIn,isAuthorized,isAdmin,createProduct);
router.put('/product/:productId/:userId',isLoggedIn,isAuthorized,isAdmin,updateProduct);
router.delete('/product/:productId/:userId',isLoggedIn,isAuthorized,isAdmin,deleteProduct);

module.exports = router;
