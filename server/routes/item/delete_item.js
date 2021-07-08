const express = require('express');
const router = express.Router();
const Item = require('../../models/item/item');

router.get('/delete_item/:id',(req, res) =>{ 
    Item.findOneAndRemove({'_id':req.params.id})
    .then((item) => {
        if(item){
            var message = { success: "item sucessfully deleted" };
            res.json(message);
        }else{
            var message = { error: "item not found" };
            res.json(message);
        }
    }).catch(err => {
        console.log(err);
        var message = { success: false, err: err };
        res.json(message);
    })
});

module.exports = router;