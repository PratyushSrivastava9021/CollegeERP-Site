const mongoose = require('mongoose');

const facultySchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, trim: true },
  dept: { type: String, required: true, trim: true },
  subjects: [{ type: String, trim: true }],
}, { timestamps: true });

module.exports = mongoose.model('Faculty', facultySchema);
