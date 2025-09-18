const mongoose = require('mongoose');

const librarySchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide book title'],
    trim: true,
    maxlength: [200, 'Title cannot be more than 200 characters']
  },
  author: {
    type: String,
    required: [true, 'Please provide author name'],
    trim: true,
    maxlength: [100, 'Author name cannot be more than 100 characters']
  },
  isbn: {
    type: String,
    unique: true,
    sparse: true,
    trim: true
  },
  category: {
    type: String,
    required: [true, 'Please provide category'],
    enum: ['Computer Science', 'Mathematics', 'Physics', 'Chemistry', 'Biology', 'Literature', 'History', 'Economics', 'Management', 'Other']
  },
  publisher: {
    type: String,
    trim: true
  },
  publishedYear: {
    type: Number,
    min: [1900, 'Published year must be after 1900']
  },
  totalCopies: {
    type: Number,
    required: [true, 'Please provide total copies'],
    min: [1, 'Total copies must be at least 1']
  },
  availableCopies: {
    type: Number,
    required: [true, 'Please provide available copies'],
    min: [0, 'Available copies cannot be negative']
  },
  location: {
    shelf: String,
    section: String,
    floor: String
  },
  description: {
    type: String,
    maxlength: [500, 'Description cannot be more than 500 characters']
  },
  addedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  borrowHistory: [{
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    borrowDate: {
      type: Date,
      default: Date.now
    },
    dueDate: {
      type: Date,
      required: true
    },
    returnDate: Date,
    fine: {
      type: Number,
      default: 0
    },
    status: {
      type: String,
      enum: ['borrowed', 'returned', 'overdue'],
      default: 'borrowed'
    }
  }],
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

librarySchema.index({ title: 'text', author: 'text' });
librarySchema.index({ category: 1 });
librarySchema.index({ isbn: 1 });

module.exports = mongoose.model('Library', librarySchema);