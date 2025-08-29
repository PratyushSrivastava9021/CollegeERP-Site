const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, trim: true },
  roll: { type: String, required: true, unique: true, trim: true },
  batch: { type: String, required: true, trim: true },
  courses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
}, { timestamps: true });

module.exports = mongoose.model('Student', studentSchema);
