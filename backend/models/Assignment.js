const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide assignment title'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Please provide assignment description'],
    maxlength: [1000, 'Description cannot be more than 1000 characters']
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: [true, 'Assignment must belong to a course']
  },
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Assignment must have an instructor']
  },
  dueDate: {
    type: Date,
    required: [true, 'Please provide due date']
  },
  maxMarks: {
    type: Number,
    required: [true, 'Please provide maximum marks'],
    min: [1, 'Maximum marks must be at least 1']
  },
  attachments: [{
    filename: String,
    url: String,
    uploadedAt: {
      type: Date,
      default: Date.now
    }
  }],
  submissions: [{
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    submittedAt: {
      type: Date,
      default: Date.now
    },
    content: String,
    attachments: [{
      filename: String,
      url: String
    }],
    marks: {
      type: Number,
      min: 0
    },
    feedback: String,
    gradedAt: Date,
    gradedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  }],
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

assignmentSchema.index({ course: 1, dueDate: 1 });
assignmentSchema.index({ instructor: 1 });

module.exports = mongoose.model('Assignment', assignmentSchema);