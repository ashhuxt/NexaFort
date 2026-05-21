import { lazy, Suspense } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { AuthProvider, useAuth } from './context/AuthContext'
import Login from './pages/Login'
import Register from './pages/Register'
import AppLayout from './components/AppLayout'

const Overview = lazy(() => import('./pages/Overview'))
const Dashboard = lazy(() => import('./pages/Dashboard'))
const Insights = lazy(() => import('./pages/Insights'))
const Roadmap = lazy(() => import('./pages/Roadmap'))
const Settings = lazy(() => import('./pages/Settings'))

function FullScreenLoader() {
  return (
    <div className="min-h-screen cosmic-bg flex items-center justify-center">
      <motion.div
        className="panel p-8 text-center"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
      >
        <div className="orb mx-auto mb-4" />
        <p className="tracking-wide text-dim">Loading your workspace...</p>
      </motion.div>
    </div>
  )
}

function RouteLoader() {
  return (
    <div className="panel p-6 md:p-8 text-center">
      <div className="orb mx-auto mb-4 h-12 w-12" />
      <p className="text-sm tracking-wide text-dim">Loading page module...</p>
    </div>
  )
}

function PrivateRoute({ children }) {
  const { user, loading } = useAuth()
  if (loading) return <FullScreenLoader />
  return user ? children : <Navigate to="/login" replace />
}

function PublicRoute({ children }) {
  const { user } = useAuth()
  return user ? <Navigate to="/app/overview" replace /> : children
}

function AnimatedAppRoutes() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.28, ease: 'easeOut' }}
      >
        <Routes location={location}>
          <Route path="/" element={<Navigate to="/app/overview" replace />} />
          <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
          <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />

          <Route
            path="/app"
            element={<PrivateRoute><AppLayout /></PrivateRoute>}
          >
            <Route index element={<Navigate to="overview" replace />} />
            <Route path="overview" element={<Suspense fallback={<RouteLoader />}><Overview /></Suspense>} />
            <Route path="projects" element={<Suspense fallback={<RouteLoader />}><Dashboard /></Suspense>} />
            <Route path="insights" element={<Suspense fallback={<RouteLoader />}><Insights /></Suspense>} />
            <Route path="roadmap" element={<Suspense fallback={<RouteLoader />}><Roadmap /></Suspense>} />
            <Route path="settings" element={<Suspense fallback={<RouteLoader />}><Settings /></Suspense>} />
          </Route>

          <Route path="*" element={<Navigate to="/app/overview" replace />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <AnimatedAppRoutes />
    </AuthProvider>
  )
}
