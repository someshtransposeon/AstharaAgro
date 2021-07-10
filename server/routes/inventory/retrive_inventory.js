const express = require('express');
const router = express.Router();
const RetriveInventory = require('../../models/inventory/inventory');

router.get('/retrive_inventory',(req, res)=>{
    RetriveInventory.find({}, function(err, retrive_inventory){
        if(err){
            console.log(err);
        }
        else {
            res.json(retrive_inventory);
        }
    });
});

module.exports = router;