const Product = require('../models/product');
const formidable = require('formidable');
const _ = require('lodash');
const fs = require('fs');
const product = require('../models/product');



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
};

exports.deleteProduct = (req,res)=>{
    let product =  req.product;

    product.remove((err,deletedProduct)=>{
        if(err){
            return res.status(400).json({
                error: "Failed to Delete Product"
            });
        }
        res.json({
            message: "Deletion Successfull",
            deleteProduct
        });
    });
};

exports.updateProduct = (req,res)=>{

    let form = new formidable.IncomingForm();
    form.keepExtensions = true;

    form.parse(req,(err,fields,file)=>{
        if(err){
            return res.status(400).json({
                error:"Corrupted Image"
            });
        }

        let product = req.product;
        product = _.extend(product,fields);

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
                    error: "Updation of Product Failed"
                });
            };
            res.json(product);
        });
    });
};


exports.getAllProducts = (req,res)=>{
    let limit =  req.query.limit ? parseInt(req.query.limit) : 10;
    let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
    Product.find()
    .select("-photo")
    .populate("category")
    .sort([[sortBy, "asc"]])
    .limit(limit)
    .exec((err,products)=>{
        if(err || !products){
            return res.status(400).json({
                error:"No Product Found"
            });
        }
        res.json(products);
    })

};


exports.updateInventory = (req,res,next) =>{

    let myOperations =  req.body.order.products.map(product =>{
            return {
                updateOne : {
                    filter: {_id: product._id},
                    update: {$inc :{stock: -product.count,sold: +product.count}}
                }
            }
    });

    Product.bulkWrite(myOperations, {}, (err,result)=>{
        if(err){
            res.status(400).json({
                error:"Bulk Operation Failed"
            });
        }
        res.json({
            message: "Operation Successfull"
        })
    });
    next();
};

exports.getAllUniqueCategories = (req,res)=>{
    Product.distinct("category",(err,categories)=>{
    if(err){
        return res.status(400).json({
            error:"No Categories Found"
        });
    }
    res.json(categories);
    });
};
