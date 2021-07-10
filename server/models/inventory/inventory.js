const mongoose = require('mongoose');
require('@mongoosejs/double');
const inventorySchema = new mongoose.Schema({
    
    // inventory_date:{
    //     type: timestamp,
        
    // },
    // inventory_time:{
    //     type: timestamp,
    // },
    inventory_type:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'InventoryCategory',
    },

    // griding:{
    //     type: String,
    // },// 1=grid1, 2=grid2, 3=grid3, 4=grid4
    // item_id:{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Item',
    // },


    item_description:[{
        itemId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Item',
        },
        quantity:{
            type:Number,
            default:0,
        },
        griding:{
            type: String,
        },
        unit_of_measurement:{
            type:String,
        },
        price:{
            type: mongoose.Schema.Types.Double,
            required:true,
        },
    }],
    purchase_order_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PurchaseOrder',
    },
    emp_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee',
    },
    indent_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Indent',
    },
    vendor_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vendor',
    },
    remark: {
        type: String,
        default:"",
    },
    status: {
        type: String,
        default:"",
    }
});

const Inventory = mongoose.model('Inventory', inventorySchema);
module.exports = Inventory;