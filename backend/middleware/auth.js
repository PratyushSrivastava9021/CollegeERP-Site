const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Protect routes
exports.protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Not authorized to access this route'
    });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Get user from token
    req.user = await User.findById(decoded.id);
    
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'User no longer exists'
      });
    }

    if (!req.user.isActive) {
      return res.status(401).json({
        success: false,
        message: 'User account is deactivated'
      });
    }

    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: 'Not authorized to access this route'
    });
  }
};

// Grant access to specific roles
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `User role '${req.user.role}' is not authorized to access this route`
      });
    }
    next();
  };
};

// Aliases to match requested naming
exports.verifyToken = exports.protect;
exports.verifyRole = (...roles) => exports.authorize(...roles);

// Check if user is the owner or admin
exports.checkOwnership = (modelName) => {
  return async (req, res, next) => {
    try {
      const Model = require(`../models/${modelName}`);
      const resource = await Model.findById(req.params.id);

      if (!resource) {
        return res.status(404).json({
          success: false,
          message: 'Resource not found'
        });
      }

      // Admin can access everything
      if (req.user.role === 'admin') {
        req.resource = resource;
        return next();
      }

      // Check ownership
      if (resource.user && resource.user.toString() === req.user.id) {
        req.resource = resource;
        return next();
      }

      // For courses, check if user is instructor
      if (modelName === 'Course' && resource.instructor.toString() === req.user.id) {
        req.resource = resource;
        return next();
      }

      return res.status(403).json({
        success: false,
        message: 'Not authorized to access this resource'
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Error checking resource ownership'
      });
    }
  };
};
