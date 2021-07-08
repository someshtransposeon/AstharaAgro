const express = require('express');
const router = express.Router();
const User = require('../../models/user/user');

router.post('/create_user', (req, res)=>{
    var newUser = new User({
        category: req.body.category,
        full_name: req.body.full_name,
        email: req.body.email,
        mobile_no: req.body.mobile_no,
        address: req.body.address,
        gst_no: req.body.gst_no,
        bank_details: req.body.bank_details,
    })
    newUser.save()
    .then(user => {
        res.json(user);
    })
    .catch(err => res.json(err));
});

module.exports = router;