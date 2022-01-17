const mongoose = require('mongoose');

const customeraddressSchema = new mongoose.Schema({
    customer_pool_Id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Customer_pool',
        required: true,
    },
    customer_pool_name: {
        type: String,
        required: true,
    },
    vendor_pool_Id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Vendor_pool',
        required: true,
    },
    vendor_pool_name: {
        type: String,
        required: true,
    }
    }, {
    timestamps: true
});

const Customer_Address = mongoose.model('Customer_Address', customeraddressSchema);
module.exports = Customer_Address;