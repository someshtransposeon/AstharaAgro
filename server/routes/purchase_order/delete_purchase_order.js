const express = require('express');
const router = express.Router();
const PurchaseOrder = require('../../models/purchase_order/purchase_order');

router.get('/delete_purchase_order/:id',(req, res) =>{ 
    PurchaseOrder.findOneAndRemove({'_id':req.params.id})
    .then((purchase_order) => {
        if(purchase_order){
            var message = { success: "purchase order sucessfully deleted" };
            res.json(message);
        }else{
            var message = { error: "Purchase Order not found" };
            res.json(message);
        }
    }).catch(err => {
        console.log(err);
        var message = { success: false, err: err };
        res.json(message);
    })
});

module.exports = router;