const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../../../models/user/user');
const Vendor=require('../../../models/user/vendor');
const Customer=require('../../../models/user/customer');
const Sales_person=require('../../../models/user/sales_person');
const Buyer=require('../../../models/user/buyer');
const Manager=require('../../../models/user/manager');
const Accountant=require('../../../models/user/accountant');
const UserCategory = require('../../../models/userCategory/user_category');


router.post('/create_user', async (req, res)=>{
    if(req.body.password==req.body.confirm_password){
        bcrypt.hash(req.body.password, 12, function(err, hash){
            const category=req.body.category;
            const role=req.body.role;
            const full_name= req.body.full_name;
            const nick_name= req.body.nick_name;
            const email= req.body.email;
            const mobile_no= req.body.mobile_no;
            const gst_no= req.body.gst_no;
            const password= hash;
            var newUser = new User({category,role,full_name,nick_name,email,mobile_no,gst_no,password})
            newUser.save()
            .then(user => {
                var message={message:"successfully added!",data:user};
                res.json(message);
                const userId=user._id;
                UserCategory.findById({'_id': req.body.category }, (err, users) => {
                    if (users.category_name=="vendor") {
                        var newVendor = new Vendor({userId,full_name,nick_name,email,mobile_no,gst_no,password})
                        newVendor.save()
                        var message={message:"successfully added vendor",data:user};
                        // res.json(message);
                    }
                    else if(users.category_name=="customer")
                    {
                        var newCustomer = new Customer({userId,full_name,email,nick_name,mobile_no,gst_no,password})
                        newCustomer.save()
                    }
                    else if(users.category_name=="manager")
                    {
                        var newManager = new Manager({userId,full_name,nick_name,email,mobile_no,password})
                        newManager.save()
                    }
                    else if(users.category_name=="sales")
                    {
                        var newSales_person = new Sales_person({userId,full_name,nick_name,email,mobile_no,password})
                        newSales_person.save()
                    }
                    else if(users.category_name=="accountant")
                    {
                        var newAccountant = new Accountant({userId,full_name,nick_name,email,mobile_no,password})
                        newAccountant.save()
                    }
                    else if(users.category_name=="buyer")
                    {
                        var newBuyer = new Buyer({userId,full_name,nick_name,email,mobile_no,password})
                        newBuyer.save()
                    }

                });   
            })
            .catch(err => {
                var message = {message:"All field required!",error:err};
                if( err.code=="11000" && Object.keys(err.keyValue)[0] == "nick_name"){
                   message.message="username already exist!";
                }
                else if(err.code=="11000" && Object.keys(err.keyValue)[0]  == "email"){
                   message.message="email already exist!";
                }
                res.json(message);
            })
                
        });
    }
    else{
        var message = { message:"password and confirm password not equal" };
        res.json(message);
    }
});

module.exports = router;