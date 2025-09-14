import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { ChevronLeft, ChevronRight, Plus, Calendar as CalendarIcon, Clock, MapPin } from 'lucide-react'

const Calendar = () => {
  const { user } = useAuth()
  const [currentDate, setCurrentDate] = useState(new Date())
  const [view, setView] = useState('month')

  const events = [
    {
      id: 1,
      title: 'Data Structures Lab',
      date: '2024-01-15',
      time: '09:00 - 10:30',
      type: 'class',
      location: 'Lab 1',
      color: 'bg-blue-500'
    },
    {
      id: 2,
      title: 'Assignment Due: Binary Trees',
      date: '2024-01-18',
      time: '23:59',
      type: 'deadline',
      location: 'Online',
      color: 'bg-red-500'
    }
  ]

  const getDaysInMonth = (date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    const days = []
    
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null)
    }
    
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day)
    }
    
    return days
  }

  const navigateMonth = (direction) => {
    const newDate = new Date(currentDate)
    newDate.setMonth(currentDate.getMonth() + direction)
    setCurrentDate(newDate)
  }

  const getEventsForDate = (day) => {
    if (!day) return []
    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
    return events.filter(event => event.date === dateStr)
  }

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">Academic Calendar</h1>
          <p className="text-gray-300 mt-1 text-sm sm:text-base">Manage your academic schedule and important dates</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <button className="btn-outline w-full sm:w-auto">Sync Google Calendar</button>
          {user?.role === 'faculty' && (
            <button className="btn-primary flex items-center justify-center w-full sm:w-auto">
              <Plus className="h-4 w-4 mr-2" />
              Add Event
            </button>
          )}
        </div>
      </div>

      <div className="card-black p-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
          <div className="flex items-center justify-center sm:justify-start space-x-4">
            <button
              onClick={() => navigateMonth(-1)}
              className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
            >
              <ChevronLeft className="h-5 w-5 text-gray-400" />
            </button>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h2>
            <button
              onClick={() => navigateMonth(1)}
              className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
            >
              <ChevronRight className="h-5 w-5 text-gray-400" />
            </button>
          </div>
          <div className="flex space-x-2 justify-center sm:justify-end">
            {['month', 'week', 'day'].map(viewType => (
              <button
                key={viewType}
                onClick={() => setView(viewType)}
                className={`px-3 py-1 rounded-lg text-sm capitalize transition-colors ${
                  view === viewType
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-400 hover:bg-gray-700'
                }`}
              >
                {viewType}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <div className="grid grid-cols-7 gap-1 min-w-[280px]">
            {dayNames.map(day => (
              <div key={day} className="p-2 sm:p-3 text-center text-xs sm:text-sm font-semibold text-gray-400">
                <span className="hidden sm:inline">{day}</span>
                <span className="sm:hidden">{day.slice(0, 3)}</span>
              </div>
            ))}

            {getDaysInMonth(currentDate).map((day, index) => {
              const dayEvents = getEventsForDate(day)
              const isToday = day && 
                new Date().getDate() === day && 
                new Date().getMonth() === currentDate.getMonth() &&
                new Date().getFullYear() === currentDate.getFullYear()

              return (
                <div
                  key={index}
                  className={`min-h-[80px] sm:min-h-[100px] p-1 sm:p-2 border border-gray-700/50 ${
                    day ? 'hover:bg-gray-700/30 cursor-pointer' : ''
                  } ${isToday ? 'bg-blue-500/20 border-blue-500/50' : ''}`}
                >
                  {day && (
                    <>
                      <div className={`text-sm font-semibold mb-1 ${
                        isToday ? 'text-blue-400' : 'text-white'
                      }`}>
                        {day}
                      </div>
                      <div className="space-y-1">
                        {dayEvents.slice(0, 2).map(event => (
                          <div
                            key={event.id}
                            className={`text-xs p-1 rounded text-white truncate ${event.color}`}
                            title={`${event.title} - ${event.time}`}
                          >
                            {event.title}
                          </div>
                        ))}
                        {dayEvents.length > 2 && (
                          <div className="text-xs text-gray-400">
                            +{dayEvents.length - 2} more
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <div className="card-black p-6">
        <h3 className="text-xl font-semibold text-white mb-4">Upcoming Events</h3>
        <div className="space-y-3">
          {events.slice(0, 5).map(event => (
            <div key={event.id} className="flex items-center space-x-4 p-3 bg-gray-700/30 rounded-lg">
              <div className={`w-3 h-3 rounded-full ${event.color}`}></div>
              <div className="flex-1">
                <h4 className="font-semibold text-white">{event.title}</h4>
                <div className="flex items-center space-x-4 text-sm text-gray-400 mt-1">
                  <div className="flex items-center space-x-1">
                    <CalendarIcon className="h-4 w-4" />
                    <span>{new Date(event.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MapPin className="h-4 w-4" />
                    <span>{event.location}</span>
                  </div>
                </div>
              </div>
              <span className={`text-xs px-2 py-1 rounded-full capitalize ${
                event.type === 'class' ? 'bg-blue-500/20 text-blue-400' :
                event.type === 'deadline' ? 'bg-red-500/20 text-red-400' :
                event.type === 'exam' ? 'bg-purple-500/20 text-purple-400' :
                'bg-green-500/20 text-green-400'
              }`}>
                {event.type}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Calendar