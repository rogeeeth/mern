const express = require('express');
const router = express.Router();

const {getCategoryById,createCategory,getCategory, getAllCategories,updateCategory,deleteCategory} = require('../controllers/category');
const {getUserById} = require('../controllers/user');
const {isAdmin,isLoggedIn,isAuthorized} = require('../controllers/auth');


router.param('userId',getUserById);
router.param('categoryId',getCategoryById);


router.post('/category/create/:userId', isLoggedIn, isAuthorized, isAdmin, createCategory);
router.get('/category/:categoryId',getCategory);
router.get('/categories',getAllCategories);
router.put('/category/:categoryId/:userId',isLoggedIn,isAuthorized,isAdmin,updateCategory);
router.delete('/category/:categoryId/:userId',isLoggedIn,isAuthorized,isAdmin,deleteCategory);

module.exports = router;