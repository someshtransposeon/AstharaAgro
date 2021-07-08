const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../../models/user/user');

router.post('/create_user', (req, res)=>{
    if(req.body.password==req.body.confirm_password){
        bcrypt.hash(req.body.password, 12, function(err, hash){
            var newUser = new User({
                category: req.body.category,
                full_name: req.body.full_name,
                email: req.body.email,
                mobile_no: req.body.mobile_no,
                address: req.body.address,
                gst_no: req.body.gst_no,
                bank_details: req.body.bank_details,
                password: hash,
            })
            newUser.save()
            .then(user => {
                res.json(user);
            })
            .catch(err => res.json(err));
        });
    }
    else{
        var message = { success:"password and confirm password not equal" };
        res.json(message);
    }
});

module.exports = router;