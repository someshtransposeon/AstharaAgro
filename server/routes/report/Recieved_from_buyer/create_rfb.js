const express = require('express');
const router = express.Router();
const Recieved_from_buyer = require('../../../models/report/recieved_from_buyer/received_from_buyer');

router.post('/create_rfb', (req, res)=>{
    var newRfb = new Recieve_from_buyer({
        purchase_order:req.body.purchase_order,
    })
    newRfb.save()
    .then(post => {
        var message={message:"successfully added",purchase_details:post};
        res.json(message);
    })
    .catch(err => res.json(err));
});

module.exports = router;