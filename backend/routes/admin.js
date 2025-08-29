const express = require('express');
const { verifyToken, verifyRole } = require('../middleware/auth');
const ctrl = require('../controllers/adminController');

const router = express.Router();

router.use(verifyToken, verifyRole('admin'));

router.get('/summary', ctrl.getSummary);

// Students
router.get('/students', ctrl.listStudents);
router.post('/students', ctrl.createStudent);
router.put('/students/:id', ctrl.updateStudent);
router.delete('/students/:id', ctrl.deleteStudent);

// Faculty
router.get('/faculty', ctrl.listFaculty);
router.post('/faculty', ctrl.createFaculty);
router.put('/faculty/:id', ctrl.updateFaculty);
router.delete('/faculty/:id', ctrl.deleteFaculty);

// Courses
router.get('/courses', ctrl.listCourses);
router.post('/courses', ctrl.createCourse);
router.put('/courses/:id', ctrl.updateCourse);
router.delete('/courses/:id', ctrl.deleteCourse);

module.exports = router;
