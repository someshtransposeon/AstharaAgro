const express = require('express');
const router = express.Router();
const Customer = require('../../../models/user/customer');

router.put('/update_customer/:id',(req, res) =>{
    var status = {
        full_name: req.body.full_name,
        email: req.body.email,
        mobile_no: req.body.mobile_no,
        gst_no: req.body.gst_no,
    }
   Customer.findOneAndUpdate({'_id':req.params.id}, status)
    .then((status) => {
        if(status){
            var message = { message: "customer details updates uccessfully" };
            res.json(message);
        }else{
            var message = { message: "customer not found" };
            res.json(message);
        }
    }).catch(err => {
        console.log(err);
        var message = { message:"somthing went wrong!",success: false, err: err };
        res.json(message);
    })
});

module.exports = router;