const mongoose = require('mongoose');

const vendor_poolSchema = new mongoose.Schema({
    pool_name:{
        type:String,
        required:true,
    },
    postal_code: {
        type: mongoose.Schema.Types.Mixed,
        required: true,
    }
    }, {
    timestamps: true
});

const Vendor_pool = mongoose.model('Vendor_pool', vendor_poolSchema);
module.exports = Vendor_pool;