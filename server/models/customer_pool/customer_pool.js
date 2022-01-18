const mongoose = require('mongoose');

const customer_poolSchema = new mongoose.Schema({
    pool_name:{
        type:String,
        required:true,
    },
    postal_code: {
        type: mongoose.Schema.Types.Mixed,
        required: true,
    },
    flag_value:{
        type:Number,
        default:0,
    }
    }, 
    {
    timestamps: true
});

const customer_pool = mongoose.model('Customer_pool', customer_poolSchema);
module.exports = customer_pool;