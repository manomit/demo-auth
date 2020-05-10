'use strict';


const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schoolSchema = new Schema({
    schoolName: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    }
},{
    versionKey: false,
    timestamps: true,
});

module.exports = mongoose.model('School', schoolSchema);