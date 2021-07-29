const express = require('express');
const router = express.Router();
const User = require('../../../models/user/user');

router.put('/update_user/:id',(req, res) =>{
    var user_update = {
        category: req.body.category,
        role: req.body.role,
        full_name: req.body.full_name,
        email: req.body.email,
        mobile_no: req.body.mobile_no,
        address: req.body.address,
        gst_no: req.body.gst_no,
        bank_details: req.body.bank_details,
    }
    User.findOneAndUpdate({'_id':req.params.id}, user_update)
    .then((user) => {
        if(user){
            var message = { message: "user sucessfully updated" };
            res.json(message);
        }else{
            var message = { message: "user not found" };
            res.json(message);
        }
    }).catch(err => {
        console.log(err);
        var message = {message:"Something went wrong!", success: false, err: err };
        res.json(message);
    })
});

module.exports = router;