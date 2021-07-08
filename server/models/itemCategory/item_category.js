const mongoose = require('mongoose');

const itemCategorySchema = new mongoose.Schema({
    category_name: {
        type: String,
    }
});

const ItemCategory = mongoose.model('ItemCategory', itemCategorySchema);
module.exports = ItemCategory;