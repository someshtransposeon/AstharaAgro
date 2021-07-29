const express = require('express');
const router = express.Router();
const Item = require('../../models/item/item');

router.get('/delete_item/:id',(req, res) =>{ 
    Item.findOneAndRemove({'_id':req.params.id})
    .then((item) => {
        if(item){
            var message = { message: "item sucessfully deleted" };
            res.json(message);
        }else{
            var message = { message: "item not found" };
            res.json(message);
        }
    }).catch(err => {
        console.log(err);
        var message = { message: false, err: err };
        res.json(message);
    })
});

module.exports = router;