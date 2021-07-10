const express = require("express");
const router = express.Router();
const Invoice=require('../../models/invoice/invoice')

router.put('/updateinvoice/:id',(req, res) =>{ 
    var newupdate = {
        userId:req.body.userId,
        customerId:req.body.customerId,
        createdBy:req.body.userId,
        orderId:req.body.orderId,
        purchaseOrder:req.body.purchaseOrder,
        vendorId:req.body.vendorId,
        indentId:req.body.vendorId,
        item_description:req.body.item_description,
        date_of_issue:req.body.status,
    }
    Invoice.findOneAndUpdate({'_id':req.params.id},newupdate)
    .then((indent) => {
        if(indent){
            var message = { success: "sucessfully updated" };
            res.json(message);
        }else{
            var message = { error: "Invoice not found" };
            res.json(message);
        }
    }).catch(err => {
        console.log(err);
        var message = { success: false, err: err };
        res.json(message);
    })
});

module.exports = router;