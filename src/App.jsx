import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from '@cg/context/AuthContext'
import Landing from '@ct/Landing'
import Session from '@ct/Session'
import Dashboard from '@ct/Dashboard'
import ProtectedRoute from '@cu/auth/ProtectedRoute'
import LandingHome from '@ce/landing/LandingHome'
import SessionLogin from '@ce/session/SessionLogin'
import SessionRegister from '@ce/session/SessionRegister'
import PostDashboard from '@ce/dashboard/postDashboard'

// ...existing code...
function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route element={<Landing />}>
            <Route index element={<LandingHome />} />
          </Route>

          <Route element={<Session />}>
            <Route path='login' element={<SessionLogin />} />
            <Route path='register' element={<SessionRegister />} />
          </Route>

          <Route element={<ProtectedRoute />}>
            <Route path='dashboard' element={<Dashboard />}>
              <Route index element={<PostDashboard/>} />
            </Route>
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
