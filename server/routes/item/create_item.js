const express = require('express');
const router = express.Router();
const upload = require("../../middleware/uploader");
/* Required Model for store in database*/
const Item = require('../../models/item/item');
//Define Route to create the item
router.post('/create_item', (req, res)=>{
    var newItem = new Item({
        category: req.body.category,
        grade: req.body.grade,
        unit: req.body.unit,
        added_by: req.body.added_by,
        item_name: req.body.item_name,
        category_name: req.body.category_name,
        grade_name: req.body.grade_name,
        description: req.body.description,
        unit_name:req.body.unit_name,
        image: req.body.image,
    })
    newItem.save()
    .then(item => {
        var message={message:"sucessfully added!",item:item};
        res.json(message);
    })
    .catch(err =>{
        var message={message:"something went wrong!",error:err};
        res.json(message);
    }) 
});

router.post("/uploadfile", upload.single("file"), async (req, res) => {
    if (req.file === undefined) {
        return res.send("you must select a file.");
    }
    const imgUrl = `http://localhost:5000/file/${req.file.filename}`;
    return res.json({"img":imgUrl});
});

module.exports = router;