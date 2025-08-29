const Enrollment = require('../models/Enrollment');
const Course = require('../models/Course');

exports.createEnrollment = async (req, res) => {
  try {
    const { studentId, courseId } = req.body;

    if (!studentId || !courseId) {
      return res.status(400).json({ success: false, message: 'studentId and courseId are required' });
    }

    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ success: false, message: 'Course not found' });

    const facultyId = course.instructor;

    const enrollment = await Enrollment.create({ studentId, courseId, facultyId });
    res.status(201).json({ success: true, data: enrollment });
  } catch (e) {
    if (e.code === 11000) {
      return res.status(400).json({ success: false, message: 'Student already enrolled in this course' });
    }
    res.status(500).json({ success: false, message: 'Failed to create enrollment' });
  }
};

exports.getByStudent = async (req, res) => {
  try {
    const items = await Enrollment.find({ studentId: req.params.id })
      .populate('courseId', 'title code credits department semester year')
      .populate('facultyId', 'name email');
    res.json({ success: true, data: items });
  } catch (e) {
    res.status(500).json({ success: false, message: 'Failed to load enrollments' });
  }
};

exports.getByCourse = async (req, res) => {
  try {
    const items = await Enrollment.find({ courseId: req.params.id })
      .populate('studentId', 'name email studentId department')
      .populate('facultyId', 'name email');
    res.json({ success: true, data: items });
  } catch (e) {
    res.status(500).json({ success: false, message: 'Failed to load course enrollments' });
  }
};
