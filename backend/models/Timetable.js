const mongoose = require('mongoose');

const timetableSchema = new mongoose.Schema({
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: [true, 'Timetable entry must belong to a course']
  },
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Timetable entry must have an instructor']
  },
  day: {
    type: String,
    required: [true, 'Please provide day'],
    enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  },
  startTime: {
    type: String,
    required: [true, 'Please provide start time'],
    match: [/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Please provide valid time format (HH:MM)']
  },
  endTime: {
    type: String,
    required: [true, 'Please provide end time'],
    match: [/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Please provide valid time format (HH:MM)']
  },
  room: {
    type: String,
    required: [true, 'Please provide room number'],
    trim: true
  },
  semester: {
    type: String,
    required: [true, 'Please provide semester'],
    enum: ['Fall', 'Spring', 'Summer']
  },
  year: {
    type: Number,
    required: [true, 'Please provide academic year']
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Compound index to prevent scheduling conflicts
timetableSchema.index({ 
  day: 1, 
  startTime: 1, 
  endTime: 1, 
  room: 1, 
  semester: 1, 
  year: 1 
}, { 
  unique: true 
});

timetableSchema.index({ course: 1 });
timetableSchema.index({ instructor: 1 });

module.exports = mongoose.model('Timetable', timetableSchema);