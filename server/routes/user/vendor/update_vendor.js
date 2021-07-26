const express = require('express');
const router = express.Router();
const Vendor = require('../../../models/user/vendor');

router.put('/deactivate_vendor/:id',(req, res) =>{
    var status = {
        status:"deactivate",
    }
    Vendor.findOneAndUpdate({'_id':req.params.id}, status)
    .then((status) => {
        if(status){
            var message = { success: "venor deleted successfully" };
            res.json(message);
        }else{
            var message = { error: "vendor not found" };
            res.json(message);
        }
    }).catch(err => {
        console.log(err);
        var message = { success: false, err: err };
        res.json(message);
    })
});

module.exports = router;