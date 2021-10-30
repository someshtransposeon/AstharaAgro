const mongoose = require('mongoose');
require('@mongoosejs/double');
const invoiceSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    customerId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    createddBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    purchaseOrder:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Order',
    },
    orderId:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Order',
    },
    vendorId:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    indentId:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Indent',
    },
    items: {
        type: mongoose.Schema.Types.Mixed,
    },
    // item_description:[{
    //     itemId:{
    //         type: mongoose.Schema.Types.ObjectId,
    //         ref: 'Item',
    //     },
    //     // categoryId:{
    //     //     type: mongoose.Schema.Types.ObjectId,
    //     //     reef:'Category'
    //     // },
    //     quantity:{
    //         type:Number,
    //         default:0,
    //     },
    //     unit_of_measurement:{
    //         type:String,
    //     },
    //     price:{
    //         type: mongoose.Schema.Types.Double,
    //         required:true,
    //     },
    // }],
    date_of_issue:{
        type:Date,
        default: Date.now,
    },
    }, {
    timestamps: true
});
const Invoice = mongoose.model('Invoice', invoiceSchema);
module.exports = Invoice;
