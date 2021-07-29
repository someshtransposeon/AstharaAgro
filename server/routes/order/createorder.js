const express = require('express');
const router = express.Router();
const Order = require('../../models/order/order');

router.post('/create_order', (req, res)=>{
    var newOrder = new Order({
        // customer_id: req.body.customer_id,
        // user_id: req.body.user_id,
        // item_description:req.body.item_description,
        // inventory_id: req.body.inventory_id,
        // address_id: req.body.address_id,
        // status: req.body.status,
        name: req.body.name,
        email: req.body.email,
        mobile_no: req.body.mobile_no,
        address: req.body.address,
        items: req.body.items,
    })
    newOrder.save()
    .then(order => {
        var message={message:"your order has been Successfully submitted!",order:order};
        res.json(message);
    })
    .catch(err => {
        var message={message:"Something went wrong!",error:err};
        res.json(message);
    })
});

module.exports = router;