const mongoose = require('mongoose');

const noticeSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, default: Date.now },
}, { timestamps: true });

module.exports = mongoose.model('Notice', noticeSchema);
