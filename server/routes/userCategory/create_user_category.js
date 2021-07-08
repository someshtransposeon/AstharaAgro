const express = require('express');
const router = express.Router();
const UserCategory = require('../../models/userCategory/user_category');

router.post('/create_user_category', (req, res)=>{
    var newCategory = new UserCategory({
        category_name: req.body.category_name,
    })
    newCategory.save()
    .then(category => {
        res.json(category);
    })
    .catch(err => res.json(err));
});

module.exports = router;