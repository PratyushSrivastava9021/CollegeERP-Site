import { useParams } from 'react-router-dom'

const CourseDetail = () => {
  const { id } = useParams()
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Course Detail</h1>
      <p className="text-gray-600">Details for course ID: {id}</p>
    </div>
  )
}

export default CourseDetail
