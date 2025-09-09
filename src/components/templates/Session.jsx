import { Box, Typography, Button } from "@mui/material"
import { Outlet, Link as RouterLink } from "react-router-dom"

const gradientBg = `
  radial-gradient(80rem 40rem at 20% 10%, rgba(255,82,82,.18), transparent 60%),
  radial-gradient(70rem 40rem at 90% 40%, rgba(124,240,255,.12), transparent 60%),
  radial-gradient(60rem 30rem at 10% 90%, rgba(255,140,0,.10), transparent 60%),
  linear-gradient(180deg, #0a0b0f 0%, #090a0f 100%)
`

export default function Session() {
  return (
    <Box sx={{
      minHeight: "100vh",
      width: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: gradientBg,
      px: 2,
      py: { xs: 6, md: 10 }
    }}>
      <Box sx={{
        width: "100%",
        maxWidth: 460,
        bgcolor: "rgba(15,17,23,.85)",
        backdropFilter: "blur(12px)",
        border: "1px solid rgba(255,255,255,0.08)",
        p: { xs: 4, md: 5 },
        borderRadius: 5,
        boxShadow: "0 10px 40px -10px rgba(0,0,0,.6)"
      }}>
                <Button
          component={RouterLink}
          to="/"
            variant="text"
          size="small"
          sx={{
            mb: 1,
            px: 0,
            minWidth: 'auto',
            fontWeight: 500,
            color: "secondary.main",
            textTransform: "none",
            '&:hover': { color: 'primary.main', background: 'transparent' }
          }}
        >
          ← Volver al inicio
        </Button>
        <Typography variant="h4" fontWeight={700} mb={3} sx={{
          textAlign: "center",
          background: "linear-gradient(90deg,#ff5252,#7cf0ff)",
          WebkitBackgroundClip: "text",
          color: "transparent",
          letterSpacing: ".5px"
        }}>
          Redly
        </Typography>
        <Outlet />
      </Box>
    </Box>
  )
}

