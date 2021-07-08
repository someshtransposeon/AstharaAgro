const express = require('express');
const router = express.Router();
const UserCategory = require('../../models/userCategory/user_category');

router.get('/delete_user_category/:id',(req, res) =>{ 
    UserCategory.findOneAndRemove({'_id':req.params.id})
    .then((category) => {
        if(category){
            var message = { success: "category sucessfully deleted" };
            res.json(message);
        }else{
            var message = { error: "category not found" };
            res.json(message);
        }
    }).catch(err => {
        console.log(err);
        var message = { success: false, err: err };
        res.json(message);
    })
});

module.exports = router;