'use strict';


const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studentSchema = new Schema({
    studentName: {
        type: String,
        required: true
    },
    className: {
        type: String,
        required: true
    },
    rollNumber: {
        type: Number,
        required: true
    },
    schoolId: {
        type: Schema.Types.ObjectId,
        ref: 'School'
    }
},{
    versionKey: false,
    timestamps: true,
});

module.exports = mongoose.model('Student', studentSchema);