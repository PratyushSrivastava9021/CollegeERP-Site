const Library = require('../models/Library');

// @desc    Get all books
// @route   GET /api/library
// @access  Private
exports.getBooks = async (req, res) => {
  try {
    let query = Library.find({ isActive: true });
    
    // Search functionality
    if (req.query.search) {
      query = query.find({
        $text: { $search: req.query.search }
      });
    }
    
    // Filter by category
    if (req.query.category) {
      query = query.where('category').equals(req.query.category);
    }
    
    const books = await query.sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: books.length,
      data: books
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching books'
    });
  }
};

// @desc    Add new book
// @route   POST /api/library
// @access  Private (Faculty/Admin)
exports.addBook = async (req, res) => {
  try {
    req.body.addedBy = req.user.id;
    req.body.availableCopies = req.body.totalCopies;
    
    const book = await Library.create(req.body);
    
    res.status(201).json({
      success: true,
      data: book
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Book with this ISBN already exists'
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Error adding book'
    });
  }
};

// @desc    Borrow book
// @route   POST /api/library/:id/borrow
// @access  Private (Student)
exports.borrowBook = async (req, res) => {
  try {
    const book = await Library.findById(req.params.id);
    
    if (!book) {
      return res.status(404).json({
        success: false,
        message: 'Book not found'
      });
    }
    
    if (book.availableCopies <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Book is not available'
      });
    }
    
    // Check if student already has this book
    const activeBorrow = book.borrowHistory.find(
      borrow => borrow.student.toString() === req.user.id && borrow.status === 'borrowed'
    );
    
    if (activeBorrow) {
      return res.status(400).json({
        success: false,
        message: 'You have already borrowed this book'
      });
    }
    
    // Calculate due date (14 days from now)
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 14);
    
    book.borrowHistory.push({
      student: req.user.id,
      dueDate: dueDate
    });
    
    book.availableCopies -= 1;
    await book.save();
    
    res.status(200).json({
      success: true,
      message: 'Book borrowed successfully',
      dueDate: dueDate
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error borrowing book'
    });
  }
};

// @desc    Return book
// @route   POST /api/library/:id/return
// @access  Private (Student)
exports.returnBook = async (req, res) => {
  try {
    const book = await Library.findById(req.params.id);
    
    if (!book) {
      return res.status(404).json({
        success: false,
        message: 'Book not found'
      });
    }
    
    const borrowRecord = book.borrowHistory.find(
      borrow => borrow.student.toString() === req.user.id && borrow.status === 'borrowed'
    );
    
    if (!borrowRecord) {
      return res.status(400).json({
        success: false,
        message: 'You have not borrowed this book'
      });
    }
    
    borrowRecord.returnDate = new Date();
    borrowRecord.status = 'returned';
    
    // Calculate fine if overdue
    if (borrowRecord.returnDate > borrowRecord.dueDate) {
      const daysOverdue = Math.ceil((borrowRecord.returnDate - borrowRecord.dueDate) / (1000 * 60 * 60 * 24));
      borrowRecord.fine = daysOverdue * 5; // $5 per day
    }
    
    book.availableCopies += 1;
    await book.save();
    
    res.status(200).json({
      success: true,
      message: 'Book returned successfully',
      fine: borrowRecord.fine || 0
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error returning book'
    });
  }
};

// @desc    Get borrowed books for student
// @route   GET /api/library/borrowed
// @access  Private (Student)
exports.getBorrowedBooks = async (req, res) => {
  try {
    const books = await Library.find({
      'borrowHistory.student': req.user.id,
      'borrowHistory.status': 'borrowed'
    });
    
    const borrowedBooks = books.map(book => {
      const borrowRecord = book.borrowHistory.find(
        borrow => borrow.student.toString() === req.user.id && borrow.status === 'borrowed'
      );
      
      return {
        ...book.toObject(),
        borrowDate: borrowRecord.borrowDate,
        dueDate: borrowRecord.dueDate,
        isOverdue: new Date() > borrowRecord.dueDate
      };
    });
    
    res.status(200).json({
      success: true,
      count: borrowedBooks.length,
      data: borrowedBooks
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching borrowed books'
    });
  }
};

module.exports = exports;