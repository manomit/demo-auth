'use strict';


const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const teacherSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    teacherName: {
        type: String,
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

module.exports = mongoose.model('Teacher', teacherSchema)