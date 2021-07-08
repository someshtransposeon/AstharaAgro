const express = require('express');
const router = express.Router();
const Order = require('../../models/order/order');

router.get('/delete_order/:id',(req, res) =>{ 
    Order.findOneAndRemove({'_id':req.params.id})
    .then((order) => {
        if(order){
            var message = { success: "order sucessfully deleted" };
            res.json(message);
        }else{
            var message = { error: "Order not found" };
            res.json(message);
        }
    }).catch(err => {
        console.log(err);
        var message = { success: false, err: err };
        res.json(message);
    })
});

module.exports = router;