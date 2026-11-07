import { Box, CircularProgress } from "@mui/material"

const Loading = ({ isLoading }: { isLoading: boolean }) => 
    <>
        {
            isLoading &&
            <Box 
                sx={{
                    position: "absolute",
                    width: "100vw",
                    translate: "-50% -50%",
                    left: "50%",
                    top: "50%",
                    height: "100vh",
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                }}
            >
                <CircularProgress color="primary" />
            </Box>
        }
    </>

export default Loading