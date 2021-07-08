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
        status: req.body.status,
    })
    newItem.save()
    .then(item => {
        res.json(item);
    })
    .catch(err => res.json(err));
});

module.exports = router;