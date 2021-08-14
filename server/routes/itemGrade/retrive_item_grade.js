const express = require('express');
const router = express.Router();
const ItemGrade = require('../../models/itemGrade/item_grade');

router.get('/retrive_all_item_grade',(req, res)=>{
    ItemGrade.find({}, function(err, grades){
        if(err){
            console.log(err);
        }
        else {
            res.json(grades);
        }
    });
});

router.get('/retrive_item_grade/:id',(req, res)=>{
    ItemGrade.find({'_id':req.params.id}, function(err, grades){
        if(err){
            console.log(err);
        }
        else {
            res.json(grades);
        }
    });
});

module.exports = router;