const mongoose = require('mongoose');
require('@mongoosejs/double');
const inventorySchema = new mongoose.Schema({
    
    inventory_type:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'InventoryCategory',
    },
    // item_description:[{
    //     itemId:{
    //         type: mongoose.Schema.Types.ObjectId,
    //         ref: 'Item',
    //     },
    //     quantity:{
    //         type:Number,
    //         default:0,
    //     },
    //     griding:{
    //         type: String,
    //     },
    //     unit_of_measurement:{
    //         type:String,
    //     },
    //     price:{
    //         type: mongoose.Schema.Types.Double,
    //         required:true,
    //     },
    // }],
    items:{
        type:mongoose.Schema.Types.Mixed,
        ref:'items'
    },
    purchase_order_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PurchaseOrder',
    },
    purchase_order_confirm_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PurchaseOrderConfirm',
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