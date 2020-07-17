const express = require('express');
const router = express.Router();

const {getUserById,pushOrderInPurchaseList} = require('../controllers/user');
const {isLoggedIn,isAuthorized,isAdmin} = require('../controllers/auth');
const {updateInventory} = require('../controllers/product');

const {getOrderById,createOrder,getOrder,getAllOrders,updateOrderStatus,getOrderStatus} = require('../controllers/order');

router.param('orderId',getOrderById);
router.param('userId',getUserById);

router.post('/order/create/:userId',isLoggedIn,isAuthorized, pushOrderInPurchaseList, updateInventory,createOrder);


router.get('orders/all/:userId',isLoggedIn,isAuthorized,isAdmin,getAllOrders);
router.get('order/:orderId/:userId',isLoggedIn,isAuthorized,getOrder);
router.get('/order/status/:userId',isLoggedIn,isAuthorized,isAdmin,getOrderStatus);
router.put('order/:orderId/status/:userId', isLoggedIn,isAuthorized,isAdmin, updateOrderStatus);

module.exports = router;