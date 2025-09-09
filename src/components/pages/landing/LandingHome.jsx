import {
  Box, Container, Typography, Stack, IconButton, Button,
  TextField, Grid, Card, CardContent, CardActions, Chip, Link as MuiLink
} from "@mui/material";
import { Reddit, Twitter, GitHub, KeyboardArrowDown } from "@mui/icons-material";

export default function LandingHome() {
    return (
    <Box
      id="hero"
      sx={{
        position: "relative",
        minHeight: { xs: "85vh", md: "92vh" },
        display: "grid",
        placeItems: "center",
        overflow: "hidden",
        // Fondo: degradados superpuestos para emular el look de la imagen
        background:
          "radial-gradient(80rem 40rem at 20% 10%, rgba(255,82,82,.18), transparent 60%)," +
          "radial-gradient(70rem 40rem at 90% 40%, rgba(124,240,255,.12), transparent 60%)," +
          "radial-gradient(60rem 30rem at 10% 90%, rgba(255,140,0,.10), transparent 60%)," +
          "linear-gradient(180deg, #0a0b0f 0%, #090a0f 100%)",
      }}
    >
      {/* marca y claim */}
      <Container maxWidth="lg" sx={{ textAlign: "center" }}>
        <Typography variant="h1" sx={{ fontSize: { xs: 56, sm: 70, md: 96 }, lineHeight: 1.02 }}>
          RED<span style={{ color: "#ff5252" }}>LY</span>
        </Typography>
        <Typography
          variant="h2"
          sx={{ fontSize: { xs: 26, md: 42 }, letterSpacing: ".04em", mt: 1 }}
        >
          La nueva forma de leer <span style={{ color: "#7cf0ff" }}>Reddit</span>
        </Typography>
        <Typography variant="subtitle1" sx={{ mt: 2, maxWidth: 720, mx: "auto", opacity: .8 }}>
          Una interfaz minimalista y ultrarrápida para explorar los mejores posts.
          Búsqueda instantánea, atajos de teclado y guardados en un solo lugar.
        </Typography>

        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          sx={{ justifyContent: "center", mt: 4 }}
        >
          <Button
            variant="outlined"
            size="large"
            href="https://www.reddit.com"
            target="_blank"
            rel="noreferrer"
          >
            ¿Qué es Reddit?
          </Button>
        </Stack>
      </Container>


      {/* redes / enlaces */}
      <Stack
        direction="column"
        spacing={1}
        sx={{ position: "absolute", right: { xs: 6, sm: 12 }, bottom: 20 }}
      >
        <IconButton size="small" color="inherit" aria-label="Twitter/X" href="https://twitter.com" target="_blank">
          <Twitter fontSize="small" />
        </IconButton>
        <IconButton size="small" color="inherit" aria-label="Reddit" href="https://reddit.com" target="_blank">
          <Reddit fontSize="small" />
        </IconButton>
        <IconButton size="small" color="inherit" aria-label="GitHub" href="https://github.com" target="_blank">
          <GitHub fontSize="small" />
        </IconButton>
      </Stack>
    </Box>
  );
}
