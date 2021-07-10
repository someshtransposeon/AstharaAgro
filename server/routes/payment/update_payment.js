const express = require('express');
const router = express.Router();
const Payment = require('../../models/payment/payment');

router.put('/update_payment/:id',(req, res) =>{
    var payment_update = {
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

    }
    Payment.findOneAndUpdate({'_id':req.params.id}, payment_update)
    .then((payment) => {
        if(payment){
            var message = { success: "payment sucessfully updated" };
            res.json(message);
        }else{
            var message = { error: "payment not found" };
            res.json(message);
        }
    }).catch(err => {
        console.log(err);
        var message = { success: false, err: err };
        res.json(message);
    })
});

module.exports = router;