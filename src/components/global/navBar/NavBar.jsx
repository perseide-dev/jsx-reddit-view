import { Box, Button } from '@mui/material'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import { useAuth } from '@cg/context/AuthContext'

export default function NavBar() {
  const { isAuthenticated, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <Box sx={{
      width: '100%',
      boxSizing: 'border-box',
      p: 2,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: 2
    }}>
      <Button component={RouterLink} to='/' variant="contained">
        Home
      </Button>

      <Box sx={{ display: 'flex', gap: 1 }}>
        {!isAuthenticated && (
          <>
            <Button component={RouterLink} to='/login' variant="outlined">
              Login
            </Button>
            <Button component={RouterLink} to='/register' variant="contained" color="secondary">
              Register
            </Button>
          </>
        )}
        {isAuthenticated && (
          <>
            <Button component={RouterLink} to='/dashboard' variant="contained">
              Dashboard
            </Button>
            <Button onClick={handleLogout} variant="outlined" color="error">
              Logout
            </Button>
          </>
        )}
      </Box>
    </Box>
  )
}