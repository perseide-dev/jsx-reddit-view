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

// ...existing code...
function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Landing (público) */}
          <Route element={<Landing />}>
            <Route index element={<LandingHome />} />
          </Route>

            {/* Session (login / register) */}
          <Route element={<Session />}>
            <Route path='login' element={<SessionLogin />} />
            <Route path='register' element={<SessionRegister />} />
          </Route>

          {/* Dashboard protegido */}
          
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
