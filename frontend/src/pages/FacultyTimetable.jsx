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
    <div className="space-y-[clamp(1.5rem,4vw,2.5rem)]">
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-[clamp(1rem,3vw,1.5rem)]">
        <div>
          <h1 className="text-[clamp(1.75rem,5vw,3rem)] font-bold text-white">My Teaching Schedule</h1>
          <p className="text-gray-400 mt-[clamp(0.25rem,1vw,0.5rem)] text-[clamp(0.875rem,2.5vw,1rem)]">Manage your weekly teaching timetable</p>
        </div>
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
          <button className="btn-outline flex items-center justify-center">
            <Download className="h-4 w-4 mr-2" />
            Export
          </button>
          <button className="btn-outline flex items-center justify-center">
            <Edit className="h-4 w-4 mr-2" />
            Edit Schedule
          </button>
          <button className="btn-primary flex items-center justify-center">
            <Calendar className="h-4 w-4 mr-2" />
            Sync Calendar
          </button>
        </div>
      </div>

      <div className="card-black p-[clamp(1rem,3vw,1.5rem)]">
        <div className="overflow-x-auto">
          <div className="grid grid-cols-6 gap-[clamp(0.5rem,2vw,1rem)] min-w-[800px]">
            <div className="font-semibold text-gray-400 text-[clamp(0.75rem,2vw,0.875rem)]">Time</div>
            {days.map(day => (
              <div key={day} className="font-semibold text-gray-300 text-[clamp(0.75rem,2vw,0.875rem)] text-center">
                <span className="hidden sm:inline">{day}</span>
                <span className="sm:hidden">{day.slice(0, 3)}</span>
              </div>
            ))}

            {timeSlots.map(timeSlot => (
              <>
                <div key={timeSlot} className="py-[clamp(0.75rem,2vw,1rem)] text-[clamp(0.75rem,2vw,0.875rem)] text-gray-400 font-medium border-t border-gray-700/50">
                  <span className="hidden sm:inline">{timeSlot}</span>
                  <span className="sm:hidden">{timeSlot.split(' - ')[0]}</span>
                </div>
                {days.map(day => (
                  <div key={`${day}-${timeSlot}`} className="py-[clamp(0.75rem,2vw,1rem)] border-t border-gray-700/50">
                    {timetableData[day]?.[timeSlot] ? (
                      <div className="bg-gradient-to-r from-green-600/20 to-emerald-600/20 border border-green-500/30 rounded-lg p-[clamp(0.5rem,1.5vw,0.75rem)] text-[clamp(0.75rem,2vw,0.875rem)] hover:bg-green-600/30 transition-colors cursor-pointer">
                        <div className="font-semibold text-white text-[clamp(0.75rem,2vw,0.875rem)]">{timetableData[day][timeSlot].subject}</div>
                        <div className="text-gray-300 text-[clamp(0.625rem,1.5vw,0.75rem)] mt-1">{timetableData[day][timeSlot].class}</div>
                        <div className="text-gray-400 text-[clamp(0.625rem,1.5vw,0.75rem)]">{timetableData[day][timeSlot].room}</div>
                        <div className="text-gray-400 text-[clamp(0.625rem,1.5vw,0.75rem)]">{timetableData[day][timeSlot].students} students</div>
                      </div>
                    ) : (
                      <div className="h-[clamp(3rem,8vw,4rem)] border-2 border-dashed border-gray-700/50 rounded-lg flex items-center justify-center hover:border-gray-600/50 transition-colors cursor-pointer group">
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
    </div>
  )
}

export default FacultyTimetable