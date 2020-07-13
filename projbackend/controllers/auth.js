const User = require('../models/user');
const { check, validationResult } = require('express-validator');
const { json } = require('body-parser');
var expressJwt = require('express-jwt');
var jwt = require('jsonwebtoken');
const user = require('../models/user');
require('dotenv').config()

exports.login = (req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({
            error:errors.array()
        });
    }

    const {email, password} = req.body;
    User.findOne({email},(err,user)=>{
        if(err || !user){
            return res.status(400).json({
                error:"User does not exist"
            });
        }
        
        if(!user.authenticate(password)){
            return res.status(401).json({
                error:"Email and password does not match"
            });
        }

        const token = jwt.sign({_id: user._id},process.env.JWTSECRET);
        res.cookie("token",token, {expire: new Date()+ 9999} );

        const {email:userEmail,_id:userId,firstName:userFirstName, role:userRole} = user;
        return res.json({token, user:{_id:userId, firstName:userFirstName,email:userEmail,role:userRole}});
        
    })

};
exports.signup = (req,res)=>{
const errors = validationResult(req);
console.log(errors);
if(!errors.isEmpty()){
    return res.status(422).json({
        error:errors.array()
    });
}
const user = new User(req.body);
user.save((err,user)=>{
    if(err){
        return res.status(400).json({
            err:`User not created, ${err}`
        });
    }
    else{
        return res.status(200).json({
            _id:user._id,
            name:user.firstName,
            email:user.email,
        });
    }
});
};

exports.signout = (req,res)=>{
    res.clearCookie("token");
    res.json({
        message:"User Signed Out"
    });
};


exports.isLoggedIn = expressJwt({
    secret:process.env.JWTSECRET,
    userProperty:"auth"
});

exports.isAuthorized= (req,res,next)=>{

    let checker = req.profile&&req.auth&&req.profile._id==req.auth._id;
    if(!checker){
        return res.status(403).json({
            error:"ACCESS DENIED"
        });
    }
    next();
};
exports.isAdmin= (req,res,next)=>{
    if(req.profile.role ===0){
        return res.status(403).json({
            error:"NOT AN ADMIN, ACCESS DENIED"
        });
    }
    next();
};