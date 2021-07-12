const express = require('express');
const router = express.Router();
const DeliveryAssignment = require('../../models/delivery_assignment/delivery_assignment');

router.get('/retrive_all_delivery_assignments',(req, res)=>{
    DeliveryAssignment.find({}, function(err, retrive_all_delivery_assignments){
        if(err){
            console.log(err);
        }
        else {
            res.json(retrive_all_delivery_assignments);
        }
    });
});

router.get('/retrive_delivery_assignment/:id',(req, res)=>{
    DeliveryAssignment.find({'_id':req.params.id}, function(err, retrive_delivery_assignment){
        if(err){
            console.log(err);
        }
        else {
            res.json(retrive_delivery_assignment);
        }
    });
});

module.exports = router;