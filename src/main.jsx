import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.jsx"
import "./index.css"
import axios from "axios"
import { ThemeProvider, createTheme, responsiveFontSizes, CssBaseline } from "@mui/material"
import { getToken, clearToken } from "@cu/auth/auth"

// Axios global
axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL?.replace(/\/+$/,'')
axios.defaults.timeout = 10000
axios.interceptors.request.use(cfg => {
  const token = getToken()
  if (token) cfg.headers.Authorization = `Bearer ${token}`
  return cfg
})
axios.interceptors.response.use(
  r => r,
  err => {
    if (err?.response?.status === 401) clearToken()
    return Promise.reject(err)
  }
)

// Tema MUI
let theme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#ff5252" },
    secondary: { main: "#7cf0ff" },
    background: { default: "#0a0b0f", paper: "#0f1117" }
  },
  typography: {
    fontFamily: "Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial",
    h1: { fontWeight: 800, letterSpacing: ".02em" },
    h2: { fontWeight: 700 },
    subtitle1: { opacity: .9 }
  },
  shape: { borderRadius: 14 }
})
theme = responsiveFontSizes(theme)

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>
)