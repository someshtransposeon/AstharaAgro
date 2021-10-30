const mongoose = require('mongoose');

const transportationSchema = new mongoose.Schema({
       
    transportation_charges: {
        type: String,
        required: true,
    },
    handling_charges: {
        type: String,
        required: true,
    },
    requestedBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    purchaseId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Purchase'
    },
    purchaseConfirmId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'PurchaseConfirm'
    },
    items:{
        type:mongoose.Schema.Types.Mixed,
    },
    orderId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
    },
    vendor_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vendor',
    },
    indent_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Indent',
    },
    status:{
        type:String,
        default:"",
    },
    remark:{
        type:String,
        default:"",
    },
});

const Transportation = mongoose.model('Transportation', transportationSchema);
module.exports = Transportation;