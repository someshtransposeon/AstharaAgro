const express = require('express');
const router = express.Router();
const PickupAssignConfirm = require('../../models/pickup_assign_confirm/pickup_assign_confirm');

router.post('/create_pickup_assign_confirm', (req, res)=>{
    var newPickupAssignConfirm = new PickupAssignConfirm({
        
        requestedBy:req.body.userId,
        order_id:req.body.order_id,
        items:req.body.items,
        user_id:req.body.user_id,
        vendor_id:req.body.vendor_id,
        buyer_id:req.body.buyer_id,
        pickupAssignId:req.body.pickupAssignId,
        indent_id:req.body.indent_id,
        
        pickup_assign_confirm_date:req.body.pickup_assign_confirm_date,
        pickup_assign_confirm_time:req.body.pickup_assign_confirm_time,

    })
    newPickupAssignConfirm.save()
    .then(post => {
        var message={message:"successfully Create Pickup Assign Confirm"};
        res.json(message);
    })
    .catch(err => res.json(err));
});

module.exports = router;