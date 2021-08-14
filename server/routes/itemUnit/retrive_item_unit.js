const express = require('express');
const router = express.Router();
const ItemUnit = require('../../models/itemUnit/item_unit');

router.get('/retrive_all_item_unit',(req, res)=>{
    ItemUnit.find({}, function(err, units){
        if(err){
            console.log(err);
        }
        else {
            res.json(units);
        }
    });
});

router.get('/retrive_item_unit/:id',(req, res)=>{
    ItemUnit.find({'_id':req.params.id}, function(err, units){
        if(err){
            console.log(err);
        }
        else {
            res.json(units);
        }
    });
});

module.exports = router;