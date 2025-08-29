const express = require('express');
const { body } = require('express-validator');
const { protect, authorize } = require('../middleware/auth');
const { handleValidationErrors } = require('../middleware/validate');
const {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  getProfile,
  updateProfile
} = require('../controllers/userController');

const router = express.Router();

// Protect all routes after this middleware
router.use(protect);

// Validation rules
const updateUserValidation = [
  body('name')
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Name must be between 2 and 50 characters'),
  body('email')
    .optional()
    .isEmail()
    .withMessage('Please provide a valid email')
    .normalizeEmail(),
  body('role')
    .optional()
    .isIn(['student', 'teacher', 'admin'])
    .withMessage('Role must be student, teacher, or admin'),
  body('department')
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Department must be between 2 and 50 characters'),
  body('isActive')
    .optional()
    .isBoolean()
    .withMessage('isActive must be a boolean')
];

const updateProfileValidation = [
  body('name')
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Name must be between 2 and 50 characters'),
  body('department')
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Department must be between 2 and 50 characters')
];

// Routes
router.get('/profile', getProfile);
router.put('/profile', updateProfileValidation, handleValidationErrors, updateProfile);

// Admin only routes
router.get('/', authorize('admin'), getUsers);
router.get('/:id', getUser);
router.put('/:id', authorize('admin'), updateUserValidation, handleValidationErrors, updateUser);
router.delete('/:id', authorize('admin'), deleteUser);

module.exports = router;
