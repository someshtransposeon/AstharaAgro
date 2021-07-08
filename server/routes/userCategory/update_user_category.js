const express = require('express');
const router = express.Router();
const UserCategory = require('../../models/userCategory/user_category');

router.put('/update_user_category/:id',(req, res) =>{
    var category_update = {
        category_name: req.body.category_name,
    }
    UserCategory.findOneAndUpdate({'_id':req.params.id}, category_update)
    .then((category) => {
        if(category){
            var message = { success: "user category sucessfully updated" };
            res.json(message);
        }else{
            var message = { error: "user category not found" };
            res.json(message);
        }
    }).catch(err => {
        console.log(err);
        var message = { success: false, err: err };
        res.json(message);
    })
});

module.exports = router;