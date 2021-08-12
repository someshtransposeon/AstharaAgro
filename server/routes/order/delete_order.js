const express = require('express');
const router = express.Router();
const Order = require('../../models/order/order');

router.get('/delete_order/:id',(req, res) =>{ 
    Order.findOneAndRemove({'_id':req.params.id})
    .then((order) => {
        if(order){
            var message = { message: "order sucessfully deleted" };
            res.json(message);
        }else{
            var message = { message: "Order not found" };
            res.json(message);
        }
    }).catch(err => {
        console.log(err);
        var message = { message: false, err: err };
        res.json(message);
    })
});

module.exports = router;