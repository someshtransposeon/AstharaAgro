const mongoose = require('mongoose');
require('@mongoosejs/double');
const purchaseorderSchema = new mongoose.Schema({
    // purchase_order_date:{
    //     type:timestamp,    
    // },
    // purchase_order_time:{
    //     type:timestamp,
    // },
    order_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Order'
    },

    item_description:[{
        itemId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Item',
        },
        quantity:{
            type:Number,
            default:0,
        },
        unit_of_measurement:{
            type:String,
        },
        price:{
            type: mongoose.Schema.Types.Double,
            required:true,
        },
        amount:{
            type:mongoose.Schema.Types.Double,
            require:true,
        },

    }],
    customer_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Customer'
    },
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    vendor_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Vendor'
    },
    indent_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Indent'
    },
    status: {
        type: String,
        default:"pending",
    }
});

const PurchaseOrder = mongoose.model('PurchaseOrder', purchaseorderSchema);
module.exports = PurchaseOrder;
