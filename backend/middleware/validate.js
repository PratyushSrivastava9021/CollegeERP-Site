const { validationResult } = require('express-validator');

// Middleware to handle validation errors
exports.handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation error',
      errors: errors.array().map(err => ({
        field: err.param,
        message: err.msg,
        value: err.value
      }))
    });
  }
  next();
};

// Common validation rules
exports.userValidationRules = {
  name: {
    notEmpty: { value: true, message: 'Name is required' },
    isLength: { min: 2, max: 50, message: 'Name must be between 2 and 50 characters' }
  },
  email: {
    isEmail: { message: 'Please provide a valid email' },
    notEmpty: { value: true, message: 'Email is required' }
  },
  password: {
    isLength: { min: 6, message: 'Password must be at least 6 characters' },
    notEmpty: { value: true, message: 'Password is required' }
  },
  role: {
    isIn: { 
      options: [['student', 'faculty', 'admin']], 
      message: 'Role must be student, faculty, or admin' 
    }
  }
};

exports.courseValidationRules = {
  code: {
    notEmpty: { value: true, message: 'Course code is required' },
    isLength: { min: 3, max: 10, message: 'Course code must be between 3 and 10 characters' }
  },
  title: {
    notEmpty: { value: true, message: 'Course title is required' },
    isLength: { min: 5, max: 100, message: 'Course title must be between 5 and 100 characters' }
  },
  credits: {
    isInt: { min: 1, max: 6, message: 'Credits must be between 1 and 6' },
    notEmpty: { value: true, message: 'Credits are required' }
  },
  department: {
    notEmpty: { value: true, message: 'Department is required' }
  },
  semester: {
    isIn: { 
      options: [['Fall', 'Spring', 'Summer']], 
      message: 'Semester must be Fall, Spring, or Summer' 
    }
  },
  year: {
    isInt: { min: 2020, message: 'Year must be at least 2020' },
    notEmpty: { value: true, message: 'Year is required' }
  }
};
