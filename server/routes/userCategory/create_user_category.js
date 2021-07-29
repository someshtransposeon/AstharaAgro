const express = require('express');
const router = express.Router();
const UserCategory = require('../../models/userCategory/user_category');

router.post('/create_user_category', (req, res)=>{
    var newCategory = new UserCategory({
        category_name: req.body.category_name,
    })
    newCategory.save()
    .then(category => {
        var message={message:"successfully added new User category!",category:category};
        res.json(message);
    })
    .catch(err => {
        var message={message:"Something went wrong!",error:err};
        res.json(message);
    })
});

module.exports = router;