'use strict';


const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const marksSchema = new Schema({
    studentId: {
        type: Schema.Types.ObjectId,
        ref: 'Student'
    },
    totalMarks: {
        type: String,
        required: true
    },
    grade: {
        type: String,
        required: true
    },
    teacherId: {
        type: Schema.Types.ObjectId,
        ref: 'Teacher'
    }
},{
    versionKey: false,
    timestamps: true,
});

module.exports = mongoose.model('Marks', marksSchema);