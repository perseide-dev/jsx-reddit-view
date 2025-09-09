import { Box, TextField, Button, Typography, Alert } from "@mui/material"
import { useState } from "react"
import { useAuth } from "@cg/context/AuthContext"
import { Link, useNavigate } from "react-router-dom"

export default function SessionLogin() {
  const { login, loading, error } = useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const ok = await login(email, password)
    if (ok) navigate("/dashboard")
  }

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <Typography variant="h5" fontWeight={600}>Iniciar sesión</Typography>
      <TextField
        label="Email"
        type="email"
        fullWidth
        value={email}
        onChange={e=>setEmail(e.target.value)}
        required
      />
      <TextField
        label="Contraseña"
        type="password"
        fullWidth
        value={password}
        onChange={e=>setPassword(e.target.value)}
        required
      />
      {error && <Alert severity="error" variant="outlined">{error}</Alert>}
      <Button type="submit" variant="contained" disabled={loading}>
        {loading ? "Ingresando..." : "Entrar"}
      </Button>
      <Typography variant="body2" sx={{ textAlign: "center" }}>
        ¿No tienes cuenta? <Link to="/register">Crear cuenta</Link>
      </Typography>
    </Box>
  )
}