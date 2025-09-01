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

