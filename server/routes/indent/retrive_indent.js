const express = require("express");
const router = express.Router();
const Indent=require('../../models/indent/indent')

router.get('/displayindent',(req, res)=>{
        Indent.find({}, function(err, indents){
        if(err){
            console.log(err);
        }
        else {
            res.json(indents);
        }
    });
});

router.get('/displayindent/:id',(req, res)=>{
        Indent.find({'_id':req.params.id}, function(err, indents){
        if(err){
            console.log(err);
        }
        else {
            res.json(indents);
        }
    });
});

module.exports = router;
