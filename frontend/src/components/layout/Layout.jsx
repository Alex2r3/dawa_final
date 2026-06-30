import { Outlet } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Navbar from './Navbar'
import PauseMenu from './PauseMenu'
import ThreeDashboardBg from '../three/ThreeDashboardBg'

export default function Layout() {
  const [isPauseOpen, setIsPauseOpen] = useState(false)
  const [isMuted, setIsMuted] = useState(() => {
    return localStorage.getItem('cq_music_muted') === 'true'
  })

  useEffect(() => {
    const audio = window.ambientAudio
    if (!audio) return

    if (!isMuted) {
      const playAudio = () => {
        audio.play().catch(() => {
          console.log('Autoplay blocked. Click anywhere to play ambient music.')
        })
      }
      playAudio()
      
      document.addEventListener('click', playAudio, { once: true })
      return () => {
        document.removeEventListener('click', playAudio)
      }
    } else {
      audio.pause()
    }
    localStorage.setItem('cq_music_muted', isMuted)
  }, [isMuted])

  return (
    <div className="flex min-h-screen relative" style={{ backgroundColor: 'rgb(var(--rpg-bg))' }}>
      <ThreeDashboardBg />
      
      <div className="flex flex-col flex-1 min-w-0 w-full z-10 relative">
        <Navbar 
          onMenuClick={() => setIsPauseOpen(true)} 
          isMuted={isMuted} 
          onMuteToggle={() => setIsMuted(prev => !prev)} 
        />
        <main className="flex-1 p-6 overflow-auto w-full max-w-[1600px] mx-auto">
          <Outlet />
        </main>
      </div>

      <PauseMenu isOpen={isPauseOpen} onClose={() => setIsPauseOpen(false)} />
    </div>
  )
}
