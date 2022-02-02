const mongoose = require('mongoose');
require('@mongoosejs/double');
const trannsportSchema = new mongoose.Schema({
    buyerId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
    },
    vehicle_number:{
        type:String,
        required:true,
    },
    driver_name:{
        type:String,
        required:true,
    },
    driver_mobile_no: {
        type: String,
        required: true,
    },
    labour_name:{
        type:String,
        required:true,
    },
    labour_mobile_no: {
        type: String,
        required: true,
    },
    orders_items: {
        type: mongoose.Schema.Types.Mixed,
        required: true,
    },
    status:{
        type:Number,
        default:0,
    },
    }, {
    timestamps: true
});
const Transport = mongoose.model('transport', trannsportSchema);
module.exports = Transport;