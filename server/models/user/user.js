const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'userCategory',
    },
    role: {
        type: String,
        required: true,
    },
    full_name: {
        type: String,
        required: true,
    },
    nick_name: {
        type: String,
        required: true,
        unique: true,
    },
    email: { 
        type: String,
        required: true,
        unique: true,
    },
    mobile_no: {
        type: Number,
    },
    gst_no: {
        type: String,
        default:"",
    },
    password: {
        type: String,
    },
    status:{
        type:String,
        default:"enabled"
    },
    remark:{
        type:String,
        default:""
    },
});

const User = mongoose.model('User', userSchema);
module.exports = User;