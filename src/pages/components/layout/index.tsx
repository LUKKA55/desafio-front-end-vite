import { Box } from "@mui/material";
import { Outlet } from "react-router";

const LayoutPage = () => {
    return (
        <Box>
            <Box>
                Layout
            </Box>

            <Outlet />
        </Box>
    )
}

export default LayoutPage