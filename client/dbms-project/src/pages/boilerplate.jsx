import { Outlet } from "react-router-dom"
import { Container } from '@mui/material';
import Navbar from "../components/navbar"

export default function PrivateRoute(){
    return (
        <>
            <Navbar />
            <Toolbar />
            <Container>
                <Outlet />
            </Container>
            <Toolbar />
            {/* <Box component="main" sx={{ display: 'flex' }}>
                <Drawer />
                <Outlet sx={{flexGrow: 1}}/>
            </Box> */}
        </>
    )
}