'use strict';


const ApplicationModel = require('../models').applicationModel,
      schoolJson = require('../schools.json'),
      Jwt = require('../services').jwt;

class ApplicationController {
    constructor() {}

    async createSchool(req, res, next) {
        try {
            const data = await ApplicationModel.createSchool(schoolJson);
            res.status(200).send(data)
        }
        catch(err) {
            res.status(500).send("Error occured");
        }
    }

    async listOfSchool(req, res, next) {
        try {
            const data = await ApplicationModel.listSchool();
            res.status(200).send(data);
        }
        catch(err) {
            res.status(500).send("Error occured");
        }
    }

    async register(req, res, next) {
        
        try {
            await ApplicationModel.createTeacher(req.body);
            res.status(200).send("Registration completed successfully");
        }
        catch(err) {
            res.status(409).send("Username already exists");
        }
    }

    login(req, res, next) {
        const { username, password } = req.body;
        let teacherData;
        ApplicationModel
            .findTeacher(username)
            .then(teacher => {
                teacherData = JSON.parse(JSON.stringify(teacher));
                return Promise.resolve(teacherData)
            })
            .then(teacher => {
                
                return ApplicationModel.validatePassword(password, teacher[0].password)
            })
            .then(async () => {
                delete teacherData[0].password;
                teacherData[0].accessToken = await Jwt.getToken({teacherId: teacherData[0]._id, username: teacherData[0].username });
                res.status(200).send(teacherData);
            })
            .catch(err => {
                res.status(404).send("Username or password invalid")
            })
    }

    async verifyToken(req, res, next) {
        
        try {
            const teacherInfo = await Jwt.verifyToken(req.headers['authorization']);
            req.teacherInfo = teacherInfo.data;
            next();
        }
        catch(err) {
            console.log("Authentication failed")
            res.status(401).send("Unauthorized access")
        }
    }

    async studentCreate(req, res, next) {
        try {
            const { studentName, className, rollNumber, schoolId, totalMarks } = req.body;
            const studentConfig = {
                studentName,
                className,
                rollNumber,
                schoolId
            }

            const studentData = await ApplicationModel.createStudent(studentConfig)

            const marksConfig = {
                studentId: studentData._id,
                totalMarks,
                grade: totalMarks >= 50 ? 'Pass': 'Fail',
                teacherId: req.teacherInfo.teacherId
            }

            await ApplicationModel.createMarks(marksConfig);
            res.status(200).send("Inserted successfully");
        }
        catch(err) {
            res.status(500).send("Something not right. Please try agian");
        }
    }

    async studentList(req, res, next) {
        const data = await ApplicationModel.getAllStudent();
        const studentArr = [];
        
        for(let dt = await data.next(); dt !== null; dt = await data.next()) {
            studentArr.push({
                studentName: dt.studentId.studentName,
                className: dt.studentId.className,
                rollNumber: dt.studentId.rollNumber,
                schoolName: dt.studentId.schoolId.schoolName,
                address: dt.studentId.schoolId.address,
                phoneNumber: dt.studentId.schoolId.phoneNumber,
                teacherName: dt.teacherId.teacherName,
                totalMarks: dt.totalMarks,
                grade: dt.grade
            })
        }

        res.status(200).send(studentArr);
    }
}

module.exports = ApplicationController;