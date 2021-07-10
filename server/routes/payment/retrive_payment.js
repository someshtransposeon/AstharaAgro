const express = require('express');
const router = express.Router();
const Payment = require('../../models/payment/payment');

router.get('/retrive_all_payment',(req, res)=>{
    Payment.find({}, function(err, payments){
        if(err){
            console.log(err);
        }
        else {
            res.json(payments);
        }
    });
});

router.get('/retrive_payment/:id',(req, res)=>{
    Payment.find({'_id':req.params.id}, function(err, payment){
        if(err){
            console.log(err);
        }
        else {
            res.json(payment);
        }
    });
});

module.exports = router;