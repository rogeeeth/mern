const User = require('../models/user');
const { check, validationResult } = require('express-validator');

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
    res.send('Bye!');
};