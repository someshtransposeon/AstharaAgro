// const express = require('express');
// const router = express.Router();
// const InventoryType = require('../../models/inventoryType/inventoryType');

// router.get('/retrive_all_inventory_type',(req, res)=>{
//     InventoryType.find({}, function(err, retrive_inventory_types){
//         if(err){
//             console.log(err);
//         }
//         else {
//             res.json(retrive_inventory_types);
//         }
//     });
// });

// router.get('/retrive_inventory_type/:id',(req, res)=>{
//     InventoryType.find({'_id':req.params.id}, function(err, retrive_inventory_type){
//         if(err){
//             console.log(err);
//         }
//         else {
//             res.json(retrive_inventory_types);
//         }
//     });
// });

// module.exports = router;