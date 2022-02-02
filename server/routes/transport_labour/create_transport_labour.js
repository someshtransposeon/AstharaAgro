const express = require('express');
const router = express.Router();
/* Required Model for store in database*/
const Transport= require('../../models/transport_labour/transport_labour');

//Define Route to create order 
router.post('/create_transport_labour', (req, res)=>{
    var newTransport = new Transport({
        buyerId: req.body.buyerId,
        vehicle_number: req.body.vehicle_number,
        driver_name: req.body.driver_name,
        labour_name: req.body.labour_name,
        driver_mobile_no: req.body.driver_mobile_no,
        labour_mobile_no:req.body.labour_mobile_no,
        orders_items: req.body.orders_items,
    })
    newTransport.save()
    .then(transport=> {
        var message={message:"transport details has been Successfully submitted!",transport:transport};
        res.json(message);
    })
    .catch(err => {
        var message={message:"Something went wrong!",error:err};
        res.json(message);
    })
});

module.exports = router;