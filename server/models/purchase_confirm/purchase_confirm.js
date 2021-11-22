const mongoose = require('mongoose');
require('@mongoosejs/double');
const purchaseorderConfirmSchema = new mongoose.Schema({
    
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
    items:{
        type:mongoose.Schema.Types.Mixed,
    },
    purchase_order_created_date:{
        type:Date,
        default: Date.now,
    },
    purchase_order_approval_date:{
        type:Date,
    },
    status: {
        type: String,
        default:"pending for manager acceptance",
    },

});

const PurchaseOrderConfirm = mongoose.model('PurchaseOrderConfirm', purchaseorderConfirmSchema);
module.exports = PurchaseOrderConfirm;
