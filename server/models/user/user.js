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
});

const User = mongoose.model('User', userSchema);
module.exports = User;