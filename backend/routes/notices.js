const express = require('express');
const { verifyToken, verifyRole } = require('../middleware/auth');
const ctrl = require('../controllers/noticeController');

const router = express.Router();

// List notices - public for all authenticated users (or even public)
router.get('/', ctrl.listNotices);

// Create notice - admin or faculty only
router.post('/', verifyToken, verifyRole('admin', 'faculty'), ctrl.createNotice);

module.exports = router;
