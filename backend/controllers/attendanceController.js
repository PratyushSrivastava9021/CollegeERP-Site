const Attendance = require('../models/Attendance');
const Course = require('../models/Course');

exports.markAttendance = async (req, res) => {
  try {
    const { courseId, records, date } = req.body;
    if (!courseId || !Array.isArray(records) || records.length === 0) {
      return res.status(400).json({ success: false, message: 'courseId and records are required' });
    }

    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ success: false, message: 'Course not found' });

    // Only the course instructor or admin can mark attendance
    if (req.user.role !== 'admin' && course.instructor.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Not authorized to mark attendance' });
    }

    const attendanceDate = date ? new Date(date) : new Date();

    // Upsert each attendance record
    const ops = records.map(r => ({
      updateOne: {
        filter: { studentId: r.studentId, courseId, date: attendanceDate },
        update: { $set: { status: r.status || 'present', markedBy: req.user.id } },
        upsert: true
      }
    }));

    await Attendance.bulkWrite(ops);

    res.status(200).json({ success: true, message: 'Attendance marked' });
  } catch (e) {
    res.status(500).json({ success: false, message: 'Failed to mark attendance' });
  }
};

exports.getStudentAttendance = async (req, res) => {
  try {
    const { id } = req.params; // student id
    const { courseId } = req.query;

    const filter = { studentId: id };
    if (courseId) filter.courseId = courseId;

    const items = await Attendance.find(filter)
      .populate('courseId', 'title code')
      .sort({ date: -1 });

    res.json({ success: true, data: items });
  } catch (e) {
    res.status(500).json({ success: false, message: 'Failed to load attendance' });
  }
};
