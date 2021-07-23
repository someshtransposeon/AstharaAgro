const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
    },
    full_name: {
        type: String,
        required: true,
    },
    email: { 
        type: String,
        required: true,
         unique: true,
    },
    mobile_no: {
        type: Number,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
});

const Customer = mongoose.model('Customer', customerSchema);
module.exports = Customer;