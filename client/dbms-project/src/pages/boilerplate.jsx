import { Outlet } from "react-router-dom"
import { Container } from '@mui/material';
import Navbar from "../components/navbar"

export default function PrivateRoute(){
    return (
        <>
            <Navbar />
            <Container>
                <Outlet />
            </Container>
            {/* <Box component="main" sx={{ display: 'flex' }}>
                <Drawer />
                <Outlet sx={{flexGrow: 1}}/>
            </Box> */}
        </>
    )
}