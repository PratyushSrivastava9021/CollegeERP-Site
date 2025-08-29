const express = require('express');
const { verifyToken, verifyRole } = require('../middleware/auth');
const ctrl = require('../controllers/gradeController');

const router = express.Router();

router.use(verifyToken);

// Faculty/Admin upsert grade
router.post('/', verifyRole('faculty', 'admin'), ctrl.upsertGrade);
router.put('/', verifyRole('faculty', 'admin'), ctrl.upsertGrade);

// Student get own grades (or admin/faculty by specific id)
router.get('/student/:id', ctrl.getStudentGrades);

module.exports = router;
