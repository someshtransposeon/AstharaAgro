const mongoose = require('mongoose');
require('@mongoosejs/double');
const inventoryTypeSchema = new mongoose.Schema({
    inventory_type:{
        type: String,
        required: true,
        unique: true
    }
});
const InventoryType = mongoose.model('InventoryType', inventoryTypeSchema);
module.exports = InventoryType;