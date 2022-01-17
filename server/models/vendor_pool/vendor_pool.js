const mongoose = require('mongoose');

const vendor_poolSchema = new mongoose.Schema({
    state:{
        type:String,
        required:true,
    },
    region:{
        type:String,
        required:true,
    },
    sub_region:{
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