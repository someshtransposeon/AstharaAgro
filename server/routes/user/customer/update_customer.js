const express = require('express');
const router = express.Router();
const Customer = require('../../../models/user/customer');

router.put('/update_customer/:id',(req, res) =>{
    var status = {
        full_name: req.body.full_name,
        email: req.body.email,
        mobile_no: req.body.mobile_no,
        gst_no: req.body.gst_no,
    }
   Customer.findOneAndUpdate({'_id':req.params.id}, status)
    .then((status) => {
        if(status){
            var message = { message: "customer details updates uccessfully" };
            res.json(message);
        }else{
            var message = { message: "customer not found" };
            res.json(message);
        }
    }).catch(err => {
        console.log(err);
        var message = { message:"somthing went wrong!",success: false, err: err };
        res.json(message);
    })
});

// router.put('/update_customer_status/:id',(req, res) =>{
//     var status = {
//         status: req.body.status,
//     }
//    Customer.findOneAndUpdate({'_id':req.params.id}, status)
//     .then((status) => {
//         if(status){
//             var message = { message: "customer status updated successfully " };
//             res.json(message);
//         }else{
//             var message = { message: "customer not found" };
//             res.json(message);
//         }
//     }).catch(err => {
//         console.log(err);
//         var message = { message:"somthing went wrong!",success: false, err: err };
//         res.json(message);
//     })
// });
// router.put('/enable_customer/:id',(req, res) =>{
//     var status = {
//         status: req.body.status,
//     }
//    Customer.findOneAndUpdate({'_id':req.params.id}, status)
//     .then((status) => {
//         if(status){
//             var message = { message: "customer enabled successfully " };
//             res.json(message);
//         }else{
//             var message = { message: "customer not found" };
//             res.json(message);
//         }
//     }).catch(err => {
//         console.log(err);
//         var message = { message:"somthing went wrong!",success: false, err: err };
//         res.json(message);
//     })
// });


// router.put('/update_customer_remark/:id',(req, res) =>{
//     var remark = {
//         remark: req.body.remark,
//     }
//    Customer.findOneAndUpdate({'_id':req.params.id}, remark)
//     .then((remark) => {
//         if(remark){
//             var message = { message: "customer account delete request rejected " };
//             res.json(message);
//         }else{
//             var message = { message: "customer not found" };
//             res.json(message);
//         }
//     }).catch(err => {
//         console.log(err);
//         var message = { message:"somthing went wrong!",success: false, err: err };
//         res.json(message);
//     })
// });

// router.put('/send_delete_account_remark/:id',(req, res) =>{
//     var customer_remark = {
//         remark: req.body.remark,
//     }
//    Customer.findOneAndUpdate({'_id':req.params.id}, customer_remark)
//     .then((customer) => {
//         if(customer){
//             var message = { message: "customer account delete request update...d " };
//             res.json(message);
//         }else{
//             var message = { message: "customer zzzz not found" };
//             res.json(message);
//         }
//     }).catch(err => {
//         console.log(err);
//         var message = { message:"somthing went wrong!",success: false, err: err };
//         res.json(message);
//     })
// });
module.exports = router;