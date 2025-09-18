const express = require('express');
const { body } = require('express-validator');
const { protect, authorize } = require('../middleware/auth');
const { handleValidationErrors } = require('../middleware/validate');
const {
  getCourses,
  getCourse,
  createCourse,
  updateCourse,
  deleteCourse,
  enrollStudent,
  getEnrolledCourses
} = require('../controllers/courseController');

const router = express.Router();

// Public routes
router.get('/', getCourses);

// Protected routes
router.use(protect);

// Student routes (must come before /:id route)
router.get('/enrolled', getEnrolledCourses);
router.post('/:id/enroll', enrollStudent);

// Public route for single course (after protected routes to avoid conflicts)
router.get('/:id', getCourse);

// Teacher and Admin routes
const courseValidation = [
  body('code')
    .trim()
    .isLength({ min: 3, max: 10 })
    .withMessage('Course code must be between 3 and 10 characters'),
  body('title')
    .trim()
    .isLength({ min: 5, max: 100 })
    .withMessage('Course title must be between 5 and 100 characters'),
  body('description')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Description cannot exceed 500 characters'),
  body('credits')
    .isInt({ min: 1, max: 6 })
    .withMessage('Credits must be between 1 and 6'),
  body('department')
    .trim()
    .notEmpty()
    .withMessage('Department is required'),
  body('semester')
    .isIn(['Fall', 'Spring', 'Summer'])
    .withMessage('Semester must be Fall, Spring, or Summer'),
  body('year')
    .isInt({ min: 2020 })
    .withMessage('Year must be at least 2020'),
  body('maxStudents')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Max students must be at least 1'),
  body('schedule.days')
    .optional()
    .isArray()
    .withMessage('Schedule days must be an array'),
  body('schedule.days.*')
    .optional()
    .isIn(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'])
    .withMessage('Invalid day in schedule'),
  body('schedule.startTime')
    .optional()
    .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
    .withMessage('Start time must be in HH:MM format'),
  body('schedule.endTime')
    .optional()
    .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
    .withMessage('End time must be in HH:MM format'),
  body('schedule.room')
    .optional()
    .trim()
    .isLength({ min: 1, max: 20 })
    .withMessage('Room must be between 1 and 20 characters')
];

const updateCourseValidation = [
  body('code')
    .optional()
    .trim()
    .isLength({ min: 3, max: 10 })
    .withMessage('Course code must be between 3 and 10 characters'),
  body('title')
    .optional()
    .trim()
    .isLength({ min: 5, max: 100 })
    .withMessage('Course title must be between 5 and 100 characters'),
  body('description')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Description cannot exceed 500 characters'),
  body('credits')
    .optional()
    .isInt({ min: 1, max: 6 })
    .withMessage('Credits must be between 1 and 6'),
  body('department')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Department is required'),
  body('semester')
    .optional()
    .isIn(['Fall', 'Spring', 'Summer'])
    .withMessage('Semester must be Fall, Spring, or Summer'),
  body('year')
    .optional()
    .isInt({ min: 2020 })
    .withMessage('Year must be at least 2020'),
  body('maxStudents')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Max students must be at least 1')
];

router.post('/', authorize('faculty', 'admin'), courseValidation, handleValidationErrors, createCourse);
router.put('/:id', authorize('faculty', 'admin'), updateCourseValidation, handleValidationErrors, updateCourse);
router.delete('/:id', authorize('faculty', 'admin'), deleteCourse);

module.exports = router;
