const express = require('express');
const router = express.Router();
const DeliveryBeat = require('../../models/delivery_beat/delivery_beat');

router.get('/retrive_all_delivery_beats',(req, res)=>{
    DeliveryBeat.find({}, function(err, delivery_beats){
        if(err){
            console.log(err);
        }
        else {
            res.json(delivery_beats);
        }
    });
});
router.get('/retrive_all_pending_delivery_beats',(req, res)=>{
    DeliveryBeat.find({status:"pending"}, function(err, delivery_beats){
        if(err){
            console.log(err);
        }
        else {
            res.json(delivery_beats);
        }
    });
});router.get('/retrive_all_accepted_delivery_beats',(req, res)=>{
    DeliveryBeat.find({status:"accepted"}, function(err, delivery_beats){
        if(err){
            console.log(err);
        }
        else {
            res.json(delivery_beats);
        }
    });
});
router.get('/retrive_delivery_beat/:id',(req, res)=>{
    DeliveryBeat.find({'_id':req.params.id}, function(err, delivery_beat){
        if(err){
            console.log(err);
        }
        else {
            res.json(delivery_beat);
        }
    });
});

router.get('/retrive_all_declined_delivery_beats',(req, res)=>{
    DeliveryBeat.find({status:"decline"}, function(err, delivery_beats){
        if(err){
            console.log(err);
        }
        else {
            res.json(delivery_beats);
        }
    });
});

module.exports = router;