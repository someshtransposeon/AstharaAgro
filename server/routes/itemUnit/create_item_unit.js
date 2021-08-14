const express = require('express');
const router = express.Router();
const ItemUnit = require('../../models/itemUnit/item_unit');

router.post('/create_item_unit', (req, res)=>{
    var newUnit = new ItemUnit({
        unit_name: req.body.unit_name,
    })
    newUnit.save()
    .then(unit => {
        var message={message:"successfully added new unit!",unit:unit};
        res.json(message);
    })
    .catch(err => {
        var message={message:"successfully added new unit!",error:err};
        res.json(message);
    })

        
});

module.exports = router;