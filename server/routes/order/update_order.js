const express = require('express');
const router = express.Router();
const Order = require('../../models/order/order');

router.put('/update_order/:id',(req, res) =>{
    var order_update = {
        
        //customer_id: req.body.customer_id,
        //user_id: req.body.user_id,
        item_id: req.body.item_id,
        inventory_id: req.body.inventory_id,
        //address_id: req.body.address_id,
        //status: req.body.status,
    }
    Order.findOneAndUpdate({'_id':req.params.id}, order_update)
    .then((order) => {
        if(order){
            var message = { success: "order sucessfully updated" };
            res.json(message);
        }else{
            var message = { error: "order not found" };
            res.json(message);
        }
    }).catch(err => {
        console.log(err);
        var message = { success: false, err: err };
        res.json(message);
    })
});

module.exports = router;