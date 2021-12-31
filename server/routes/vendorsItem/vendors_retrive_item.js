const express = require('express');
const router = express.Router();
/* Required Model for store in database*/
const VendorsItem = require('../../models/vendorsItem/vendors_item');
//DEfine Route to retrive all items
router.get('/vendors_retrive_all_item',(req, res)=>{
    VendorsItem.find({status:"enabled"}, function(err, items){
        if(err){
            console.log(err);
        }
        else {
            res.json(items);
        }
    });
});
//Define route to retrive item by item id
router.get('/vendors_retrive_item/:vendorid',(req, res)=>{
    VendorsItem.find({}, function(err, item){
        if(err){
            console.log(err);
        }
        else {
            res.json(item);
        }
    });
});
router.get('/retrive_vendor_item/:id',(req, res)=>{
    VendorsItem.find({'_id':req.params.id}, function(err, item){
        if(err){
            console.log(err);
        }
        else {
            res.json(item);
        }
    });
});
router.get('/vendors_retrive_all_disabled_items',(req, res)=>{
    VendorsItem.find({ status: "disabled"}, function(err, items){
        if(err){
            console.log(err);
        }
        else {
            res.json(items);0.2
        }
    });
});
router.get('/vendors_retrive_all_items',(req, res)=>{
    VendorsItem.find({status:"enabled"}, function(err, items){
        if(err){
            console.log(err);
        }
        else {
            res.json(items);
        }
    });
});
router.get('/vendors_one_item',(req, res)=>{
    VendorsItem.find({}, function(err, items){
        if(err){
            console.log(err);
        }
        else {
            res.json(items);
        }
    }) .limit(1)
    
    
});

router.get('/retrive_vendor_item_by_name_grade/:itemname/:grade',(req, res)=>{
    VendorsItem.find({'item_name':req.params.itemname, 'grade_name':req.params.grade}).sort({"item_price":-1}).exec(function(err, item){
        if(err){
            console.log(err);
        }
        else {
            res.json(item);
        }
    });
});

router.get('/retrive_vendor_item_by_name_grade_lower_price/:itemname/:grade',(req, res)=>{
    VendorsItem.find({'item_name':req.params.itemname, 'grade_name':req.params.grade},{'nick_name':1,'userId':1, 'postal_code':1, 'date':1}).sort({"item_price":1}).exec(function(err, item){
        if(err){
            console.log(err);
        }
        else {
            res.json(item);
            console.log(item.nick_name);
        }
    });
});

module.exports = router;