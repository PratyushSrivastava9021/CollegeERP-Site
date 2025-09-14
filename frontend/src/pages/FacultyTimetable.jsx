import { useState } from 'react'
import { Calendar, Download, Plus, Edit } from 'lucide-react'

const FacultyTimetable = () => {
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
      '09:00 - 10:30': { subject: 'Data Structures', class: 'CSE-3A', room: 'Lab 1', students: 45 },
      '14:00 - 15:30': { subject: 'Algorithm Design', class: 'CSE-3B', room: 'Room 205', students: 38 }
    },
    'Tuesday': {
      '11:00 - 12:30': { subject: 'Database Systems', class: 'CSE-4A', room: 'Lab 2', students: 42 }
    },
    'Wednesday': {
      '09:00 - 10:30': { subject: 'Data Structures', class: 'CSE-3A', room: 'Lab 1', students: 45 },
      '16:00 - 17:30': { subject: 'Research Methodology', class: 'CSE-4B', room: 'Room 301', students: 35 }
    },
    'Thursday': {
      '11:00 - 12:30': { subject: 'Database Systems', class: 'CSE-4A', room: 'Lab 2', students: 42 },
      '14:00 - 15:30': { subject: 'Algorithm Design', class: 'CSE-3B', room: 'Room 205', students: 38 }
    },
    'Friday': {
      '09:00 - 10:30': { subject: 'Research Methodology', class: 'CSE-4B', room: 'Room 301', students: 35 }
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">My Teaching Schedule</h1>
          <p className="text-gray-400 mt-1">Manage your weekly teaching timetable</p>
        </div>
        <div className="flex space-x-3">
          <button className="btn-outline flex items-center">
            <Download className="h-4 w-4 mr-2" />
            Export
          </button>
          <button className="btn-outline flex items-center">
            <Edit className="h-4 w-4 mr-2" />
            Edit Schedule
          </button>
          <button className="btn-primary flex items-center">
            <Calendar className="h-4 w-4 mr-2" />
            Sync Calendar
          </button>
        </div>
      </div>

      <div className="card-black p-6">
        <div className="grid grid-cols-6 gap-4">
          <div className="font-semibold text-gray-400 text-sm">Time</div>
          {days.map(day => (
            <div key={day} className="font-semibold text-gray-300 text-sm text-center">
              {day}
            </div>
          ))}

          {timeSlots.map(timeSlot => (
            <>
              <div key={timeSlot} className="py-4 text-sm text-gray-400 font-medium border-t border-gray-700/50">
                {timeSlot}
              </div>
              {days.map(day => (
                <div key={`${day}-${timeSlot}`} className="py-4 border-t border-gray-700/50">
                  {timetableData[day]?.[timeSlot] ? (
                    <div className="bg-gradient-to-r from-green-600/20 to-emerald-600/20 border border-green-500/30 rounded-lg p-3 text-sm hover:bg-green-600/30 transition-colors cursor-pointer">
                      <div className="font-semibold text-white">{timetableData[day][timeSlot].subject}</div>
                      <div className="text-gray-300 text-xs mt-1">{timetableData[day][timeSlot].class}</div>
                      <div className="text-gray-400 text-xs">{timetableData[day][timeSlot].room}</div>
                      <div className="text-gray-400 text-xs">{timetableData[day][timeSlot].students} students</div>
                    </div>
                  ) : (
                    <div className="h-16 border-2 border-dashed border-gray-700/50 rounded-lg flex items-center justify-center hover:border-gray-600/50 transition-colors cursor-pointer group">
                      <Plus className="h-4 w-4 text-gray-600 group-hover:text-gray-500" />
                    </div>
                  )}
                </div>
              ))}
            </>
          ))}
        </div>
      </div>
    </div>
  )
}

export default FacultyTimetable