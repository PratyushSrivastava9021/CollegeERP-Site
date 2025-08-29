const express = require('express');
const { verifyToken, verifyRole } = require('../middleware/auth');
const ctrl = require('../controllers/attendanceController');

const router = express.Router();

router.use(verifyToken);

// Faculty/Admin mark attendance
router.post('/', verifyRole('faculty', 'admin'), ctrl.markAttendance);

// Student view own attendance (or admin/faculty can view any via id param)
router.get('/student/:id', ctrl.getStudentAttendance);

module.exports = router;
