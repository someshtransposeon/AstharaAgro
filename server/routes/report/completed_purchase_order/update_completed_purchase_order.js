const express = require('express');
const router = express.Router();
const Purchase_order = require('../../../models/report/completed_purchase_order/completed_purchase_order');

router.put('/update_flag_completed_purchase_order/:id', (req, res)=>{
    var Purchase = Purchase_order({
        flag:req.body.flag,
    })
    Purchase_order.findOneAndUpdate({'_id':req.params.id}, Purchase)
    .then((purchase_order) => {
        if(purchase_order){
            var message = {message: "all completed Purchase Order sucessfully updated"};
            res.json(message);
        }else{
            var message = { messageerror: "Record not found" };
            res.json(message);
        }
    }).catch(err => {
        console.log(err);
        var message = { success: false, err: err };
        res.json(message);
    })
});
