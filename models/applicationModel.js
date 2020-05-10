'use strict';

const TeacherDb = require('../db/mongo/schemas').teacherDb,
      SchoolDb = require('../db/mongo/schemas').schoolDb,
      StudentDb = require('../db/mongo/schemas').studentDb,
      MarksDb = require('../db/mongo/schemas').marksDb,
      bcrypt = require('bcryptjs') 

class ApplicationModel {
    constructor() {}

    createSchool(config) {
        return new Promise((resolve, reject) => {
            SchoolDb
                .insertMany(config)
                .then(() => resolve("success"))
                .catch(err => reject(err));
        })
    }

    listSchool() {
        return new Promise((resolve, reject) => {
            SchoolDb.find({}).exec((err, data) => err ? reject(err) : resolve(data));
        })
    }

    createTeacher(config) {
        return new Promise(async (resolve, reject) => {
            const salt = await bcrypt.genSalt(8);
            config.password = bcrypt.hashSync(config.password, salt);
            const objTeacher = new TeacherDb(config);

            objTeacher.save((err, teacherData) =>
                err ? reject(err) : resolve(teacherData)
            );
        })
    }

    findTeacher(username) {
        return new Promise((resolve, reject) => {
            
            TeacherDb
            .find({username})
            .populate('schoolId')
            .exec((err, data) => err ? reject(err) : (data.length > 0 ? resolve(data) : reject(err)));
            
        })
    }

    createStudent(config) {
        return new Promise((resolve, reject) => {
            const objStudent = new StudentDb(config);

            objStudent.save((err, studentData) =>
                err ? reject(err) : resolve(studentData)
            );
        })
    }

    createMarks(config) {
        return new Promise((resolve, reject) => {
            const objMarks = new MarksDb(config);

            objMarks.save((err, marksData) =>
                err ? reject(err) : resolve(marksData)
            );
        })
    }
    validatePassword(password, hash) {
        return new Promise((resolve, reject) => {
            if(bcrypt.compareSync(password, hash)) {
                resolve("Found");
            } else {
                reject("Not Found")
            }
        })
    }

    async getAllStudent() {
        return await MarksDb
            .find({})
            .populate({
                path: 'studentId',
                populate: {
                    path: 'schoolId'
                }
            })
            .populate('teacherId')
            .cursor();
    }
}

module.exports = new ApplicationModel();