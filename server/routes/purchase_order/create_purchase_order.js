const express = require('express');
const router = express.Router();
const PurchaseOrder = require('../../models/purchase_order/purchase_order');

router.post('/create_purchase_order', (req, res)=>{
    var newPurchaseOrder = new PurchaseOrder({
        orderId:req.body.orderId,
        custom_orderId:req.body.custom_orderId,
        custom_vendorId:req.body.custom_vendorId,
        items:req.body.items,
        user_id:req.body.user_id,
        vendor_id:req.body.vendor_id,
        order_id:req.body.order_id,
        customerPoolId: req.body.customerPoolId,
        vendorPoolId: req.body.vendorPoolId,
    })
    newPurchaseOrder.save()
    .then(post => {
        var message={message:"successfully Purchase Order Created"};
        res.json(message);
    })
    .catch(err => res.json(err));
});

module.exports = router;