const Student = require('../models/Student');
const Faculty = require('../models/Faculty');
const Course = require('../models/Course');
const Notice = require('../models/Notice');
const Enrollment = require('../models/Enrollment');

// Summary counts
exports.getSummary = async (req, res) => {
  try {
    const [students, faculty, courses, notices] = await Promise.all([
      Student.countDocuments(),
      Faculty.countDocuments(),
      Course.countDocuments({ isActive: true }),
      Notice.countDocuments(),
    ]);

    // Enrollments by day for last 7 days
    const since = new Date();
    since.setDate(since.getDate() - 6);
    const enrollAgg = await Enrollment.aggregate([
      { $match: { createdAt: { $gte: since } } },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    // Normalize to last 7 days array
    const byDayMap = Object.fromEntries(enrollAgg.map(e => [e._id, e.count]));
    const days = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date(since);
      d.setDate(since.getDate() + i);
      const key = d.toISOString().slice(0, 10);
      days.push({ date: key, count: byDayMap[key] || 0 });
    }

    res.json({ success: true, data: { students, faculty, courses, notices, enrollmentsByDay: days } });
  } catch (e) {
    res.status(500).json({ success: false, message: 'Failed to load summary' });
  }
};

// Students CRUD
exports.listStudents = async (req, res) => {
  try {
    const items = await Student.find().populate('courses', 'title code');
    res.json({ success: true, data: items });
  } catch (e) { res.status(500).json({ success: false, message: 'Failed to list students' }); }
};

exports.createStudent = async (req, res) => {
  try {
    const item = await Student.create(req.body);
    res.status(201).json({ success: true, data: item });
  } catch (e) { res.status(400).json({ success: false, message: 'Failed to create student' }); }
};

exports.updateStudent = async (req, res) => {
  try {
    const item = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!item) return res.status(404).json({ success: false, message: 'Student not found' });
    res.json({ success: true, data: item });
  } catch (e) { res.status(400).json({ success: false, message: 'Failed to update student' }); }
};

exports.deleteStudent = async (req, res) => {
  try {
    const item = await Student.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ success: false, message: 'Student not found' });
    res.json({ success: true, message: 'Student deleted' });
  } catch (e) { res.status(400).json({ success: false, message: 'Failed to delete student' }); }
};

// Faculty CRUD
exports.listFaculty = async (req, res) => {
  try {
    const items = await Faculty.find();
    res.json({ success: true, data: items });
  } catch (e) { res.status(500).json({ success: false, message: 'Failed to list faculty' }); }
};

exports.createFaculty = async (req, res) => {
  try {
    const item = await Faculty.create(req.body);
    res.status(201).json({ success: true, data: item });
  } catch (e) { res.status(400).json({ success: false, message: 'Failed to create faculty' }); }
};

exports.updateFaculty = async (req, res) => {
  try {
    const item = await Faculty.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!item) return res.status(404).json({ success: false, message: 'Faculty not found' });
    res.json({ success: true, data: item });
  } catch (e) { res.status(400).json({ success: false, message: 'Failed to update faculty' }); }
};

exports.deleteFaculty = async (req, res) => {
  try {
    const item = await Faculty.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ success: false, message: 'Faculty not found' });
    res.json({ success: true, message: 'Faculty deleted' });
  } catch (e) { res.status(400).json({ success: false, message: 'Failed to delete faculty' }); }
};

// Courses CRUD (reuse Course model)
exports.listCourses = async (req, res) => {
  try {
    const items = await Course.find({}).populate('instructor', 'name email department');
    res.json({ success: true, data: items });
  } catch (e) { res.status(500).json({ success: false, message: 'Failed to list courses' }); }
};

exports.createCourse = async (req, res) => {
  try {
    const item = await Course.create(req.body);
    res.status(201).json({ success: true, data: item });
  } catch (e) { res.status(400).json({ success: false, message: 'Failed to create course' }); }
};

exports.updateCourse = async (req, res) => {
  try {
    const item = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!item) return res.status(404).json({ success: false, message: 'Course not found' });
    res.json({ success: true, data: item });
  } catch (e) { res.status(400).json({ success: false, message: 'Failed to update course' }); }
};

exports.deleteCourse = async (req, res) => {
  try {
    const item = await Course.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ success: false, message: 'Course not found' });
    res.json({ success: true, message: 'Course deleted' });
  } catch (e) { res.status(400). json({ success: false, message: 'Failed to delete course' }); }
};
