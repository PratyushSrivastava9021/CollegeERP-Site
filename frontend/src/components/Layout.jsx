import { Outlet } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Header from './Header'
import Sidebar from './Sidebar'

const Layout = () => {
  const { user } = useAuth()

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex">
        {user && <Sidebar />}
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default Layout
