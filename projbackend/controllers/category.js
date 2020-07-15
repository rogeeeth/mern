const Category = require('../models/category');
const category = require('../models/category');
exports.getCategoryById= (req,res,next,id)=>{


    Category.findById(Id).exec((err,category)=>{
        if(err){
            return res.status(400).json({
                error:"Category not found in DB"
            });
        }
        req.category = category;
    });
    
    next();  
};

exports.createCategory = (re,res) =>{

    const category = new Category(req.body);
    category.save((err,category)=>{
        if(err){
            return res.status(400).json({
                error:"Saving Unsuccessful"
            });
        }
        res.json({category});
    });
};

exports.getCategory = (req,res)=>{
    return res.json(req.category);
};

exports.getAllCategories = (req,res)=>{
    Category.find().exec((err,categories)=>{
        if(err){
            return res.status(400).json({
                error:"No Catgories Found"
            });
        }
        res.json(categories);
    });
};

exports.updateCategory = (req,res) =>{
    const category = req.category;//from middleware
    category.name = req.body.name;//from front end
    category.save((err,update)=>{
        if(err){
            return res.status(400).json({
                error:"Udation Failed"
            });
        }
        res.json(update);
    });
};

exports.deleteCategory = (req,res)=>{
    const category = req.category;
    category.remove((err,category)=>{
        if(err){
            return res.status(400).json({
                error:"Failed to delete this category"
            });
        }
        res.json({
            message:"Successfully Deleted"
        });
    });
};