const mongoose = require('mongoose');
require('@mongoosejs/double');
const indentSchema = new mongoose.Schema({
    // userId:{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'User',
    // },
    // customerId:{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Customer',
    // },
    requestedBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    item_description:[{
        itemId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Item',
        },
        // categoryId:{
        //     type: mongoose.Schema.Types.ObjectId,
        //     reef:'Category'
        // },
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
    }],
    indent_created_date:{
        type:Date,
        default: Date.now,
    },
    indent_approval_date:{
        type:Date,
    },
    status:{
        type:String,
        default:0,
    },
    remark:{
        type:String,
        default:"",
    },
    }, {
    timestamps: true
});
const Indent = mongoose.model('indents', indentSchema);
module.exports = Indent;
