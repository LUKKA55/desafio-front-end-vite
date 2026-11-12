import { useEffect, useState, type ReactNode } from "react"
import {
    Alert,
    Avatar,
    Box,
    Chip,
    Paper,
    Snackbar,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material"

import { DIAS_SEMANA, TURNOS } from "../../features/turmas/types"
import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded"
import Loading from "../components/loading"
import { useAtom } from "jotai"
import { loadMatriculasAtom } from "../../features/matriculas/service"

interface ResumoProps {
    titulo: string
    valor: number
    icone: ReactNode
}

const Resumo = ({ titulo, valor, icone }: ResumoProps) => (
    <Paper variant="outlined" sx={{ p: 2.5, display: "flex", alignItems: "center", gap: 2 }}>
        <Avatar variant="rounded" sx={{ bgcolor: "#eef2ff", color: "primary.main", width: 48, height: 48 }}>
            {icone}
        </Avatar>
        <Box>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
                {titulo}
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: 700 }}>
                {valor}
            </Typography>
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

const PortalAluno = () => {
    const [ erro, setErro ] = useState("")
    const [ isLoading, setIsLoading ] = useState<boolean>(false)

    const [ matriculasAtom, setMatriculasAtom ] = useAtom(loadMatriculasAtom)

    useEffect(() => {
        setIsLoading(true)
        Promise.all([setMatriculasAtom()])
            .catch((e) => setErro(e.message))
            .finally(() => setIsLoading(false))
            
    }, [ setMatriculasAtom ])

    return (
        <Box>
            <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={2}
                sx={{ justifyContent: "space-between", alignItems: { xs: "stretch", sm: "center" }, mb: 4 }}
            >
                <Box>
                    <Typography variant="h4">Portal do Aluno</Typography>
                    <Typography sx={{ color: "text.secondary" }}>
                        Matrículas, disciplinas e grade de horário
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
                    titulo="Matriculadas"
                    valor={matriculasAtom?.length ?? 0}
                    icone={<SchoolRoundedIcon />}
                />
            </Box>

            <TableContainer component={Paper} variant="outlined">
                <Table sx={{ whiteSpace: "nowrap" }}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Disciplina</TableCell>
                            <TableCell>Professor</TableCell>
                            <TableCell>Horário</TableCell>
                            <TableCell>Semestre</TableCell>
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
                                        <TableCell>{matricula.semestre}</TableCell>
                                    </TableRow>
                                )
                            })
                        }
                    </TableBody>
                </Table>
            </TableContainer>
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

export default PortalAluno