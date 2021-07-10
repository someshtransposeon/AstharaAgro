const express = require("express");
const router = express.Router();
const inventoryType = require('../../models/inventoryType/inventoryType');

router.get('/retrive_all_inventory_type',(req, res)=>{
        inventoryType.find({}, function(err, inventorytype){
        if(err){
            console.log(err);
        }
        else{
            res.json(inventorytype);
        }
    });
});

router.get('/retrive_inventory_type/:id',(req, res)=>{
        inventoryType.find({'_id':req.params.id}, function(err, inventorytype){
        if(err){
            console.log(err);
        }
        else{
            res.json(inventorytype);
        }
    });
});

module.exports = router;
