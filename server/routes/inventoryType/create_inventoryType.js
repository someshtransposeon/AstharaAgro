const express = require("express");
const router = express.Router();
const inventoryType = require('../../models/inventoryType/inventoryType');

router.post('/inventory_type',(req,res)=>{
    var newInventoryType = new inventoryType({
        inventory_type: req.params.inventory_type,
    })
    newInventoryType.save()
    .then(inventorytype => {
        res.json(inventorytype);
        console.log("saved in database");
    })
    .catch(err => res.json(err))
});

module.exports = router;