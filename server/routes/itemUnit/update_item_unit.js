const express = require('express');
const router = express.Router();
const ItemUnit = require('../../models/itemUnit/item_unit');

router.put('/update_item_unit/:id',(req, res) =>{
    var unit_update = {
        unit_name: req.body.unit_name,
    }
    ItemUnit.findOneAndUpdate({'_id':req.params.id}, unit_update)
    .then((unit) => {
        if(unit){
            var message = { message: "item unit sucessfully updated" };
            res.json(message);
        }else{
            var message = { message: "item unit not found" };
            res.json(message);
        }
    }).catch(err => {
        console.log(err);
        var message = {message:"something went wrong!", success: false, err: err };
        res.json(message);
    })
});

module.exports = router;