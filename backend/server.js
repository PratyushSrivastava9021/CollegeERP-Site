const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Simple MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => {
    console.error('❌ MongoDB Error:', err.message);
    console.log('🔧 Using fallback local MongoDB...');
    mongoose.connect('mongodb://localhost:27017/college_erp')
      .then(() => console.log('✅ Local MongoDB Connected'))
      .catch(() => console.log('❌ No database available'));
  });

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/courses', require('./routes/courses'));
app.use('/api/admin', require('./routes/admin'));
app.use('/api/enrollments', require('./routes/enrollments'));
app.use('/api/attendance', require('./routes/attendance'));
app.use('/api/grades', require('./routes/grades'));
app.use('/api/notices', require('./routes/notices'));
app.use('/api/assignments', require('./routes/assignments'));
app.use('/api/timetable', require('./routes/timetable'));
app.use('/api/library', require('./routes/library'));

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK',
    message: 'College ERP API is running',
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    timestamp: new Date().toISOString()
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    success: false, 
    message: 'Something went wrong!' 
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ 
    success: false, 
    message: 'Route not found' 
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📱 Environment: ${process.env.NODE_ENV}`);
});
