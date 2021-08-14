const mongoose = require('mongoose');

const itemUnitSchema = new mongoose.Schema({
    unit_name: {
        type: String,
    }
});

const ItemUnit = mongoose.model('ItemUnit', itemUnitSchema);
module.exports = ItemUnit;