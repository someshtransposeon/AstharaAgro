const express = require('express');
const router = express.Router();
const PurchaseOrder = require('../../models/purchase_order/purchase_order');

router.put('/update_purchase_order/:id',(req, res) =>{
    var purchase_order_update = {
        
        // purchase_order_date:req.body.purchase_order_date,
        // purchase_order_time:req.body.purchase_order_tiem,
        // order_id:req.body.order_id,
        item_id:req.body.item_id,
        // customer_id:req.body.customer_id,
        // user_id:req.body.user_id,
        // emp_id:req.body.emp_id,
        // vendor_id:req.body.vendor_id,
        // indent_id:req.body.indent_id,
        // status:req.body.status,
    }
    PurchaseOrder.findOneAndUpdate({'_id':req.params.id}, purchase_order_update)
    .then((purchase_order) => {
        if(purchase_order){
            var message = { success: "purchase order sucessfully updated" };
            res.json(message);
        }else{
            var message = { error: "purchase order not found" };
            res.json(message);
        }
    }).catch(err => {
        console.log(err);
        var message = { success: false, err: err };
        res.json(message);
    })
});

module.exports = router;