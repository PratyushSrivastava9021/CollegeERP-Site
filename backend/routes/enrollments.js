const express = require('express');
const { verifyToken, verifyRole } = require('../middleware/auth');
const ctrl = require('../controllers/enrollmentController');

const router = express.Router();

// All enrollment routes require auth
router.use(verifyToken);

// Enroll a student (student can enroll self, admin/faculty can enroll any)
router.post('/', ctrl.createEnrollment);

// View enrollments by student
router.get('/student/:id', ctrl.getByStudent);

// View enrollments by course
router.get('/course/:id', verifyRole('faculty', 'admin'), ctrl.getByCourse);

module.exports = router;
