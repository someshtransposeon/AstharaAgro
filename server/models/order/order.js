const mongoose = require('mongoose');
const orderSchema = new mongoose.Schema({
    customer_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Customer'
    }, 
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    item_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Item'
    },
    inventory_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Inventory'
    },
    address_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Address'
    },
    status: {
        type: String,
        default:"pending",
    }
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
