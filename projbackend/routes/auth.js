const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const {signout,signup} = require('../controllers/auth');

router.post('/signup',[
    check("email").isEmail().withMessage('Email is required'),
    check("password").isLength({ min: 8}).withMessage('Password must have minimum of 8 characters')
],signup);
router.get('/signout',signout);

module.exports=router;