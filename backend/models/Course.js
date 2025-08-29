const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  code: {
    type: String,
    required: [true, 'Please provide a course code'],
    unique: true,
    trim: true,
    uppercase: true
  },
  title: {
    type: String,
    required: [true, 'Please provide a course title'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  description: {
    type: String,
    trim: true,
    maxlength: [500, 'Description cannot be more than 500 characters']
  },
  credits: {
    type: Number,
    required: [true, 'Please provide credit hours'],
    min: [1, 'Credits must be at least 1'],
    max: [6, 'Credits cannot exceed 6']
  },
  department: {
    type: String,
    required: [true, 'Please provide department'],
    trim: true
  },
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Please provide an instructor']
  },
  semester: {
    type: String,
    required: [true, 'Please provide semester'],
    enum: ['Fall', 'Spring', 'Summer']
  },
  year: {
    type: Number,
    required: [true, 'Please provide year'],
    min: [2020, 'Year must be at least 2020']
  },
  maxStudents: {
    type: Number,
    default: 30,
    min: [1, 'Max students must be at least 1']
  },
  enrolledStudents: [{
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    enrolledAt: {
      type: Date,
      default: Date.now
    },
    grade: {
      type: String,
      enum: ['A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D+', 'D', 'F', 'I', 'W'],
      default: 'I'
    }
  }],
  isActive: {
    type: Boolean,
    default: true
  },
  schedule: {
    days: [{
      type: String,
      enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    }],
    startTime: String,
    endTime: String,
    room: String
  }
}, {
  timestamps: true
});

// Virtual for current enrollment count
courseSchema.virtual('currentEnrollment').get(function() {
  return this.enrolledStudents.length;
});

// Ensure virtuals are serialized
courseSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Course', courseSchema);
