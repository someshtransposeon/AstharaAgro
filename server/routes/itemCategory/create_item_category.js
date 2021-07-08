const express = require('express');
const router = express.Router();
const ItemCategory = require('../../models/itemCategory/item_category');

router.post('/create_item_category', (req, res)=>{
    var newCategory = new ItemCategory({
        category_name: req.body.category_name,
    })
    newCategory.save()
    .then(category => {
        res.json(category);
    })
    .catch(err => res.json(err));
});

module.exports = router;