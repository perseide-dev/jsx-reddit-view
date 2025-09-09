import { Box } from "@mui/material";
import NavBar from "../global/navBar/NavBar";
import { Outlet } from "react-router-dom"

export default function Landing() {
    return (
        <Box>
            <NavBar/>
            <Box>
                <Outlet />
            </Box>
        </Box>
    )
}