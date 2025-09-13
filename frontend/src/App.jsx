import { Routes, Route } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import Layout from './components/Layout'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Courses from './pages/Courses'
import CourseDetail from './pages/CourseDetail'
import Profile from './pages/Profile'
import Users from './pages/Users'
import ProtectedRoute from './components/ProtectedRoute'
import Admin from './pages/Admin'
import Faculty from './pages/Faculty'
import Student from './pages/Student'
import StudentEnroll from './pages/StudentEnroll'
import FacultyEnrollments from './pages/FacultyEnrollments'
import FacultyMarkAttendance from './pages/FacultyMarkAttendance'
import StudentAttendance from './pages/StudentAttendance'
import FacultyGrades from './pages/FacultyGrades'
import StudentGrades from './pages/StudentGrades'
import Notices from './pages/Notices'
import NewNotice from './pages/NewNotice'

function App() {
  const { user } = useAuth()

  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        
        {/* FIXED: Moved protected routes outside of nested ProtectedRoute */}
        <Route path="dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="courses" element={<ProtectedRoute><Courses /></ProtectedRoute>} />
        <Route path="courses/:id" element={<ProtectedRoute><CourseDetail /></ProtectedRoute>} />
        <Route path="users" element={<ProtectedRoute><Users /></ProtectedRoute>} />
        
        {/* Role-specific landing pages */}
        <Route path="admin" element={<ProtectedRoute requiredRole="admin"><Admin /></ProtectedRoute>} />
        <Route path="faculty" element={<ProtectedRoute requiredRole="faculty"><Faculty /></ProtectedRoute>} />
        <Route path="student" element={<ProtectedRoute requiredRole="student"><Student /></ProtectedRoute>} />

        {/* Notices */}
        <Route path="notices" element={<Notices />} />
        <Route path="notices/new" element={<ProtectedRoute requiredRole="faculty"><NewNotice /></ProtectedRoute>} />

        {/* Enrollment related */}
        <Route path="student/enroll" element={<ProtectedRoute requiredRole="student"><StudentEnroll /></ProtectedRoute>} />
        <Route path="faculty/enrollments" element={<ProtectedRoute requiredRole="faculty"><FacultyEnrollments /></ProtectedRoute>} />

        {/* Attendance related */}
        <Route path="faculty/attendance" element={<ProtectedRoute requiredRole="faculty"><FacultyMarkAttendance /></ProtectedRoute>} />
        <Route path="student/attendance" element={<ProtectedRoute requiredRole="student"><StudentAttendance /></ProtectedRoute>} />

        {/* Grades related */}
        <Route path="faculty/grades" element={<ProtectedRoute requiredRole="faculty"><FacultyGrades /></ProtectedRoute>} />
        <Route path="student/grades" element={<ProtectedRoute requiredRole="student"><StudentGrades /></ProtectedRoute>} />
      </Route>
    </Routes>
  )
}

export default App