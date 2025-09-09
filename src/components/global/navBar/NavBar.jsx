import { Box, Button } from '@mui/material'
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '@cg/context/AuthContext'


export default function NavBar() {
  const { isAuthenticated, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const isActive = (path, { startsWith = false } = {}) => {
    if (startsWith) return location.pathname.startsWith(path)
    return location.pathname === path
  }

  const btnStyle = (path, opts) => {
    const active = isActive(path, opts)
    return {
      variant: active ? 'contained' : 'outlined',
      color: active ? 'secondary' : 'primary',
      sx: {
        fontWeight: active ? 700 : 500,
        boxShadow: active ? 4 : 'none',
        transition: 'all .25s',
        '&:hover': {
          boxShadow: active ? 6 : '0 0 0 1px rgba(255,255,255,.15)'
        }
      }
    }
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
      <Button
        component={RouterLink}
        to='/'
        {...btnStyle('/')}
      >
        Home
      </Button>

      <Box sx={{ display: 'flex', gap: 1 }}>
        {!isAuthenticated && (
          <>
            <Button
              component={RouterLink}
              to='/login'
              {...btnStyle('/login')}
            >
              Login
            </Button>
            <Button
              component={RouterLink}
              to='/register'
              {...btnStyle('/register')}
            >
              Register
            </Button>
          </>
        )}
        {isAuthenticated && (
          <>
            <Button
              component={RouterLink}
              to='/dashboard'
              {...btnStyle('/dashboard', { startsWith: true })}
            >
              Dashboard
            </Button>
            <Button
              onClick={handleLogout}
              variant="outlined"
              color="error"
              sx={{ fontWeight: 600 }}
            >
              Logout
            </Button>
          </>
        )}
      </Box>
    </Box>
  )
}
