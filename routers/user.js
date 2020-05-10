'use strict';


const ApplicationController = require('../controllers').applicationController;

const objAppCtrl = new ApplicationController();

const router = require('express').Router();


router.post('/school/create', objAppCtrl.createSchool);
router.get('/school/list', objAppCtrl.listOfSchool);
router.post('/teacher/register', objAppCtrl.register);
router.post('/teacher/login', objAppCtrl.login);

router.all('/secure/*', objAppCtrl.verifyToken);

router.post('/secure/student/create', objAppCtrl.studentCreate);
router.get('/secure/student/list', objAppCtrl.studentList);

module.exports = router;