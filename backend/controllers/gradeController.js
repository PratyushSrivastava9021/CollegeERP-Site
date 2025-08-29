const Grade = require('../models/Grade');
const Course = require('../models/Course');

exports.upsertGrade = async (req, res) => {
  try {
    const { studentId, courseId, marks, grade } = req.body;
    if (!studentId || !courseId || marks == null || !grade) {
      return res.status(400).json({ success: false, message: 'studentId, courseId, marks, grade are required' });
    }

    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ success: false, message: 'Course not found' });

    // Only instructor or admin
    if (req.user.role !== 'admin' && course.instructor.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Not authorized to modify grades' });
    }

    const updated = await Grade.findOneAndUpdate(
      { studentId, courseId },
      { $set: { marks, grade, gradedBy: req.user.id } },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    res.status(200).json({ success: true, data: updated });
  } catch (e) {
    res.status(500).json({ success: false, message: 'Failed to save grade' });
  }
};

exports.getStudentGrades = async (req, res) => {
  try {
    const { id } = req.params;
    const items = await Grade.find({ studentId: id })
      .populate('courseId', 'title code credits')
      .sort({ updatedAt: -1 });
    res.json({ success: true, data: items });
  } catch (e) {
    res.status(500).json({ success: false, message: 'Failed to load grades' });
  }
};
