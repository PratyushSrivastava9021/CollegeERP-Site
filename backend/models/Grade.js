const mongoose = require('mongoose');

const gradeSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  marks: { type: Number, min: 0, max: 100, required: true },
  grade: { type: String, required: true },
  gradedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

gradeSchema.index({ studentId: 1, courseId: 1 }, { unique: true });

module.exports = mongoose.model('Grade', gradeSchema);
