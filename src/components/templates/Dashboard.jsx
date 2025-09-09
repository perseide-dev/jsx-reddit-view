import { Box, Typography } from '@mui/material'
import { Outlet } from 'react-router-dom'

export default function Dashboard() {
  return (
    <Box sx={{ p: 3, textAlign: 'left' }}>
      <Typography variant="h5" mb={2}>Dashboard</Typography>
      <Outlet />
    </Box>
  )
}