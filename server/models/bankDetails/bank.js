const mongoose = require('mongoose');

const bankSchema = new mongoose.Schema({
    bank_name: { 
        type: String,
        required: true,
    },
    branch_name: {
        type: String,
        required: true,
    },
    account_number: {
        type: Number,
        required: true,
    },
    account_holder_name: {
        type: String,
        required: true,
    },
    ifsc_code: { 
        type: String,
        required: true,
    },
});

const Bank = mongoose.model('Bank', bankSchema);
module.exports = Bank;