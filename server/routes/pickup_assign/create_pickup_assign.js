const express = require('express');
const router = express.Router();
const PickupAssign = require('../../models/pickup_assign/pickup_assign');

router.post('/create_pickup_assign', (req, res)=>{
    var newPickupAssign = new PickupAssign({
        
        requestedBy:req.body.userId,
        orderId:req.body.orderId,
        items:req.body.items,
        user_id:req.body.user_id,
        vendor_id:req.body.vendor_id,
        // buyer_id:req.body.buyer_id,
        // indent_id:req.body.indent_id,
        
        pickup_assign_date:req.body.pickup_assign_date,
        pickup_assign_time:req.body.pickup_assign_tiem,

    })
    newPickupAssign.save()
    .then(post => {
        var message={message:"successfully Pickup Assigned"};
        res.json(message);
    })
    .catch(err => res.json(err));
});

module.exports = router;