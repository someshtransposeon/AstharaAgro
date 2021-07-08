const express = require("express");
const router = express.Router();
const Invoice=require('../../models/invoice/invoice')

router.post('/newinvoice',(req,res)=>{
    var newPost = new Invoice({
        // userId:req.params.userId,
        // customerId:req.params.customerId,
        requestedBy:req.params.userId,
        remark:req.body.remark,
        item_description:req.body.item_description,
        status:req.body.status,
    })
    newPost.save()
    .then(post => {
        res.json(post);
        console.log("save in data base");
    })
    .catch(err => res.json(err))
});

module.exports = router;