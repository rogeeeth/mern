const express = require('express');
const routes = express.Router();

const {getUser, getUserById, updateUser} = require('../controllers/user');
const {isAdmin,isAuthorized,isLoggedIn} = require('../controllers/auth');
const router = require('./auth');


router.param('userId',getUserById);

router.get('/user/:userId',isLoggedIn,isAuthorized,getUser);
router.put('/user/:userId',isLoggedIn,isAuthorized,updateUser);
module.exports = router;
