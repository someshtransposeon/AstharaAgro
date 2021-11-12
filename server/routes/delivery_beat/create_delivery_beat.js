const express = require('express');
const router = express.Router();
const DeliveryBeat = require('../../models/delivery_beat/delivery_beat');

router.post('/create_delivery_beat', (req, res)=>{
    var newDeliveryBeat = new DeliveryBeat({
        
        requestedBy:req.body.userId,
        orderId:req.body.orderId,
        items:req.body.items,
        user_id:req.body.user_id,
        vendor_id:req.body.vendor_id,
        pickup_id:req.body.pickup_id,
        buyer_id:req.body.buyer_id,
        indent_id:req.body.indent_id,
        
        delivery_beat_date:req.body.delivery_beat_date,
        delivery_beat_time:req.body.delivery_beat_time,

    })
    newDeliveryBeat.save()
    .then(post => {
        var message={message:"successfully Delivery Beat"};
        res.json(message);
    })
    .catch(err => res.json(err));
});

module.exports = router;