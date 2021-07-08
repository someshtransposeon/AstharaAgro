const express = require('express');
const router = express.Router();
const ItemCategory = require('../../models/itemCategory/item_category');

router.put('/update_item_category/:id',(req, res) =>{
    var category_update = {
        category_name: req.body.category_name,
    }
    ItemCategory.findOneAndUpdate({'_id':req.params.id}, category_update)
    .then((category) => {
        if(category){
            var message = { success: "item category sucessfully updated" };
            res.json(message);
        }else{
            var message = { error: "item category not found" };
            res.json(message);
        }
    }).catch(err => {
        console.log(err);
        var message = { success: false, err: err };
        res.json(message);
    })
});

module.exports = router;