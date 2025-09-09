import { Box, TextField, Button, Typography, Alert } from "@mui/material"
import { useState } from "react"
import { useAuth } from "@cg/context/AuthContext"
import { Link, useNavigate } from "react-router-dom"

export default function SessionRegister() {
  const { register, loading, error } = useAuth()
  const [form, setForm] = useState({ username: "", password: "", confirm: "" })
  const [localError, setLocalError] = useState(null)
  const navigate = useNavigate()

  const handleChange = (field) => (e) => {
    setForm(f => ({ ...f, [field]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLocalError(null)
    if (form.password !== form.confirm) {
      setLocalError("Las contraseñas no coinciden")
      return
    }
    const res = await register({ username: form.username, password: form.password })
    if (res) navigate("/login")
  }

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <Typography variant="h5" fontWeight={600}>Crear cuenta</Typography>
      <TextField
        label="Usuario"
        type="text"
        fullWidth
        value={form.username}
        onChange={handleChange("username")}
        required
      />
      <TextField
        label="Contraseña"
        type="password"
        fullWidth
        value={form.password}
        onChange={handleChange("password")}
        required
      />
      <TextField
        label="Confirmar contraseña"
        type="password"
        fullWidth
        value={form.confirm}
        onChange={handleChange("confirm")}
        required
      />
      {(localError || error) && (
        <Alert severity="error" variant="outlined">
          {localError || error}
        </Alert>
      )}
      <Button type="submit" variant="contained" disabled={loading}>
        {loading ? "Registrando..." : "Registrar"}
      </Button>
      <Typography variant="body2" sx={{ textAlign: "center" }}>
        ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
      </Typography>
    </Box>
  )
}