const express = require('express');
const router = express.Router();
const Item = require('../../models/item/item');

router.put('/update_item/:id',(req, res) =>{
    var item_update = {
        category: req.body.category,
        added_by: req.body.added_by,
        item_name: req.body.item_name,
        grade: req.body.grade,
        description: req.body.description,
        price: req.body.price,
        remark: req.body.remark,
        unit:req.body.unit,
        status: req.body.status,
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