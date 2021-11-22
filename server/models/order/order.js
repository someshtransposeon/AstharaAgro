const mongoose = require('mongoose');
require('@mongoosejs/double');
const orderSchema = new mongoose.Schema({
    // requestedBy:{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'User',
    // },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
    },
    customerId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Customer',
    },
    name:{
        type:String,
    },
    email: {
        type: String,
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
    mobile_no: {
        type: String,
        required: true,
    },
    items: {
        type: mongoose.Schema.Types.Mixed,
        required: true,
    },
    status:{
        type:String,
        default:"pending",
    },
    completion_status:{
        type:String,
        default:"new",
    }
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;