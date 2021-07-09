const express = require('express');
const router = express.Router();
const Bank = require('../../models/bankDetails/bank');

router.get('/delete_bank/:id',(req, res) =>{ 
    Bank.findOneAndRemove({'_id':req.params.id})
    .then((bank) => {
        if(bank){
            var message = { success: "bank details sucessfully deleted" };
            res.json(message);
        }else{
            var message = { error: "bank details not found" };
            res.json(message);
        }
    }).catch(err => {
        console.log(err);
        var message = { success: false, err: err };
        res.json(message);
    })
});

module.exports = router;