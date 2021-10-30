const mongoose = require('mongoose');

const itemGradeSchema = new mongoose.Schema({
    grade_name: {
        type: String,
    },
    status:{
        type:String,
        default:"enabled"
    }
});

const ItemGrade = mongoose.model('ItemGrade', itemGradeSchema);
module.exports = ItemGrade;