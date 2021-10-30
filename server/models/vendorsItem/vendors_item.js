const Double = require('@mongoosejs/double/lib');
const mongoose = require('mongoose');

const vendorsItemSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required: true,
    },
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
    full_name: {
        type: String,
        required: true,
        // required: true,
        // type: mongoose.Schema.Types.ObjectId,
        // ref: 'User',
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
    item_quantity:{
        type:String,
    },
    description: {
        type: String,
        default:"",
    },
    item_price: {
        type: Double,
    },
    status:{
        type:String,
        default:"enabled"
    }
});

const vendorsItem = mongoose.model('vendorsItem', vendorsItemSchema);
module.exports = vendorsItem;