const express = require('express');
const router = express.Router();
/* Required Model for store in database*/
const Transportation=require('../../../models/confidential/transportation/transportation')
//Define route to delete the address by Id
router.get('/delete_transportation/:id',(req, res) =>{ 
    Transportation.findOneAndRemove({'_id':req.params.id})
    .then((transportation) => {
        if(transportation){
            var message = { message: "transportation sucessfully deleted" };
            res.json(message);
        }else{
            var message = { message: "transportation not found" };
            res.json(message);
        }
    }).catch(err => {
        console.log(err);
        var message = { message:"Something went wrong!",success: false, err: err };
        res.json(message);
    })
});

module.exports = router;