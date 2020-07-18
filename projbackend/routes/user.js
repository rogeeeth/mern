const express = require('express');
const router = express.Router();

const {getUser, getUserById, updateUser,getUserPurchaseList} = require('../controllers/user');
const {isLoggedIn,isAuthorized,isAdmin} = require('../controllers/auth');

router.param('userId',getUserById);

router.get('/user/:userId',isLoggedIn,isAuthorized,getUser);
router.get('/user/orders/:userId',isLoggedIn,isAuthorized,getUserPurchaseList);
router.put('/user/:userId',isLoggedIn,isAuthorized,updateUser);

module.exports = router;
