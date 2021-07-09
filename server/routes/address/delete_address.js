const express = require('express');
const router = express.Router();
const Address = require('../../models/address/address');

router.get('/delete_address/:id',(req, res) =>{ 
    Address.findOneAndRemove({'_id':req.params.id})
    .then((address) => {
        if(address){
            var message = { success: "address sucessfully deleted" };
            res.json(message);
        }else{
            var message = { error: "address not found" };
            res.json(message);
        }
    }).catch(err => {
        console.log(err);
        var message = { success: false, err: err };
        res.json(message);
    })
});

module.exports = router;