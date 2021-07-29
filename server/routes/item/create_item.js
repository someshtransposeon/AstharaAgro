const express = require('express');
const router = express.Router();
const Item = require('../../models/item/item');

router.post('/create_item', (req, res)=>{
    var newItem = new Item({
        category: req.body.category,
        added_by: req.body.added_by,
        item_name: req.body.item_name,
        grade: req.body.grade,
        description: req.body.description,
        price: req.body.price,
        remark: req.body.remark,
        unit:req.body.unit,
        status: req.body.status,
    })
    newItem.save()
    .then(item => {
        var message={message:"sucessfully added!",item:item};
        res.json(message);
    })
    .catch(err =>{
        var message={message:"something went wrong!",error:err};
        res.json(message);
    }) 
});

module.exports = router;