const {Order, ProductCart} = require('../models/order');


exports.getOrderById = (req,res,next,id) => {

    Order.findById(id)
    .populate("products.product", "name price")
    .exec((err,order)=>{
        if(err){
            return res.status(400).json({
                error:"No Order Found"
            });
        }
        req.order = order;
        next();
    });
    
};

exports.createOrder = (req,res)=>{
    req.body.order.user = req.profile;

    const order = new Order(req.body.order);

    order.save((err,order)=>{
        if(err){
            return res.status(400).json({
                error:"Failed to place Order"
            });
        }
        res.json(order);
    });
}

exports.getOrder = (req,res)=>{
    return res.json(req.order);
};

exports.getAllOrders = (req,res)=>{
    Order.find()
    .populate("user", "_id name email")
    .exec((err,orders)=>{
        if(err){
            return res.status(400).json({
                error:"Orders Not Found"
            });
        }
        res.json(orders);
    })
};

exports.updateOrderStatus = (req,res)=>{

        Order.update(
            {_id: req.body.orderId},
            { $set: {status: req.body.status}},
            (err,order)=>{
                if(err){
                    return res.status(400).json({
                        error:"Order Status Update Failed"
                    });
                }
                res.json(order);
            }
            );
};

exports.getOrderStatus = (req,res) =>{
    return res.json(Order.schema.path("status").enumValues());
};
