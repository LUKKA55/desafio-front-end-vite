import { useEffect, useState } from "react"
import {
    AppBar,
    Avatar,
    Box,
    Drawer,
    IconButton,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Toolbar,
    Typography,
    useMediaQuery,
    useTheme,
} from "@mui/material"
import ClassRoundedIcon from "@mui/icons-material/ClassRounded"
import HomeRoundedIcon from "@mui/icons-material/HomeRounded"
import MenuRoundedIcon from "@mui/icons-material/MenuRounded"
import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded"
import { NavLink, Outlet } from "react-router"
import { useAtom } from "jotai"
import { loadUserAtom } from "../../../features/user/service"

const LARGURA_MENU = 260

const itensMenu = [
    { texto: "Início", rota: "/", icone: <HomeRoundedIcon /> },
    { texto: "Turmas", rota: "/turmas", icone: <ClassRoundedIcon /> },
]

const LayoutPage = () => {
    const theme = useTheme()
    const telaPequena = useMediaQuery(theme.breakpoints.down("md"))
    const [menuAberto, setMenuAberto] = useState(false)
    const [ userAtom, setUserAtom ] = useAtom(loadUserAtom)

    useEffect(() => {
        setUserAtom()
    }, [ setUserAtom ])

    const menu = (
        <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, px: 3, py: 3 }}>
                <Avatar variant="rounded" sx={{ bgcolor: "primary.main", width: 40, height: 40 }}>
                    <SchoolRoundedIcon />
                </Avatar>
                <Box>
                    <Typography sx={{ fontWeight: 700, lineHeight: 1.2 }}>Matrículas</Typography>
                    <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.6)" }}>
                        Sistema acadêmico
                    </Typography>
                </Box>
            </Box>

            <Typography variant="overline" sx={{ px: 3, color: "rgba(255,255,255,0.45)" }}>
                Instituição
            </Typography>

            <List sx={{ px: 1.5 }}>
                {itensMenu.map((item) => (
                    <ListItemButton
                        key={item.rota}
                        component={NavLink}
                        to={item.rota}
                        end={item.rota === "/"}
                        onClick={() => setMenuAberto(false)}
                        sx={{
                            borderRadius: 2,
                            mb: 0.5,
                            color: "rgba(255,255,255,0.75)",
                            "&:hover": { bgcolor: "rgba(255,255,255,0.08)" },
                            "&.active": { bgcolor: "primary.main", color: "#fff" },
                            "&.active:hover": { bgcolor: "primary.dark" },
                        }}
                    >
                        <ListItemIcon sx={{ color: "inherit", minWidth: 40 }}>{item.icone}</ListItemIcon>
                        <ListItemText primary={item.texto} />
                    </ListItemButton>
                ))}
            </List>

            <Box sx={{ mt: "auto", p: 2 }}>
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1.5,
                        p: 1.5,
                        borderRadius: 2,
                        bgcolor: "rgba(255,255,255,0.06)",
                    }}
                >
                    <Avatar sx={{ width: 36, height: 36, bgcolor: "#334155", fontSize: 14 }}>AD</Avatar>
                    <Box>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                            {userAtom?.perfil}
                        </Typography>
                        <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.6)" }}>
                            Visão institucional
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </Box>
    )

    return (
        <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "background.default" }}>
            {telaPequena && (
                <AppBar
                    position="fixed"
                    color="inherit"
                    elevation={0}
                    sx={{ borderBottom: 1, borderColor: "divider" }}
                >
                    <Toolbar>
                        <IconButton edge="start" onClick={() => setMenuAberto(true)} sx={{ mr: 1 }}>
                            <MenuRoundedIcon />
                        </IconButton>
                        <Typography sx={{ fontWeight: 700 }}>Matrículas</Typography>
                    </Toolbar>
                </AppBar>
            )}

            <Drawer
                variant={telaPequena ? "temporary" : "permanent"}
                open={telaPequena ? menuAberto : true}
                onClose={() => setMenuAberto(false)}
                sx={{
                    width: telaPequena ? undefined : LARGURA_MENU,
                    flexShrink: 0,
                    "& .MuiDrawer-paper": {
                        width: LARGURA_MENU,
                        boxSizing: "border-box",
                        bgcolor: "#0f172a",
                        color: "#fff",
                        border: "none",
                    },
                }}
            >
                {menu}
            </Drawer>

            <Box
                component="main"
                sx={{ flexGrow: 1, minWidth: 0, px: { xs: 2, md: 4 }, pt: { xs: 10, md: 4 }, pb: 4 }}
            >
                <Box sx={{ maxWidth: 1200, mx: "auto" }}>
                    <Outlet />
                </Box>
            </Box>
        </Box>
    )
}

export default LayoutPage
