import { Box, Typography, Button } from "@mui/material";

export default function LandingHome() {
    return (
        <Box
            sx={{
                minHeight: "60vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                background: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)",
                color: "#fff",
                borderRadius: 4,
                boxShadow: 4,
                p: 6,
                mt: 4,
            }}
        >
            <Typography variant="h2" fontWeight={700} gutterBottom>
                Bienvenido a Reddit View
            </Typography>
            <Typography variant="h6" sx={{ mb: 3, maxWidth: 500, textAlign: "center" }}>
                Explora los mejores posts de Reddit con una interfaz moderna y rápida. ¡Descubre, comparte y disfruta!
            </Typography>
            <Button
                variant="contained"
                size="large"
                sx={{
                    background: "linear-gradient(90deg, #ff512f 0%, #dd2476 100%)",
                    color: "#fff",
                    fontWeight: 600,
                    px: 4,
                    py: 1.5,
                    borderRadius: 2,
                    boxShadow: 2,
                    "&:hover": {
                        background: "linear-gradient(90deg, #dd2476 0%, #ff512f 100%)",
                    },
                }}
            >
                Empezar ahora
            </Button>
        </Box>
    );
}
