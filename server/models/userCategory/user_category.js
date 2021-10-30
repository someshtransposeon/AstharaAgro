const mongoose = require('mongoose');

const userCategorySchema = new mongoose.Schema({
    category_name: {
        type: String,
    },
      status:{
        type:String,
        default:"enabled"
    }
});

const UserCategory = mongoose.model('UserCategory', userCategorySchema);
module.exports = UserCategory;