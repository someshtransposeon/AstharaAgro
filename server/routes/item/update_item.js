const express = require('express');
const router = express.Router();
const Item = require('../../models/item/item');

router.put('/update_item/:id',(req, res) =>{
    var item_update = {
        category: req.body.category,
        grade: req.body.grade,
        unit: req.body.unit,
        added_by: req.body.added_by,
        item_name: req.body.item_name,
        category_name: req.body.category_name,
        grade_name: req.body.grade_name,
        description: req.body.description,
        unit_name:req.body.unit_name,
    }
    Item.findOneAndUpdate({'_id':req.params.id}, item_update)
    .then((item) => {
        if(item){
            var message = {message: "item sucessfully updated" };
            res.json(message);
        }else{
            var message = { error: "item not found" };
            res.json(message);
        }
    }).catch(err => {
        console.log(err);
        var message = { message: false, err: err };
        res.json(message);
    })
});

module.exports = router;