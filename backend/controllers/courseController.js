const Course = require('../models/Course');
const User = require('../models/User');

// @desc    Get all courses
// @route   GET /api/courses
// @access  Public
exports.getCourses = async (req, res) => {
  try {
    const { page = 1, limit = 10, department, semester, year, instructor, search } = req.query;

    // Build filter object
    const filter = { isActive: true };
    if (department) filter.department = department;
    if (semester) filter.semester = semester;
    if (year) filter.year = parseInt(year);
    if (instructor) filter.instructor = instructor;
    if (search) {
      filter.$or = [
        { code: { $regex: search, $options: 'i' } },
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    const courses = await Course.find(filter)
      .populate('instructor', 'name email department')
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

    const total = await Course.countDocuments(filter);

    res.status(200).json({
      success: true,
      data: {
        courses,
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(total / limit),
          totalCourses: total,
          coursesPerPage: parseInt(limit)
        }
      }
    });
  } catch (error) {
    console.error('Get courses error:', error);
    res.status(500).json({
      success: false,
      message: 'Error getting courses'
    });
  }
};

// @desc    Get single course
// @route   GET /api/courses/:id
// @access  Public
exports.getCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id)
      .populate('instructor', 'name email department')
      .populate('enrolledStudents.student', 'name email studentId department');

    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }

    res.status(200).json({
      success: true,
      data: { course }
    });
  } catch (error) {
    console.error('Get course error:', error);
    res.status(500).json({
      success: false,
      message: 'Error getting course'
    });
  }
};

// @desc    Create new course
// @route   POST /api/courses
// @access  Private/Admin/Teacher
exports.createCourse = async (req, res) => {
  try {
    const { code, title, description, credits, department, semester, year, maxStudents, schedule } = req.body;

    // Check if course code already exists
    const existingCourse = await Course.findOne({ code });
    if (existingCourse) {
      return res.status(400).json({
        success: false,
        message: 'Course code already exists'
      });
    }

    // Set instructor as current user (if teacher) or from request body (if admin)
    const instructorId = req.user.role === 'admin' ? req.body.instructor : req.user.id;

    const course = await Course.create({
      code,
      title,
      description,
      credits,
      department,
      instructor: instructorId,
      semester,
      year,
      maxStudents,
      schedule
    });

    const populatedCourse = await Course.findById(course._id)
      .populate('instructor', 'name email department');

    res.status(201).json({
      success: true,
      message: 'Course created successfully',
      data: { course: populatedCourse }
    });
  } catch (error) {
    console.error('Create course error:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating course'
    });
  }
};

// @desc    Update course
// @route   PUT /api/courses/:id
// @access  Private/Admin/Teacher
exports.updateCourse = async (req, res) => {
  try {
    const { code, title, description, credits, department, semester, year, maxStudents, schedule } = req.body;

    // Check if course code is being updated and if it already exists
    if (code) {
      const existingCourse = await Course.findOne({ 
        code, 
        _id: { $ne: req.params.id } 
      });
      if (existingCourse) {
        return res.status(400).json({
          success: false,
          message: 'Course code already exists'
        });
      }
    }

    const course = await Course.findByIdAndUpdate(
      req.params.id,
      { code, title, description, credits, department, semester, year, maxStudents, schedule },
      { new: true, runValidators: true }
    ).populate('instructor', 'name email department');

    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Course updated successfully',
      data: { course }
    });
  } catch (error) {
    console.error('Update course error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating course'
    });
  }
};

// @desc    Delete course
// @route   DELETE /api/courses/:id
// @access  Private/Admin/Teacher
exports.deleteCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }

    // Soft delete - just deactivate the course
    course.isActive = false;
    await course.save();

    res.status(200).json({
      success: true,
      message: 'Course deactivated successfully'
    });
  } catch (error) {
    console.error('Delete course error:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting course'
    });
  }
};

// @desc    Enroll student in course
// @route   POST /api/courses/:id/enroll
// @access  Private
exports.enrollStudent = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    
    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }

    // Check if course is active
    if (!course.isActive) {
      return res.status(400).json({
        success: false,
        message: 'Course is not active'
      });
    }

    // Check if student is already enrolled
    const alreadyEnrolled = course.enrolledStudents.find(
      enrollment => enrollment.student.toString() === req.user.id
    );

    if (alreadyEnrolled) {
      return res.status(400).json({
        success: false,
        message: 'Student is already enrolled in this course'
      });
    }

    // Check if course is full
    if (course.enrolledStudents.length >= course.maxStudents) {
      return res.status(400).json({
        success: false,
        message: 'Course is full'
      });
    }

    // Enroll student
    course.enrolledStudents.push({
      student: req.user.id,
      enrolledAt: new Date()
    });

    await course.save();

    res.status(200).json({
      success: true,
      message: 'Successfully enrolled in course'
    });
  } catch (error) {
    console.error('Enroll student error:', error);
    res.status(500).json({
      success: false,
      message: 'Error enrolling student'
    });
  }
};

// @desc    Get enrolled courses for current user
// @route   GET /api/courses/enrolled
// @access  Private
exports.getEnrolledCourses = async (req, res) => {
  try {
    const courses = await Course.find({
      'enrolledStudents.student': req.user.id,
      isActive: true
    }).populate('instructor', 'name email department');

    res.status(200).json({
      success: true,
      data: { courses }
    });
  } catch (error) {
    console.error('Get enrolled courses error:', error);
    res.status(500).json({
      success: false,
      message: 'Error getting enrolled courses'
    });
  }
};
