import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import ThreeDashboardBg from '../three/ThreeDashboardBg'

export default function Layout() {
  return (
    <div className="flex min-h-screen bg-bg">
      <ThreeDashboardBg />
      <Sidebar />
      <div className="flex flex-col flex-1 min-w-0">
        <Navbar />
        <main className="flex-1 p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
