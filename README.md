# College ERP System - MERN Stack

A comprehensive College Enterprise Resource Planning (ERP) system built with the MERN stack (MongoDB, Express.js, React, Node.js).

## 🚀 Features

- **User Management**: Student, Teacher, and Administrator roles
- **Course Management**: Create, update, and manage academic courses
- **Student Enrollment**: Course enrollment system for students
- **Authentication**: JWT-based authentication with role-based access control
- **Responsive UI**: Modern, responsive interface built with TailwindCSS
- **Real-time Updates**: Live updates and notifications
- **Security**: Input validation, authentication middleware, and secure routes

## 🛠️ Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **express-validator** - Input validation
- **helmet** - Security middleware
- **morgan** - HTTP request logger

### Frontend
- **React 18** - UI library
- **Vite** - Build tool and dev server
- **TailwindCSS** - CSS framework
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **React Hook Form** - Form handling
- **React Hot Toast** - Notifications
- **Lucide React** - Icons

## 📁 Project Structure

```
college-erp-mern/
├── backend/                 # Backend server
│   ├── config/             # Database configuration
│   ├── controllers/        # Route controllers
│   ├── middleware/         # Custom middleware
│   ├── models/             # Mongoose models
│   ├── routes/             # API routes
│   └── server.js           # Main server file
├── frontend/               # React frontend
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── context/        # React context
│   │   ├── pages/          # Page components
│   │   ├── utils/          # Utility functions
│   │   ├── App.jsx         # Main app component
│   │   └── main.jsx        # Entry point
│   ├── index.html          # HTML template
│   ├── package.json        # Frontend dependencies
│   ├── tailwind.config.js  # TailwindCSS config
│   └── vite.config.js      # Vite configuration
├── package.json            # Root package.json
├── env.example             # Environment variables template
└── README.md               # This file
```

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### 1. Clone the Repository

```bash
git clone <repository-url>
cd college-erp-mern
```

### 2. Install Dependencies

```bash
# Install root dependencies
npm install

# Install frontend dependencies
cd frontend
npm install
cd ..
```

### 3. Environment Setup

1. Copy the environment template:
   ```bash
   cp env.example .env
   ```

2. Update the `.env` file with your configuration:
   ```env
   NODE_ENV=development
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/college_erp
   JWT_SECRET=your_super_secret_jwt_key_here_change_in_production
   JWT_EXPIRE=30d
   ```

### 4. Start MongoDB

Make sure MongoDB is running on your system or update the `MONGO_URI` to point to your cloud MongoDB instance.

### 5. Run the Application

#### Development Mode (Concurrent Frontend + Backend)
```bash
npm run dev
```

This will start both the backend server (port 5000) and frontend dev server (port 3000) concurrently.

#### Individual Services

**Backend Only:**
```bash
npm run server
```

**Frontend Only:**
```bash
npm run client
```

**Production Build:**
```bash
npm run build
```

## 🌐 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user
- `POST /api/auth/logout` - User logout

### Users
- `GET /api/users` - Get all users (Admin only)
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user (Admin only)
- `DELETE /api/users/:id` - Delete user (Admin only)
- `GET /api/users/profile` - Get current user profile
- `PUT /api/users/profile` - Update current user profile

### Courses
- `GET /api/courses` - Get all courses
- `GET /api/courses/:id` - Get course by ID
- `POST /api/courses` - Create course (Teacher/Admin only)
- `PUT /api/courses/:id` - Update course (Teacher/Admin only)
- `DELETE /api/courses/:id` - Delete course (Teacher/Admin only)
- `POST /api/courses/:id/enroll` - Enroll in course (Student only)
- `GET /api/courses/enrolled` - Get enrolled courses (Student only)

## 🔐 User Roles & Permissions

### Student
- View and enroll in courses
- View personal profile and enrolled courses
- Update personal information

### Teacher
- All student permissions
- Create and manage their courses
- View course enrollments

### Administrator
- All teacher permissions
- Manage all users and courses
- System-wide access

## 🎨 Customization

### Styling
The application uses TailwindCSS for styling. You can customize the design by:
- Modifying `frontend/tailwind.config.js`
- Updating color schemes in `frontend/src/index.css`
- Creating custom component classes

### Adding New Features
1. Create new models in `backend/models/`
2. Add controllers in `backend/controllers/`
3. Define routes in `backend/routes/`
4. Create React components in `frontend/src/components/`
5. Add new pages in `frontend/src/pages/`

## 🚀 Deployment

### Backend Deployment
1. Set `NODE_ENV=production` in your environment
2. Update `MONGO_URI` to your production MongoDB instance
3. Use a strong `JWT_SECRET`
4. Deploy to platforms like Heroku, Railway, or AWS

### Frontend Deployment
1. Run `npm run build` to create production build
2. Deploy the `frontend/dist` folder to platforms like Vercel, Netlify, or AWS S3

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues or have questions:
1. Check the existing issues
2. Create a new issue with detailed information
3. Contact the development team

## 🔮 Future Enhancements

- [ ] Real-time notifications
- [ ] File upload system
- [ ] Advanced reporting and analytics
- [ ] Mobile app development
- [ ] Integration with external systems
- [ ] Multi-language support
- [ ] Advanced search and filtering
- [ ] Email notifications
- [ ] Calendar integration
- [ ] Grade management system

---

**Happy Coding! 🎓✨**
