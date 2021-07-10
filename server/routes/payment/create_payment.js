const express = require('express');
const router = express.Router();
const Payment = require('../../models/payment/payment');

router.post('/create_payment', (req, res)=>{
    var newPayment = new Payment({
        
        user_id: req.body.user_id,
        customer_id:req.body.customer_id,   
        order_id:req.body.order_id,
        item_description:req.body.item_description,
        emp_id:req.body.emp_id,
        vendor_id:req.body.vendor_id,
        indent_id:req.body.indent_id,
        purchase_order_id:req.body.purchase_order_id,
        grn_id:req.body.grn_id,
        inventory_id:req.body.inventory_id,
        address_id:req.body.address_id,
        total_payment:req.body.total_payment,

        remark:req.body.remark,
        status:req.body.status,


    })
    newPayment.save()
    .then(payment => {
        res.json(payment);
    })
    .catch(err => res.json(err));
});

module.exports = router;