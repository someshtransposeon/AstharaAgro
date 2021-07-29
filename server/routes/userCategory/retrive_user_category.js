const express = require('express');
const router = express.Router();
const UserCategory = require('../../models/userCategory/user_category');

router.get('/retrive_all_user_category',(req, res)=>{
    UserCategory.find({}, function(err, categories){
        if(err){
            console.log(err);
        }
        else {
            res.json(categories);
        }
    });
});

router.get('/retrive_user_category/:id',(req, res)=>{
    UserCategory.find({'_id':req.params.id}, function(err, categories){
        if(err){
            console.log(err);
        }
        else {
            res.json(categories);
        }
    });
});
router.get('/retrive_user_category_type/:type',(req, res)=>{
    UserCategory.find({'category_name':req.params.type}, function(err, categories){
        if(err){
            console.log(err);
        }
        else {
            res.json(categories);
        }
    });
});

module.exports = router;