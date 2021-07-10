const express = require('express');
const router = express.Router();
const PurchaseOrder = require('../../models/purchase_order/purchase_order');

router.get('/retrive_all_purchase_order',(req, res)=>{
    PurchaseOrder.find({}, function(err, purchase_orders){
        if(err){
            console.log(err);
        }
        else {
            res.json(purchase_orders);
        }
    });
});

router.get('/retrive_purchase_order/:id',(req, res)=>{
    PurchaseOrder.find({'_id':req.params.id}, function(err, purchase_order){
        if(err){
            console.log(err);
        }
        else {
            res.json(purchase_order);
        }
    });
});

module.exports = router;