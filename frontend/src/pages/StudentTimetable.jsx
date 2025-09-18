import { useState } from 'react'
import { Calendar, Download, RefreshCw } from 'lucide-react'

const StudentTimetable = () => {
  const [currentWeek, setCurrentWeek] = useState(0)

  const timeSlots = [
    '09:00 - 10:30',
    '11:00 - 12:30', 
    '14:00 - 15:30',
    '16:00 - 17:30'
  ]

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']

  const timetableData = {
    'Monday': {
      '09:00 - 10:30': { subject: 'Data Structures', teacher: 'Dr. Rajesh Kumar', room: 'Lab 1' },
      '14:00 - 15:30': { subject: 'Technical Writing', teacher: 'Dr. Kavita Joshi', room: 'Room 101' }
    },
    'Tuesday': {
      '11:00 - 12:30': { subject: 'Machine Learning', teacher: 'Dr. Anita Verma', room: 'Lab 2' }
    },
    'Wednesday': {
      '09:00 - 10:30': { subject: 'Database Systems', teacher: 'Prof. Meera Sharma', room: 'Room 205' },
      '14:00 - 15:30': { subject: 'Data Structures', teacher: 'Dr. Rajesh Kumar', room: 'Room 205' }
    },
    'Thursday': {
      '11:00 - 12:30': { subject: 'Web Development', teacher: 'Prof. Suresh Reddy', room: 'Lab 3' }
    },
    'Friday': {
      '09:00 - 10:30': { subject: 'Software Engineering', teacher: 'Dr. Vikram Gupta', room: 'Room 301' },
      '14:00 - 15:30': { subject: 'Database Systems', teacher: 'Prof. Meera Sharma', room: 'Lab 1' }
    }
  }

  return (
    <div style={{display: 'flex', flexDirection: 'column', gap: 'clamp(1.5rem, 4vh, 2.5rem)'}}>
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white">My Timetable</h1>
          <p className="text-sm md:text-base text-gray-400 mt-1">View your weekly schedule</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <button className="btn-outline flex items-center">
            <Download className="h-4 w-4 mr-2" />
            Export
          </button>
          <button className="btn-primary flex items-center">
            <Calendar className="h-4 w-4 mr-2" />
            Sync Calendar
          </button>
        </div>
      </div>

      <div className="card-black" style={{padding: 'clamp(0.75rem, 3vw, 1.5rem)'}}>
        <div className="overflow-x-auto">
          <div className="grid grid-cols-6 min-w-[600px]" style={{gap: 'clamp(0.5rem, 2vw, 1rem)'}}>
          <div className="font-semibold text-gray-400 text-xs md:text-sm">Time</div>
          {days.map(day => (
            <div key={day} className="font-semibold text-gray-300 text-xs md:text-sm text-center break-words">
              {day}
            </div>
          ))}

          {timeSlots.map(timeSlot => (
            <>
              <div key={timeSlot} className="py-2 md:py-4 text-xs md:text-sm text-gray-400 font-medium border-t border-gray-700/50">
                {timeSlot}
              </div>
              {days.map(day => (
                <div key={`${day}-${timeSlot}`} className="py-2 md:py-4 border-t border-gray-700/50">
                  {timetableData[day]?.[timeSlot] ? (
                    <div className="bg-gradient-to-r from-blue-600/20 to-cyan-600/20 border border-blue-500/30 rounded-lg p-2 md:p-3 text-xs md:text-sm">
                      <div className="font-semibold text-white break-words">{timetableData[day][timeSlot].subject}</div>
                      <div className="text-gray-300 text-xs mt-1 break-words">{timetableData[day][timeSlot].teacher}</div>
                      <div className="text-gray-400 text-xs break-words">{timetableData[day][timeSlot].room}</div>
                    </div>
                  ) : (
                    <div className="h-12 md:h-16"></div>
                  )}
                </div>
              ))}
            </>
          ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default StudentTimetable