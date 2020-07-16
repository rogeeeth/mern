const Product = require('../models/product');
const formidable = require('formidable');
const _ = require('lodash');
const fs = require('fs');



exports.getProductById = (req,res,next,id) =>{

    Product.find(id)
    .populate('category')
    .exec((err,product)=>{
        if(err || !product){
            return res.status(400).json({
                error:"Product not found"
            });
        }
        req.product = product;
    });

    next();
};

exports.createProduct = (req,res)=>{

    let form = new formidable.IncomingForm();
    form.keepExtensions = true;

    form.parse(req,(err,fields,file)=>{
        if(err){
            return res.status(400).json({
                error:"Corrupted Image"
            });
        }

        let product = new Product(fields);
        
        if(file.photo){
            if(file.photo.size > 3000000){
                return res.status(400).json({
                    error:"File Size Too Big"
                });
            }
            product.photo.data = fs.readFileSync(file.photo.path);
            product.photo.contentType = file.photo.type;
        }

        product.save((err,product)=>{
            if(err){
                res.status(400).json({
                    error: "Saving Product Failed"
                });
            }
            res.json(product);
        });
    });
};

exports.getProduct = (req,res)=>{
    req.product.photo = undefined;
    return res.json(req.product);
};

exports.getFile = (req,res,next)=>{
    if(req.product.photo.data){
        res.set("Content-Type",req.product.photo.contentType);
        return res.send(req.product.photo.data);
    }

    next();
}