const mongoose = require('mongoose');

const itemGradeSchema = new mongoose.Schema({
    grade_name: {
        type: String,
    }
});

const ItemGrade = mongoose.model('ItemGrade', itemGradeSchema);
module.exports = ItemGrade;