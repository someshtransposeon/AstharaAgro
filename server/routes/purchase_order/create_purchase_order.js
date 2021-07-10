const express = require('express');
const router = express.Router();
const PurchaseOrder = require('../../models/purchase_order/purchase_order');

router.post('/create_purchase_order', (req, res)=>{
    var newPurchaseOrder = new PurchaseOrder({
        
        purchase_order_date:req.body.purchase_order_date,
        purchase_order_time:req.body.purchase_order_tiem,
        order_id:req.body.order_id,
        item_id:req.body.item_id,
        customer_id:req.body.customer_id,
        user_id:req.body.user_id,
        emp_id:req.body.emp_id,
        vendor_id:req.body.vendor_id,
        indent_id:req.body.indent_id,
        status:req.body.status,

    })
    newPurchaseOrder.save()
    .then(purchase_order => {
        res.json(purchase_order);
    })
    .catch(err => res.json(err));
});

module.exports = router;