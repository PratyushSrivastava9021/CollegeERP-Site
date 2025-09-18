const express = require('express');
const { protect, authorize } = require('../middleware/auth');
const {
  getBooks,
  addBook,
  borrowBook,
  returnBook,
  getBorrowedBooks
} = require('../controllers/libraryController');

const router = express.Router();

router.route('/')
  .get(protect, getBooks)
  .post(protect, authorize('faculty', 'admin'), addBook);

router.get('/borrowed', protect, authorize('student'), getBorrowedBooks);
router.post('/:id/borrow', protect, authorize('student'), borrowBook);
router.post('/:id/return', protect, authorize('student'), returnBook);

module.exports = router;