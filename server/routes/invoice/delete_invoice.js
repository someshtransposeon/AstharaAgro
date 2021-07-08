const express = require("express");
const router = express.Router();
const Invoice=require('../../models/invoice/invoice')

router.get('/deleteinvoice/:id',(req, res) =>{ 
    Invoice.findOneAndRemove({'_id':req.params.id})
    .then((invoice) => {
        if(invoice){
            var message = { success: "sucessfully deleted" };
            res.json(message);
        }else{
            var message = { error: "Invoice not found" };
            res.json(message);
        }
    }).catch(err => {
        console.log(err);
        var message = { success: false, err: err };
        res.json(message);
    })
});

module.exports = router;