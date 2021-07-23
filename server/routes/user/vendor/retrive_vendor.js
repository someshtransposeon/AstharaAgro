const express = require('express');
const router = express.Router();
const Vendor=require('../../../models/user/vendor');

router.get('/retrive_all_vendor',(req, res)=>{
    Vendor.find({}, function(err, vendor){
        if(err){
            console.log(err);
        }
        else {
            res.json(vendor);
        }
    });
});

router.get('/retrive_vendor/:id',(req, res)=>{
    Vendor.find({'_id':req.params.id}, function(err, user){
        if(err){
            console.log(err);
        }
        else {
            res.json(user);
        }
    });
});

module.exports = router;