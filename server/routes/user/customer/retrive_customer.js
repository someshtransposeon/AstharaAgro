const express = require('express');
const router = express.Router();
const Customer=require('../../../models/user/customer');

router.get('/retrive_all_customer',(req, res)=>{
    Customer.find({status:"enabled"}, function(err, vendor){
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

// router.get('/retrive_all_disabled_customer',(req, res)=>{
//     Customer.find({status:"disabled"}, function(err, vendor){
//         if(err){
//             console.log(err);
//         }
//         else {
//             res.json(vendor);
//         }
//     });
// });

// router.get('/retrive_all_delete_requests',(req, res)=>{
//     Customer.find({remark:"detete account request sent!" , status:"enabled"}, function(err, vendor){
//         if(err){
//             console.log(err);
//         }
//         else {
//             res.json(vendor);
//         }
//     });
// });


module.exports = router;