import { createTheme } from "@mui/material/styles"

const theme = createTheme({
    palette: {
        primary: { main: "#4f46e5" },
        error: { main: "#dc2626" },
        background: { default: "#f5f6fa", paper: "#ffffff" },
        text: { primary: "#1f2937", secondary: "#6b7280" },
        divider: "#e5e7eb",
    },
    shape: { borderRadius: 10 },
    typography: {
        fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
        h4: { fontWeight: 700 },
        h6: { fontWeight: 600 },
        button: { textTransform: "none", fontWeight: 600 },
    },
    components: {
        MuiButton: {
            defaultProps: { disableElevation: true },
        },
        MuiTableCell: {
            styleOverrides: {
                head: {
                    fontWeight: 600,
                    color: "#6b7280",
                    backgroundColor: "#f9fafb",
                },
            },
        },
    },
})

export default theme
