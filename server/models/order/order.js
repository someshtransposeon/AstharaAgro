const mongoose = require('mongoose');
require('@mongoosejs/double');
const orderSchema = new mongoose.Schema({
    // customer_id:{
    //     type:mongoose.Schema.Types.ObjectId,
    //     ref:'Customer'
    // }, 
    // user_id:{
    //     type:mongoose.Schema.Types.ObjectId,
    //     ref:'User'
    // },
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
    },
    items: {
        type: mongoose.Schema.Types.Mixed,
    },
    status:{
        type:String,
        default:"Pending",
    }
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;