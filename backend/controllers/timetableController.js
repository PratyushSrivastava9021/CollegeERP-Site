const Timetable = require('../models/Timetable');
const Course = require('../models/Course');

// @desc    Get timetable
// @route   GET /api/timetable
// @access  Private
exports.getTimetable = async (req, res) => {
  try {
    let query = {};
    
    // Filter by semester and year
    if (req.query.semester) query.semester = req.query.semester;
    if (req.query.year) query.year = req.query.year;
    
    // Filter by user role
    if (req.user.role === 'faculty') {
      query.instructor = req.user.id;
    }
    
    const timetable = await Timetable.find(query)
      .populate('course', 'title code')
      .populate('instructor', 'name')
      .sort({ day: 1, startTime: 1 });
    
    res.status(200).json({
      success: true,
      count: timetable.length,
      data: timetable
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching timetable'
    });
  }
};

// @desc    Create timetable entry
// @route   POST /api/timetable
// @access  Private (Faculty/Admin)
exports.createTimetableEntry = async (req, res) => {
  try {
    // Verify course exists
    const course = await Course.findById(req.body.course);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }
    
    // Set instructor from course or request
    req.body.instructor = req.body.instructor || course.instructor;
    
    // Check for scheduling conflicts
    const conflict = await Timetable.findOne({
      day: req.body.day,
      room: req.body.room,
      semester: req.body.semester,
      year: req.body.year,
      $or: [
        {
          startTime: { $lt: req.body.endTime },
          endTime: { $gt: req.body.startTime }
        }
      ]
    });
    
    if (conflict) {
      return res.status(400).json({
        success: false,
        message: 'Room is already booked for this time slot'
      });
    }
    
    const timetableEntry = await Timetable.create(req.body);
    await timetableEntry.populate('course', 'title code');
    
    res.status(201).json({
      success: true,
      data: timetableEntry
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Scheduling conflict detected'
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Error creating timetable entry'
    });
  }
};

// @desc    Update timetable entry
// @route   PUT /api/timetable/:id
// @access  Private (Faculty/Admin)
exports.updateTimetableEntry = async (req, res) => {
  try {
    const timetableEntry = await Timetable.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('course', 'title code');
    
    if (!timetableEntry) {
      return res.status(404).json({
        success: false,
        message: 'Timetable entry not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: timetableEntry
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating timetable entry'
    });
  }
};

// @desc    Delete timetable entry
// @route   DELETE /api/timetable/:id
// @access  Private (Faculty/Admin)
exports.deleteTimetableEntry = async (req, res) => {
  try {
    const timetableEntry = await Timetable.findByIdAndDelete(req.params.id);
    
    if (!timetableEntry) {
      return res.status(404).json({
        success: false,
        message: 'Timetable entry not found'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Timetable entry deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting timetable entry'
    });
  }
};

module.exports = exports;