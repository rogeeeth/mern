const mongoose = require('mongoose');
const crypto = require('crypto');
const {v1:uuidv1} = require('uuid');

var userSchema = new mongoose.Schema({
    firstName :{
        type:String,
        required:true,
        maxlength:32,
        trim:true
    },
    lastName:{
        type:String,
        maxlength:32,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    encryptPassword:{
        type:String,
        required:true
    },

    phoneNumber:{
        type:Number,
        maxlength:10,
        trim:true,
    },
    userInfo:{
        type:String,
        trim:true
    },

    salt:String,
    role:{
        type:Number,
        default:0
    },
    purchases:{
        type:Array,
        default:[]
    }
},{timestamps:true});

userSchema.virtual("password")
    .set(function(password){
        this._password = password;
        this.salt = uuidv1();
        this.encryptPassword = this.securePassword(password);

    })
    .get(function(){
        return this._password;
    });


userSchema.methods = {

    authenticate: function(plainPassword){
        return this.securePassword(plainPassword) === this.encryptPassword;
    },

    securePassword: function(plainPassword){
        if(!plainPassword)
            return "";
        try {
            return crypto.createHmac('sha256', this.salt)
            .update(plainPassword)
            .digest('hex'); 
        } catch (err) {
            return "";
        }
    }
};

module.exports = mongoose.model("User",userSchema);
