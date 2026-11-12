import { Alert, Avatar, Box, Button, Chip, Paper, Snackbar, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"
import { useAtom } from "jotai"
import { loadUserAtom } from "../../features/user/service"
import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react"
import Loading from "../components/loading"
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import { loadMatriculasAtom } from "../../features/matriculas/service"
import { loadTurmaAtom } from "../../features/turmas/service"
import { type Turno, type DiaSemana, DIAS_SEMANA, TURNOS } from "../../features/turmas/types"
import type { IAlunoMatricula } from "../../features/matriculas/types"
import { useNavigate } from "react-router"

interface ResumoProps {
    titulo: ReactNode
    valor?: ReactNode
    icone: ReactNode
    onClick?: () => void
}

const Resumo = ({ titulo, valor, icone, onClick }: ResumoProps) => (
    <Paper 
        variant="outlined" 
        sx={{ 
            p: 2.5, 
            display: "flex", 
            alignItems: "center", 
            gap: 2,  
            ...(onClick && {
                "&:hover": {
                    backgroundColor: "action.hover",
                },
            }),
            cursor: onClick ? "pointer" : "auto"
        }} 
        onClick={onClick}
    >
        <Avatar variant="rounded" sx={{ bgcolor: "#eef2ff", color: "primary.main", width: 48, height: 48 }}>
            {icone}
        </Avatar>
        <Box>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
                {titulo}
            </Typography>
            {
                !!valor &&
                <Typography variant="h5" sx={{ fontWeight: 700 }}>
                    {valor}
                </Typography>
            }
        </Box>
    </Paper>
)

const iniciais = (nome: string) =>
    nome
        .split(" ")
        .map((parte) => parte[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()

const Home = () => {
    const [ erro, setErro ] = useState("")
    const [ isLoading, setIsLoading ] = useState<boolean>(false)
    const [ matriculasAtom, setMatriculasAtom ] = useAtom(loadMatriculasAtom)
    const [ turmasAtom, setTurmasAtom ] = useAtom(loadTurmaAtom)

    const [ userAtom, setUserAtom ] = useAtom(loadUserAtom)
    const navigate = useNavigate()


    useEffect(() => {
        setIsLoading(true)
        Promise.all([setUserAtom(), setMatriculasAtom(), setTurmasAtom()])
            .catch((e) => setErro(e.message))
            .finally(() => setIsLoading(false))

    }, [ setUserAtom ])

    const nextClass  = useCallback(()  => {
        const getTurno = () => {
            const hora = new Date().getHours()

            if(hora < 12)
                return 1 as Turno

            if(hora > 12 && hora < 16)
                return 2 as Turno

            return 3 as Turno
        }
        const matriculasLength = matriculasAtom?.length

        if(!matriculasLength)
            return

        const dia = (new Date().getDay() || 1) + 1 as DiaSemana
        const turno = getTurno()

        const matriculasOrdenadas = matriculasAtom
            ?.sort((a, b) => a.turno - b.turno)
            ?.sort((a, b) => a.diaSemana - b.diaSemana)

        const verify = (matriculas: IAlunoMatricula[], idx: number) => {
            const diaMatri = matriculas[idx].diaSemana
            const turnoMatri = matriculas[idx].turno

            if(diaMatri >= dia && turnoMatri > turno) // Mesmo dia ou proximo, turno tem q ser maior a o atual
                return `${DIAS_SEMANA[diaMatri]} - ${TURNOS[turnoMatri]}`

            let descricao : string = ""

            if((idx + 1) < matriculasLength)
                descricao = verify(matriculas, (idx + 1)) as string

            if(descricao)
                return descricao

            if(idx === 0) // Não tem aula no dia e nem nos proximos da semana, pega a primeira aula 
                return `${DIAS_SEMANA[diaMatri]} - ${TURNOS[turnoMatri]}`
        }

        return verify(matriculasOrdenadas as IAlunoMatricula[], 0)

    }, [ matriculasAtom ])
    
    return (
        <Box>
            <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={2}
                sx={{ justifyContent: "space-between", alignItems: { xs: "stretch", sm: "center" }, mb: 4 }}
            >
                <Box>
                    <Typography variant="h4">Olá, {userAtom?.userName?.split("@")[0]}</Typography>
                    <Typography sx={{ color: "text.secondary" }}>
                        Resumo da sua vida acadêmica
                    </Typography>
                </Box>
            </Stack>
             <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: {
                        xs: "1fr",
                        sm: "repeat(4, 1fr)"
                    },
                    gap: 2,
                    mb: 3
                }}
            >
                <Resumo
                    icone={<SchoolOutlinedIcon />}
                    titulo="Matriculadas"
                    valor={matriculasAtom?.length ?? 0}
                />
                <Resumo
                    icone={<MenuBookOutlinedIcon />}
                    titulo="Disciplinas Ofertadas"
                    valor={turmasAtom?.length ?? 0}
                />
                <Resumo
                    icone={<CalendarTodayOutlinedIcon />}
                    titulo="Próxima Aula"
                    valor={nextClass()}
                />
            </Box>
            <Box
                sx={{
                    display: "flex",
                    gap: 2
                }}
            >
                <TableContainer component={Paper} variant="outlined">
                    <Table sx={{ whiteSpace: "nowrap" }}>
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    <Typography variant="h6" sx={{ color: "black", fontWeight: 700 }}>
                                        Aulas
                                    </Typography>
                                </TableCell>
                                <TableCell/>
                                <TableCell align="right"> 
                                    <Button 
                                        variant="text"
                                        onClick={() => {
                                            navigate("/portal-aluno/grade")
                                        }}
                                    >
                                        Ver Grade Completa
                                    </Button>
                                </TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {
                                !!matriculasAtom?.length &&
                                matriculasAtom.map((matricula) => {
                                    return (
                                        <TableRow key={matricula.id} hover>
                                            <TableCell>
                                                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                                    {matricula.disciplina}
                                                </Typography>
                                                <Typography variant="caption" sx={{ color: "text.secondary" }}>
                                                    {matricula.codDisciplina}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
                                                    <Avatar sx={{ width: 32, height: 32, fontSize: 13, bgcolor: "#c7d2fe", color: "#3730a3" }}>
                                                        {matricula.professor ? iniciais(matricula.professor) : "?"}
                                                    </Avatar>
                                                    <Typography variant="body2">{matricula.professor ?? "-"}</Typography>
                                                </Stack>
                                            </TableCell>
                                            <TableCell>
                                                <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
                                                    <Chip
                                                        label={`${matricula.diaSemana}${matricula.turno}`}
                                                        size="small"
                                                        color="primary"
                                                        sx={{ fontWeight: 700 }}
                                                    />
                                                    <Typography variant="body2">
                                                        {DIAS_SEMANA[matricula.diaSemana]} · {TURNOS[matricula.turno]}
                                                    </Typography>
                                                </Stack>
                                            </TableCell>
                                        </TableRow>
                                    )
                                })
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
                <Paper variant="outlined" sx={{ p: 2.5,  }}>
                     <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                        Acesso Rápido
                    </Typography>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 2
                        }}
                    >
                        <Resumo
                            icone={<MenuBookOutlinedIcon />}
                            titulo="Disciplinas Ofertadas"
                            onClick={() => {
                                navigate("/portal-aluno/disciplinas")
                            }}
                        />
                        <Resumo
                            icone={<SchoolOutlinedIcon />}
                            titulo="Minhas Matrículas"
                            onClick={() => {
                                navigate("/portal-aluno/matriculas")
                            }}
                        />
                    </Box>
                </Paper>
            </Box>
            <Snackbar
                open={!!erro}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                autoHideDuration={5000}
                onClose={() => setErro("")}
            >
                <Alert severity="error" variant="filled" onClose={() => setErro("")}>
                    {erro}
                </Alert>
            </Snackbar>
            <Loading isLoading={isLoading} />
        </Box>
    )
}

export default Home