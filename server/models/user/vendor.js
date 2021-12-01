const mongoose = require('mongoose');

const vendorSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
    },
    full_name: {
        type: String,
        required: true,
    },
    nick_name: {
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
    gst_no: {
        type: String,
        default:"",
    },
    password: {
        type: String,
        required: true,
    },
    status:{
        type:String,
        default:"enabled",
    }
});

const Vendor = mongoose.model('Vendor', vendorSchema);
module.exports = Vendor;