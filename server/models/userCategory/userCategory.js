const mongoose = require('mongoose');

const userCategorySchema = new mongoose.Schema({
    category_name: {
        type: String,
    }
});

const UserCategory = mongoose.model('UserCategory', userCategorySchema);
module.exports = UserCategory;