const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ItemCategory',
    },
    added_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    item_name: {
        type: String,
        required: true,
    },
    grade: { 
        type: String,
        required: true,
    },
    unit:{
        type:String,
    },
    description: {
        type: String,
        default:"",
    },
    price: {
        type: Number,
        default: null,
    },
    remark: {
        type: String,
        default:"",
    },
    status: {
        type: String,
        default:"",
    }
});

const Item = mongoose.model('Item', itemSchema);
module.exports = Item;