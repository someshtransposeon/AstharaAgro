const express = require('express');
const router = express.Router();
const ItemCategory = require('../../models/itemCategory/item_category');

router.post('/create_item_category', (req, res)=>{
    var newCategory = new ItemCategory({
        category_name: req.body.category_name,
    })
    newCategory.save()
    .then(category => {
        var message={message:"successfully added new category!",category:category};
        res.json(message);
    })
    .catch(err => {
        var message={message:"successfully added new category!",error:err};
        res.json(message);
    })

        
});

module.exports = router;