const express = require("express");
const router = express.Router();
const Grn=require('../../models/grn/grn')

router.get('/displaygrn',(req, res)=>{
        Grn.find({}, function(err, Grns){
        if(err){
            console.log(err);
        }
        else {
            res.json(Grns);
        }
    });
});

router.get('/displaygrn/:id',(req, res)=>{
        Grn.find({'_id':req.params.id}, function(err, Grns){
        if(err){
            console.log(err);
        }
        else {
            res.json(Grns);
        }
    });
});

module.exports = router;
