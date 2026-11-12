import React, { useEffect, useState } from "react"
import {
    AppBar,
    Avatar,
    Box,
    Button,
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
import BadgeRoundedIcon from "@mui/icons-material/BadgeRounded"
import ClassRoundedIcon from "@mui/icons-material/ClassRounded"
import HomeRoundedIcon from "@mui/icons-material/HomeRounded"
import PersonRoundedIcon from "@mui/icons-material/PersonRounded"
import MenuRoundedIcon from "@mui/icons-material/MenuRounded"
import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded"
import { NavLink, Outlet, useNavigate } from "react-router"
import { useAtom } from "jotai"
import { loadUserAtom, logout, userAtom } from "../../../features/user/service"
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded"
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded"
import MenuBookRoundedIcon from "@mui/icons-material/MenuBookRounded"
import { resetTudoAtom } from "../../../features/utils/resetAtom"
import { RESET } from "jotai/utils"

const LARGURA_MENU = 260

const itensMenu = [
    { texto: "Início", rota: "/", icone: <HomeRoundedIcon /> },
    { texto: "Turmas", rota: "/turmas", icone: <ClassRoundedIcon />, onlyAdmin: true },
    { texto: "Professores", rota: "/professores", icone: <PersonRoundedIcon />, onlyAdmin: true },
    { texto: "Alunos", rota: "/alunos", icone: <BadgeRoundedIcon />, onlyAdmin: true },
    { texto: "Portal do Aluno", rota: "/portal-aluno-father", icone: <SchoolRoundedIcon />,
        subMenus: [
            { texto: "Início Aluno", rota: "/portal-aluno", icone: <HomeRoundedIcon /> },
            { texto: "Disciplinas Ofertadas", rota: "/portal-aluno/disciplinas", icone: <MenuBookRoundedIcon /> },
            { texto: "Minhas Matrículas", rota: "/portal-aluno/matriculas", icone: <CheckCircleRoundedIcon /> },
            { texto: "Minha Grade", rota: "/portal-aluno/grade", icone: <CalendarMonthRoundedIcon /> },
        ] },
]

const LayoutPage = () => {
    const theme = useTheme()
    const telaPequena = useMediaQuery(theme.breakpoints.down("md"))
    const [menuAberto, setMenuAberto] = useState(false)
    const [ userStateAtom, setUserStateAtom ] = useAtom(loadUserAtom)
    const [ __, setReset ] = useAtom(userAtom)

    const [ _, setResetAtom ] = useAtom(resetTudoAtom)
    const navigate = useNavigate()

    useEffect(() => {
        setUserStateAtom()
    }, [ setUserStateAtom ])

    const avatarUser = userStateAtom?.userName
        .split(" ")
        .map(un => un[0].toUpperCase())
        .join()

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
                {
                    !!userStateAtom &&
                    itensMenu.map((item) => {
                        if(item.onlyAdmin && !userStateAtom.isAdmin)
                            return

                        return <React.Fragment
                            key={item.rota}
                        >
                            <ListItemButton
                                component={NavLink}
                                to={!!item.subMenus ? item.subMenus[0].rota : item.rota}
                                onClick={() => setMenuAberto(false)}
                                sx={{
                                    borderRadius: 2,
                                    mb: 0.5,
                                    color: "rgba(255,255,255,0.75)",
                                    pl: 2,
                                    "&:hover": { bgcolor: "rgba(255,255,255,0.08)" },
                                    "&.active": { bgcolor: "primary.main", color: "#fff" },
                                    "&.active:hover": { bgcolor: "primary.dark" },
                                }}
                            >
                                <ListItemIcon sx={{ color: "inherit", minWidth: 40 }}>{item.icone}</ListItemIcon>
                                <ListItemText primary={item.texto} />
                            </ListItemButton>
                            {
                                !!item.subMenus &&
                                <List>
                                    {           
                                        item.subMenus?.map(sm => {
                                            return (
                                                <ListItemButton
                                                    key={sm.rota}
                                                    component={NavLink}
                                                    to={sm.rota}
                                                    end={sm.rota === item.subMenus![0].rota}
                                                    onClick={() => setMenuAberto(false)}
                                                    sx={{
                                                        borderRadius: 2,
                                                        mb: 0.5,
                                                        pl: 6,
                                                        color: "rgba(255,255,255,0.75)",
                                                        "&:hover": { bgcolor: "rgba(255,255,255,0.08)" },
                                                        "&.active": { bgcolor: "primary.main", color: "#fff" },
                                                        "&.active:hover": { bgcolor: "primary.dark" },
                                                    }}
                                                >
                                                    <ListItemIcon sx={{ color: "inherit", minWidth: 40 }}>{sm.icone}</ListItemIcon>
                                                    <ListItemText primary={sm.texto}  sx={{ fontSize: "0.9rem" }} />
                                                </ListItemButton>
                                            )
                                        })
                                    }
                                </List>
                            }
                        </React.Fragment>
                    })
                }
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
                    <Avatar sx={{ width: 36, height: 36, bgcolor: "#334155", fontSize: 14 }}>
                        {avatarUser}
                    </Avatar>
                    <Box>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                            {userStateAtom?.perfil}
                        </Typography>
                        <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.6)" }}>
                            {userStateAtom?.isAdmin ? "Visão institucional" : userStateAtom?.userName }
                        </Typography>
                    </Box>
                </Box>
                <Box
                    sx={{
                        mt: 1,
                        display: "flex",
                        justifyContent: "center"
                    }}
                >
                    <Button 
                        onClick={async() => {
                            await logout()
                            setResetAtom()
                            setReset(RESET)
                            navigate("/login")
                        }}  
                    >
                        Sair
                    </Button>
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
