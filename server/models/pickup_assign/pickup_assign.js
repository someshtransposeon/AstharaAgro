const mongoose = require('mongoose');
require('@mongoosejs/double');
const pickupAssignSchema = new mongoose.Schema({
    order_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'OrderSummary'
    },
    orderId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Order'
    },
    custom_orderId:{
        type:String,
    },
    purchaseId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Purchase'
    },
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    vendor_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Vendor'
    },
    buyer_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Buyer'
    },
    items:{
        type:mongoose.Schema.Types.Mixed,
    },
    pickup_assign_date:{
        type:Date,
        default: Date.now,
    },
    pikup_assign_date:{
        type:Date,
    },
    status: {
        type: String,
        default:"pending for buyer acceptance",
    },

});

const PickupAssign = mongoose.model('PickupAssign', pickupAssignSchema);
module.exports = PickupAssign;
