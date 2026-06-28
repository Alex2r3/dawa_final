import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { lazy, Suspense } from 'react'

import Layout    from '../components/layout/Layout'
import SkeletonLoader from '../components/ui/SkeletonLoader'

const AuthPage     = lazy(() => import('../pages/AuthPage'))
const Dashboard    = lazy(() => import('../pages/Dashboard'))
const Worlds       = lazy(() => import('../pages/Worlds'))
const Levels       = lazy(() => import('../pages/Levels'))
const Challenge    = lazy(() => import('../pages/Challenge'))
const Achievements = lazy(() => import('../pages/Achievements'))
const Profile      = lazy(() => import('../pages/Profile'))
const Ranking      = lazy(() => import('../pages/Ranking'))
const Statistics   = lazy(() => import('../pages/Statistics'))
const NotFound     = lazy(() => import('../pages/NotFound'))

function PrivateRoute({ children }) {
  const { user, loading } = useAuth()
  if (loading) return <SkeletonLoader fullPage />
  return user ? children : <Navigate to="/login" replace />
}

function PublicRoute({ children }) {
  const { user, loading } = useAuth()
  if (loading) return <SkeletonLoader fullPage />
  return user ? <Navigate to="/" replace /> : children
}

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Suspense fallback={<SkeletonLoader fullPage />}>
        <Routes>
          {/* Public routes */}
          <Route path="/login"    element={<PublicRoute><AuthPage defaultMode="login" /></PublicRoute>} />
          <Route path="/register" element={<PublicRoute><AuthPage defaultMode="register" /></PublicRoute>} />

          {/* Protected routes inside Layout */}
          <Route path="/" element={<PrivateRoute><Layout /></PrivateRoute>}>
            <Route index                        element={<Dashboard />} />
            <Route path="worlds"                element={<Worlds />} />
            <Route path="worlds/:worldId"       element={<Levels />} />
            <Route path="challenge/:levelId"    element={<Challenge />} />
            <Route path="achievements"          element={<Achievements />} />
            <Route path="profile"               element={<Profile />} />
            <Route path="ranking"               element={<Ranking />} />
            <Route path="stats"                 element={<Statistics />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
