const express = require('express');
const router = express.Router();
/* Required Model for store in database*/
const Customer_pool = require('../../models/customer_pool/customer_pool');
//Define route for create customer_pool
router.put('/update_customer_pool/:id', (req, res)=>{
    var customer_pool = {
        state: req.body.state,
        region: req.body.region,
        sub_region: req.body.sub_region,
        postal_code: req.body.postal_code,
    }
    Customer_pool.findOneAndUpdate({'_id':req.params.id},customer_pool)
    .then((customer_pool) => {
        if(customer_pool){
            var message = { message: "customer_pool sucessfully updated!" };
            res.json(message);
        }else{
            var message = { message: "customer_pool not found!" };
            res.json(message);
        }
    }).catch(err => {
        console.log(err);
        var message = { message:"Something wrong!",success: false, err: err };
        res.json(message);
    })
});

module.exports = router;