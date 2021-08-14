const express = require('express');
const router = express.Router();
const ItemGrade = require('../../models/itemGrade/item_grade');

router.get('/delete_item_grade/:id',(req, res) =>{ 
    ItemGrade.findOneAndRemove({'_id':req.params.id})
    .then((grade) => {
        if(grade){
            var message = { success: "grade sucessfully deleted" };
            res.json(message);
        }else{
            var message = { error: "grade not found" };
            res.json(message);
        }
    }).catch(err => {
        console.log(err);
        var message = { success: false, err: err };
        res.json(message);
    })
});

module.exports = router;