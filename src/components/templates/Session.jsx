import { Box } from "@mui/material"
import { Outlet } from "react-router-dom"

export default function Session() {
  return (
    <Box sx={{
      minHeight: "100vh",
      width: "100vw",
      boxSizing: "border-box",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      bgcolor: "#f5f5f5",
      p: 2
    }}>
      <Box sx={{
        width: "100%",
        maxWidth: 420,
        bgcolor: "#fff",
        p: 4,
        borderRadius: 4,
        boxShadow: 3
      }}>
        <Outlet />
      </Box>
    </Box>
  )
}
