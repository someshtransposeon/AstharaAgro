const mongoose = require('mongoose');
const Double = require('@mongoosejs/double/lib');

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
        unique: true,
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
    item_price: {
        type: Double,
    },
    item_negotiate_price: {
        type: Double,
    },
    status:{
        type:String,
        default:"enabled"
    },
    image:{
        type:String,
    }
});

const Item = mongoose.model('Item', itemSchema);
module.exports = Item;