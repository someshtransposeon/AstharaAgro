const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ItemCategory',
    },
    grade: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ItemGrade',
    },
    unit: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ItemUnit',
    },
    added_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    item_name: {
        type: String,
        required: true,
    },
    category_name: {
        type: String,
        required: true,
    },
    grade_name: { 
        type: String,
        required: true,
    },
    unit_name:{
        type:String,
    },
    description: {
        type: String,
        default:"",
    },
});

const Item = mongoose.model('Item', itemSchema);
module.exports = Item;