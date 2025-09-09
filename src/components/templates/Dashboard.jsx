import { Box, Typography } from '@mui/material'
import { Outlet } from 'react-router-dom'
import NavBar from '../global/navBar/NavBar'

export default function Dashboard() {
  return (
    <Box >
      <NavBar />
      <Outlet />
    </Box>
  )
}