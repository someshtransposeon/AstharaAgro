const mongoose = require('mongoose');

const customer_poolSchema = new mongoose.Schema({
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

const customer_pool = mongoose.model('customer_pool', customer_poolSchema);
module.exports = customer_pool;