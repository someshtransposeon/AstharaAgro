const express = require("express");
const router = express.Router();
const Invoice=require('../../models/invoice/invoice')

router.get('/displayinvoice',(req, res)=>{
        Invoice.find({}, function(err, invoice){
        if(err){
            console.log(err);
        }
        else {
            res.json(invoice);
        }
    });
});

router.get('/displayinvoice/:id',(req, res)=>{
        Invoice.find({'_id':req.params.id}, function(err, invoice){
        if(err){
            console.log(err);
        }
        else {
            res.json(invoice);
        }
    });
});

module.exports = router;
