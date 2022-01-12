const mongoose = require('mongoose');
require('@mongoosejs/double');
const orderSummarySchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
    },
    orderId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Order',
    },
    custom_orderId:{
        type:String,
    },
    item: {
        type: mongoose.Schema.Types.Mixed,
        required: true,
    },
    status:{
        type:String,
        default:"Full Order",
    },
    vendor_rejected: [],
    date:{
        type:Date,
        default: Date.now,
    },
    }, {
    timestamps: true
});

const OrderSummary = mongoose.model('OrderSummary', orderSummarySchema);
module.exports = OrderSummary;