const mongoose = require('mongoose');
require('@mongoosejs/double');
const pickupAssignConfirmSchema = new mongoose.Schema({
    
    requestedBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    order_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Order'
    },
    purchaseId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Purchase'
    },
    indent_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Indent'
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
    pickupAssignId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'PickupAssign'
    },
    items:{
        type:mongoose.Schema.Types.Mixed,
    },
    pickup_assign_confirm_date:{
        type:Date,
        default: Date.now,
    },
    pickup_assign_confirm_date:{
        type:Date,
    },
    status: {
        type: String,
        default:"pending for vendor acceptance",
    },

});

const PickupAssignConfirm = mongoose.model('PickupAssignConfirm', pickupAssignConfirmSchema);
module.exports = PickupAssignConfirm;
