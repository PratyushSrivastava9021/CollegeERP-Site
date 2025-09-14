import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { TrendingUp, TrendingDown, BarChart3, PieChart, Calendar, Award, Clock, Users } from 'lucide-react'

const Analytics = () => {
  const { user } = useAuth()
  const [timeRange, setTimeRange] = useState('semester') // semester, month, week

  const studentAnalytics = {
    overview: {
      gpa: 3.7,
      attendance: 87,
      assignmentsCompleted: 23,
      totalAssignments: 26,
      quizzesTaken: 12,
      totalQuizzes: 15
    },
    coursePerformance: [
      { course: 'Data Structures', grade: 'A', percentage: 92, trend: 'up' },
      { course: 'Database Systems', grade: 'B+', percentage: 87, trend: 'up' },
      { course: 'Machine Learning', grade: 'A-', percentage: 89, trend: 'down' },
      { course: 'Web Development', grade: 'A', percentage: 94, trend: 'up' }
    ],
    attendanceData: [
      { month: 'Sep', percentage: 95 },
      { month: 'Oct', percentage: 89 },
      { month: 'Nov', percentage: 92 },
      { month: 'Dec', percentage: 85 },
      { month: 'Jan', percentage: 87 }
    ],
    gradeDistribution: [
      { grade: 'A', count: 8, percentage: 40 },
      { grade: 'B', count: 7, percentage: 35 },
      { grade: 'C', count: 4, percentage: 20 },
      { grade: 'D', count: 1, percentage: 5 }
    ]
  }

  const facultyAnalytics = {
    overview: {
      totalStudents: 156,
      averageAttendance: 84,
      coursesTeaching: 3,
      averageGrade: 3.4,
      feedbackRating: 4.3
    },
    courseStats: [
      { course: 'Data Structures', students: 45, avgGrade: 3.6, attendance: 89 },
      { course: 'Database Systems', students: 42, avgGrade: 3.2, attendance: 82 },
      { course: 'Algorithm Design', students: 38, avgGrade: 3.8, attendance: 91 }
    ],
    studentProgress: [
      { month: 'Sep', avgGrade: 3.2 },
      { month: 'Oct', avgGrade: 3.4 },
      { month: 'Nov', avgGrade: 3.5 },
      { month: 'Dec', avgGrade: 3.3 },
      { month: 'Jan', avgGrade: 3.4 }
    ]
  }

  const data = user?.role === 'student' ? studentAnalytics : facultyAnalytics

  const StatCard = ({ title, value, subtitle, icon: Icon, trend, color = 'blue' }) => (
    <div className="card-black p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-300">{title}</p>
          <div className="flex items-center space-x-2 mt-1">
            <p className="text-2xl font-bold text-white">{value}</p>
            {trend && (
              <div className={`flex items-center ${trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
                {trend === 'up' ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
              </div>
            )}
          </div>
          {subtitle && <p className="text-sm text-gray-400 mt-1">{subtitle}</p>}
        </div>
        <div className={`p-3 bg-${color}-500/20 rounded-xl`}>
          <Icon className={`h-6 w-6 text-${color}-400`} />
        </div>
      </div>
    </div>
  )

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">Performance Analytics</h1>
          <p className="text-gray-300 mt-1">
            {user?.role === 'student' ? 'Track your academic progress and identify improvement areas' : 'Monitor student performance and course effectiveness'}
          </p>
        </div>
        <div className="flex space-x-3">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="form-select"
          >
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="semester">This Semester</option>
          </select>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="responsive-grid-4">
        {user?.role === 'student' ? (
          <>
            <StatCard
              title="Current GPA"
              value={data.overview.gpa}
              icon={Award}
              trend="up"
              color="yellow"
            />
            <StatCard
              title="Attendance Rate"
              value={`${data.overview.attendance}%`}
              icon={Calendar}
              trend={data.overview.attendance > 85 ? 'up' : 'down'}
              color="green"
            />
            <StatCard
              title="Assignments"
              value={`${data.overview.assignmentsCompleted}/${data.overview.totalAssignments}`}
              subtitle="Completed"
              icon={BarChart3}
              color="blue"
            />
            <StatCard
              title="Quizzes"
              value={`${data.overview.quizzesTaken}/${data.overview.totalQuizzes}`}
              subtitle="Taken"
              icon={Clock}
              color="purple"
            />
          </>
        ) : (
          <>
            <StatCard
              title="Total Students"
              value={data.overview.totalStudents}
              icon={Users}
              color="blue"
            />
            <StatCard
              title="Avg Attendance"
              value={`${data.overview.averageAttendance}%`}
              icon={Calendar}
              trend={data.overview.averageAttendance > 80 ? 'up' : 'down'}
              color="green"
            />
            <StatCard
              title="Courses Teaching"
              value={data.overview.coursesTeaching}
              icon={BarChart3}
              color="purple"
            />
            <StatCard
              title="Feedback Rating"
              value={data.overview.feedbackRating}
              subtitle="out of 5.0"
              icon={Award}
              trend="up"
              color="yellow"
            />
          </>
        )}
      </div>

      {/* Course Performance */}
      <div className="card-black p-6">
        <h3 className="text-xl font-semibold text-white mb-6">
          {user?.role === 'student' ? 'Course Performance' : 'Course Statistics'}
        </h3>
        <div className="space-y-4">
          {(user?.role === 'student' ? data.coursePerformance : data.courseStats).map((course, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-700/30 rounded-lg">
              <div className="flex-1">
                <h4 className="font-semibold text-white">{course.course}</h4>
                {user?.role === 'student' ? (
                  <div className="flex items-center space-x-4 mt-1">
                    <span className="text-sm text-gray-400">Grade: {course.grade}</span>
                    <span className="text-sm text-gray-400">{course.percentage}%</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-4 mt-1">
                    <span className="text-sm text-gray-400">{course.students} students</span>
                    <span className="text-sm text-gray-400">Avg Grade: {course.avgGrade}</span>
                    <span className="text-sm text-gray-400">Attendance: {course.attendance}%</span>
                  </div>
                )}
              </div>
              <div className="flex items-center space-x-3">
                {user?.role === 'student' && (
                  <div className="w-32 bg-gray-600 rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full" 
                      style={{ width: `${course.percentage}%` }}
                    />
                  </div>
                )}
                {user?.role === 'student' && course.trend && (
                  <div className={course.trend === 'up' ? 'text-green-400' : 'text-red-400'}>
                    {course.trend === 'up' ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Charts Section */}
      <div className="responsive-grid-2">
        {/* Attendance Trend */}
        <div className="card-black p-6">
          <h3 className="text-xl font-semibold text-white mb-6">
            {user?.role === 'student' ? 'Attendance Trend' : 'Student Progress'}
          </h3>
          <div className="space-y-4">
            {(user?.role === 'student' ? data.attendanceData : data.studentProgress).map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-gray-400">{item.month}</span>
                <div className="flex items-center space-x-3">
                  <div className="w-32 bg-gray-600 rounded-full h-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full" 
                      style={{ 
                        width: user?.role === 'student' 
                          ? `${item.percentage}%` 
                          : `${(item.avgGrade / 4) * 100}%` 
                      }}
                    />
                  </div>
                  <span className="text-white font-semibold w-12">
                    {user?.role === 'student' ? `${item.percentage}%` : item.avgGrade}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Grade Distribution (Student only) */}
        {user?.role === 'student' && (
          <div className="card-black p-6">
            <h3 className="text-xl font-semibold text-white mb-6">Grade Distribution</h3>
            <div className="space-y-4">
              {data.gradeDistribution.map((grade, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-gray-400">Grade {grade.grade}</span>
                  <div className="flex items-center space-x-3">
                    <div className="w-32 bg-gray-600 rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full" 
                        style={{ width: `${grade.percentage}%` }}
                      />
                    </div>
                    <span className="text-white font-semibold w-12">{grade.count}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Analytics