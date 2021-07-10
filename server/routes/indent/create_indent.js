const express = require("express");
const router = express.Router();
const Indent=require('../../models/indent/indent')

router.post('/newindent',(req,res)=>{
    var newPost = new Indent({
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
        console.log("save in data base"+Indent);
    })
    .catch(err => res.json(err))
});

module.exports = router;