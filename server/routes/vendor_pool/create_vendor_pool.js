const express = require('express');
const router = express.Router();
/* Required Model for store in database*/
const vendor_pool = require('../../models/vendor_pool/vendor_pool');
//Define route for create Vendor_pool
router.post('/create_vendor_pool', (req, res)=>{
    var newVendor_pool = new vendor_pool({
        pool_name: req.body.pool_name,
        postal_code: req.body.postal_code,
    })
    newVendor_pool.save()
    .then(Vendor_pool => {
        var message={message:" Vendor_pool added succesfully!",Vendor_pool:Vendor_pool}
        res.json(message);
    })
    .catch(err =>{
        var message={message:"something wrong!",error:err}
        res.json(message);
    }) 
});

module.exports = router;