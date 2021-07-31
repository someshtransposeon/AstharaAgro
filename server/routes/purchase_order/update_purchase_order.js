const express = require('express');
const router = express.Router();
const PurchaseOrder = require('../../models/purchase_order/purchase_order');

router.put('/update_purchase_order/:id',(req, res) =>{
    var purchase_order_update = {
        

        items:req.body.items,
    }
    PurchaseOrder.findOneAndUpdate({'_id':req.params.id}, purchase_order_update)
    .then((purchase_order) => {
        if(purchase_order){
            var message = {message: "Purchase Order sucessfully updated" };
            res.json(message);
        }else{
            var message = { messageerror: "Record not found" };
            res.json(message);
        }
    }).catch(err => {
        console.log(err);
        var message = { success: false, err: err };
        res.json(message);
    })
});

module.exports = router;