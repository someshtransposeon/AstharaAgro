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
    image: {
        type: String
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
    nick_name: {
        type: String
    },
    address: {
        type: String,
        required: true,
    },
    landmark: {
        type: String,
        default: "",
    },
    district: { 
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    country: {
        type: Object,
        required: true,
    },
    postal_code: {
        type: Number,
        required: true,
    },
    status:{
        type:String,
        default:"enabled"
    },
    date: {
        type: Date,
        default: Date.now,
    }
    }, {
    timestamps: true
});
const vendorsItem = mongoose.model('vendorsItem', vendorsItemSchema);
module.exports = vendorsItem;