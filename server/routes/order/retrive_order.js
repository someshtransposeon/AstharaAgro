const express = require('express');
const router = express.Router();
/* Required Model for store in database*/
const Order = require('../../models/order/order');
//Define ROute to  retrive all orders 
router.get('/retrive_all_order',(req, res)=>{
    Order.find({status:"pending"}, function(err, orders){
        if(err){
            console.log(err);
        }
        else {
            res.json(orders);
        }
    });
});

router.get('/retrive_all_completed_order',(req, res)=>{
    Order.find({completion_status:"pending for sales"}, function(err, orders){
        if(err){
            console.log(err);
        }
        else {
            res.json(orders);
        }
    });
});

router.get('/retrive_order/:id',(req, res)=>{
    Order.find({'_id':req.params.id}, function(err, order){
       if(err){
           console.log(err);
       }
       else {
           res.json(order);
       }
   });
});

router.get('/retrive_all_rejected_order',(req, res)=>{
    Order.find({status:"rejected"}, function(err, orders){
        if(err){
            console.log(err);
        }
        else {
            res.json(orders);
        }
    });
});
router.get('/retrive_all_approved_order',(req, res)=>{
    Order.find({status:"approved"}, function(err, orders){
        if(err){
            console.log(err);
        }
        else {
            res.json(orders);
        }
    });
});
router.get('/retrive_all_order_items',(req, res)=>{
    Order.find({}, function(err, orders){
        if(err){
            console.log(err);
        }
        else {
            res.json(orders);
        }
    });
});
module.exports = router;