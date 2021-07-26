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
    address:{
        type:String,
    },
    mobile_no: {
        type: String,
    },
    items: {
        type: mongoose.Schema.Types.Mixed,
    },
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
