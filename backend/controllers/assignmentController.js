const Assignment = require('../models/Assignment');
const Course = require('../models/Course');

// @desc    Get all assignments
// @route   GET /api/assignments
// @access  Private
exports.getAssignments = async (req, res) => {
  try {
    let query = Assignment.find().populate('course', 'title code').populate('instructor', 'name email');
    
    // Filter by course if provided
    if (req.query.course) {
      query = query.where('course').equals(req.query.course);
    }
    
    // Filter by instructor for faculty
    if (req.user.role === 'faculty') {
      query = query.where('instructor').equals(req.user.id);
    }
    
    const assignments = await query.sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: assignments.length,
      data: assignments
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching assignments'
    });
  }
};

// @desc    Create assignment
// @route   POST /api/assignments
// @access  Private (Faculty/Admin)
exports.createAssignment = async (req, res) => {
  try {
    req.body.instructor = req.user.id;
    
    // Verify course exists and user is instructor
    const course = await Course.findById(req.body.course);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }
    
    if (req.user.role === 'faculty' && course.instructor.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to create assignment for this course'
      });
    }
    
    const assignment = await Assignment.create(req.body);
    await assignment.populate('course', 'title code');
    
    res.status(201).json({
      success: true,
      data: assignment
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating assignment'
    });
  }
};

// @desc    Submit assignment
// @route   POST /api/assignments/:id/submit
// @access  Private (Student)
exports.submitAssignment = async (req, res) => {
  try {
    const assignment = await Assignment.findById(req.params.id);
    
    if (!assignment) {
      return res.status(404).json({
        success: false,
        message: 'Assignment not found'
      });
    }
    
    // Check if already submitted
    const existingSubmission = assignment.submissions.find(
      sub => sub.student.toString() === req.user.id
    );
    
    if (existingSubmission) {
      return res.status(400).json({
        success: false,
        message: 'Assignment already submitted'
      });
    }
    
    assignment.submissions.push({
      student: req.user.id,
      content: req.body.content,
      attachments: req.body.attachments || []
    });
    
    await assignment.save();
    
    res.status(200).json({
      success: true,
      message: 'Assignment submitted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error submitting assignment'
    });
  }
};

// @desc    Grade assignment submission
// @route   PUT /api/assignments/:id/grade/:submissionId
// @access  Private (Faculty/Admin)
exports.gradeSubmission = async (req, res) => {
  try {
    const assignment = await Assignment.findById(req.params.id);
    
    if (!assignment) {
      return res.status(404).json({
        success: false,
        message: 'Assignment not found'
      });
    }
    
    const submission = assignment.submissions.id(req.params.submissionId);
    
    if (!submission) {
      return res.status(404).json({
        success: false,
        message: 'Submission not found'
      });
    }
    
    submission.marks = req.body.marks;
    submission.feedback = req.body.feedback;
    submission.gradedAt = new Date();
    submission.gradedBy = req.user.id;
    
    await assignment.save();
    
    res.status(200).json({
      success: true,
      message: 'Submission graded successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error grading submission'
    });
  }
};

module.exports = exports;