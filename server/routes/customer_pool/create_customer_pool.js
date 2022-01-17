const express = require('express');
const router = express.Router();
/* Required Model for store in database*/
const customer_pool = require('../../models/customer_pool/customer_pool');
//Define route for create customer_pool
router.post('/create_customer_pool', (req, res)=>{
    var newcustomer_pool = new customer_pool({
        state: req.body.state,
        region: req.body.region,
        sub_region: req.body.sub_region,
        postal_code: req.body.postal_code,
    })
    newcustomer_pool.save()
    .then(customer_pool => {
        var message={message:" customer_pool added succesfully!",customer_pool:customer_pool}
        res.json(message);
    })
    .catch(err =>{
        var message={message:"something wrong!",error:err}
        res.json(message);
    }) 
});

module.exports = router;