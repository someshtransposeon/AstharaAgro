const express = require('express');
const router = express.Router();
/* Required Model for store in database*/
const Transport= require('../../models/transport_labour/transport_labour');

//Define Route to create order 
router.put('/edit_transport/:id', (req, res)=>{
    var Transport = new Transport({
        buyerId: req.body.buyerId,
        vehicle_number: req.body.vehicle_number,
        driver_name: req.body.driver_name,
        labour_name: req.body.labour_name,
        driver_mobile_no: req.body.driver_mobile_no,
        labour_mobile_no:req.body.labour_mobile_no,
        orders_items: req.body.orders_items,
    })
    Transport.findOneAndUpdate({'_id':req.params.id}, Transport)
    .then((order) => {
        if(order){
            var message = { message: "order sucessfully updated" };
            res.json(message);
        }else{
            var message = { message: "order not found" };
            res.json(message);
        }
    }).catch(err => {
        console.log(err);
        var message = { success: false, err: err };
        res.json(message);
    })
});

module.exports = router;