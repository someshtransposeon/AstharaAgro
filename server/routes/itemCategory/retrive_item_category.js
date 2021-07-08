const express = require('express');
const router = express.Router();
const ItemCategory = require('../../models/itemCategory/item_category');

router.get('/retrive_all_item_category',(req, res)=>{
    ItemCategory.find({}, function(err, categories){
        if(err){
            console.log(err);
        }
        else {
            res.json(categories);
        }
    });
});

router.get('/retrive_item_category/:id',(req, res)=>{
    ItemCategory.find({'_id':req.params.id}, function(err, categories){
        if(err){
            console.log(err);
        }
        else {
            res.json(categories);
        }
    });
});

module.exports = router;