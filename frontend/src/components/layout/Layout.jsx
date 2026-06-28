import { Outlet } from 'react-router-dom'
import { useState } from 'react'
import Navbar from './Navbar'
import PauseMenu from './PauseMenu'
import ThreeDashboardBg from '../three/ThreeDashboardBg'

export default function Layout() {
  const [isPauseOpen, setIsPauseOpen] = useState(false)

  return (
    <div className="flex min-h-screen relative" style={{ backgroundColor: 'rgb(var(--rpg-bg))' }}>
      <ThreeDashboardBg />
      
      <div className="flex flex-col flex-1 min-w-0 w-full z-10 relative">
        <Navbar onMenuClick={() => setIsPauseOpen(true)} />
        <main className="flex-1 p-6 overflow-auto w-full max-w-[1600px] mx-auto">
          <Outlet />
        </main>
      </div>

      <PauseMenu isOpen={isPauseOpen} onClose={() => setIsPauseOpen(false)} />
    </div>
  )
}
