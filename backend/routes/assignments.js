const express = require('express');
const { protect, authorize } = require('../middleware/auth');
const {
  getAssignments,
  createAssignment,
  submitAssignment,
  gradeSubmission
} = require('../controllers/assignmentController');

const router = express.Router();

router.route('/')
  .get(protect, getAssignments)
  .post(protect, authorize('faculty', 'admin'), createAssignment);

router.post('/:id/submit', protect, authorize('student'), submitAssignment);
router.put('/:id/grade/:submissionId', protect, authorize('faculty', 'admin'), gradeSubmission);

module.exports = router;