const express = require('express');
const { protect, authorize } = require('../middleware/auth');
const {
  getTimetable,
  createTimetableEntry,
  updateTimetableEntry,
  deleteTimetableEntry
} = require('../controllers/timetableController');

const router = express.Router();

router.route('/')
  .get(protect, getTimetable)
  .post(protect, authorize('faculty', 'admin'), createTimetableEntry);

router.route('/:id')
  .put(protect, authorize('faculty', 'admin'), updateTimetableEntry)
  .delete(protect, authorize('faculty', 'admin'), deleteTimetableEntry);

module.exports = router;