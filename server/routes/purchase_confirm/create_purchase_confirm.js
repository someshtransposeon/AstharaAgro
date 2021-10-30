const express = require('express');
const router = express.Router();
const PurchaseOrderConfirm = require('../../models/purchase_confirm/purchase_confirm');

router.post('/create_purchase_confirm', (req, res)=>{
    var newPurchaseOrderConfirm = new PurchaseOrderConfirm({
        
        requestedBy:req.body.userId,
        orderId:req.body.orderId,
        items:req.body.items,
        user_id:req.body.user_id,
        vendor_id:req.body.vendor_id,
        indent_id:req.body.indent_id,
        purchaseId:req.body.purchaseId,
        purchase_order_date:req.body.purchase_order_date,
        purchase_order_time:req.body.purchase_order_tiem,
        // status:req.body.status,
    })
    newPurchaseOrderConfirm.save()
    .then(post => {
        var message={message:"Purchase Confirm Created"};
        res.json(message);
    })
    .catch(err => res.json(err));
});

module.exports = router;