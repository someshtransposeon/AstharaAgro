const express = require('express');
const router = express.Router();
/* Required Model for store in database*/
const Vendor_pool = require('../../models/vendor_pool/vendor_pool');
//Define route for create Vendor_pool
router.put('/update_vendor_pool/:id', (req, res)=>{
    var newVendor_pool = new Vendor_pool({
        state: req.body.state,
        region: req.body.region,
        sub_region: req.body.sub_region,
        postal_code: req.body.postal_code,
    })
    Vendor_pool.findOneAndUpdate({'_id':req.params.id},newVendor_pool)
    .then((Vendor_pool) => {
        if(Vendor_pool){
            var message = { message: "Vendor_pool sucessfully updated!" };
            res.json(message);
        }else{
            var message = { message: "Vendor_pool not found!" };
            res.json(message);
        }
    }).catch(err => {
        console.log(err);
        var message = { message:"Something wrong!",success: false, err: err };
        res.json(message);
    })
});

module.exports = router;