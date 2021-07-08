const express = require("express");
const router = express.Router();
const Indent=require('../../models/indent/indent')

router.get('/deleteindent/:id',(req, res) =>{ 
    Indent.findOneAndRemove({'_id':req.params.id})
    .then((indent) => {
        if(indent){
            var message = { success: "sucessfully deleted" };
            res.json(message);
        }else{
            var message = { error: "Indent not found" };
            res.json(message);
        }
    }).catch(err => {
        console.log(err);
        var message = { success: false, err: err };
        res.json(message);
    })
});

module.exports = router;