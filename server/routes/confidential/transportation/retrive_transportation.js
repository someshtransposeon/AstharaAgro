const express = require('express');
const router = express.Router();
/* Required Model for store in database*/
const Transportation = require('../../../models/confidential/transportation/transportation');


//Define Route for Retrive address using user_id
router.get('/retrive_transportation',(req, res)=>{
    Transportation.find({}, function(err, transportation){
        if(err){
            console.log(err);
        }
        else {
            res.json(transportation);
        }
    });
});
router.get('/retrive_transportation/:id',(req, res)=>{
    Transportation.find({'_id':req.params.id}, function(err, transportation){
        if(err){
            console.log(err);
        }
        else {
            res.json(transportation);
        }
    });
});
router.get('/retrive_all_transportation_category',(req, res)=>{
    Transportation.find({}, function(err, transportation){
        if(err){
            console.log(err);
        }
        else {
            res.json(transportation);
        }
    });
});
module.exports = router;