const express = require('express');
const router = express.Router();
const Bank = require('../../models/bankDetails/bank');

router.get('/retrive_all_bank',(req, res)=>{
    Bank.find({}, function(err, bank){
        if(err){
            console.log(err);
        }
        else {
            res.json(bank);
        }
    });
});

router.get('/retrive_bank/:id',(req, res)=>{
    Bank.find({'_id':req.params.id}, function(err, bank){
        if(err){
            console.log(err);
        }
        else {
            res.json(bank);
        }
    });
});

module.exports = router;