const express = require('express');
const router = express.Router();
const User = require('../../models/user/user');

router.get('/retrive_all_user',(req, res)=>{
    User.find({}, function(err, users){
        if(err){
            console.log(err);
        }
        else {
            res.json(users);
        }
    });
});

router.get('/retrive_user/:id',(req, res)=>{
    User.find({'_id':req.params.id}, function(err, user){
        if(err){
            console.log(err);
        }
        else {
            res.json(user);
        }
    });
});

module.exports = router;