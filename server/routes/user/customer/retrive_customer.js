const express = require('express');
const router = express.Router();
const Customer=require('../../../models/user/customer');

router.get('/retrive_all_customer',(req, res)=>{
    Customer.find({}, function(err, vendor){
        if(err){
            console.log(err);
        }
        else {
            res.json(vendor);
        }
    });
});

router.get('/retrive_customer/:id',(req, res)=>{
    Customer.find({'_id':req.params.id}, function(err, user){
        if(err){
            console.log(err);
        }
        else {
            res.json(user);
        }
    });
});

module.exports = router;