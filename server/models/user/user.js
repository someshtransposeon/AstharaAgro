const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'userCategory',
    },
    full_name: {
        type: String,
        required: true,
    },
    email: { 
        type: String,
        required: true,
    },
    mobile_no: {
        type: Number,
        required: true,
    },
    address: {
        type: Object,
        default: {},
    },
    gst_no: {
        type: String,
        default:"",
    },
    bank_details: {
        type: Object,
        default: {},
    }
});

const User = mongoose.model('User', userSchema);
module.exports = User;