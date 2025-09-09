import { Button, Link, userNavigate } from "node_modules/@mui/material/index";
import { useAuth } from "@cg/context/AuthContext";

export default function NavBar() {
    const { isAuthenticated, user, logout } = useAuth();
    const navigate = userNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <Box sx={{
            width: '100vw',
            boxSizing: 'border-box',
            padding: '1rem',
            display: 'flex',
            justifyContent: 'space-between',
            gap: '1rem',
        }}>
            <Button component={Link} href='/' variant="contained" color="primary">
                Home
            </Button>
            {!isAuthenticated && (
                <>
                    <Button component={Link} href='/login' variant="contained" color="primary">
                        Login
                    </Button>
                    <Button component={Link} href='/register' variant="outlined" color="primary">
                        Register
                    </Button>
                </>
            )}
        </Box>
    );
}
