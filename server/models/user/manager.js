const mongoose = require('mongoose');

const managerSchema = new mongoose.Schema({
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

const Manager = mongoose.model('Manager', managerSchema);
module.exports = Manager;