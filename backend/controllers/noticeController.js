const Notice = require('../models/Notice');

exports.listNotices = async (req, res) => {
  try {
    const items = await Notice.find().populate('createdBy', 'name role').sort({ createdAt: -1 })
    res.json({ success: true, data: items })
  } catch (e) {
    res.status(500).json({ success: false, message: 'Failed to load notices' })
  }
}

exports.createNotice = async (req, res) => {
  try {
    const { title, description, date } = req.body
    if (!title || !description) {
      return res.status(400).json({ success: false, message: 'title and description are required' })
    }
    const notice = await Notice.create({ title, description, date: date ? new Date(date) : new Date(), createdBy: req.user.id })
    res.status(201).json({ success: true, data: notice })
  } catch (e) {
    res.status(500).json({ success: false, message: 'Failed to create notice' })
  }
}
