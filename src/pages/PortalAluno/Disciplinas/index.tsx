import {
    Alert,
    Avatar,
    Box,
    Button,
    Chip,
    Dialog,
    DialogActions,
    DialogTitle,
    IconButton,
    Paper,
    Snackbar,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Tooltip,
    Typography
} from "@mui/material"
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';

import { useEffect, useState } from "react"
import { loadDisciplinaAtom, loadTurmaAtom } from "../../../features/turmas/service"
import { loadProfessorAtom } from "../../../features/professores/service"
import { DIAS_SEMANA, TURNOS, type ITurma } from "../../../features/turmas/types"
import { loadMatriculasAtom, matricular } from "../../../features/matriculas/service";
import Loading from "../../components/loading";
import { useAtom } from "jotai";
import { loadUserAtom } from "../../../features/user/service";

const iniciais = (nome: string) =>
    nome
        .split(" ")
        .map((parte) => parte[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()

const PortalAlunoDisciplinas = () => {
    const [ erro, setErro ] = useState("")
    const [ showModalConfirm, setShowModalConfirm ] = useState<{show: boolean, idTurma: string}>({show: false, idTurma: ""})

    const [ professorAtom, setProfessorAtom ] = useAtom(loadProfessorAtom)
    const [ disciplinaAtom, setDisciplinaAtom ] = useAtom(loadDisciplinaAtom)
    const [ turmasAtom, setTurmasAtom ] = useAtom(loadTurmaAtom)
    const [ matriculasAtom, setMatriculasAtom ] = useAtom(loadMatriculasAtom)
    const [ userAtom, setUserAtom ] = useAtom(loadUserAtom)

    const [ filterTurmas, setFilterTurmas ] = useState<ITurma[]>([])
    const [ isLoading, setIsLoading ] = useState<boolean>(false)

    useEffect(() => {
        setIsLoading(true)
        Promise.all([setMatriculasAtom(), setTurmasAtom(), setDisciplinaAtom(), setProfessorAtom(), setUserAtom()])
            .catch((e) => setErro(e.message))
            .finally(() => setIsLoading(false))

    }, [ setMatriculasAtom, setTurmasAtom, setProfessorAtom, setDisciplinaAtom, setUserAtom])

    useEffect(() => {
        if(turmasAtom)
            setFilterTurmas(turmasAtom as ITurma[])

    }, [ turmasAtom ])

    const confirmMatricula = async (idTurma: string) => {
        setIsLoading(true)

        await matricular(idTurma)
        setShowModalConfirm({show: false, idTurma: ""})
        setMatriculasAtom(null, true)

        setIsLoading(false)
    }

    return (
        <Box>
            <Typography variant="h4" sx={{ fontWeight: 700, mb: 4 }}>
                Disciplinas Ofertadas
            </Typography>
            <TextField
                fullWidth
                placeholder="Pesquisar disciplina..."
                sx={{ mb: 3 }}
                onChange={(e) => {
                    const value = e.target.value?.toLowerCase()

                    let filter = turmasAtom
                    if(value?.length >= 3)
                        filter = turmasAtom?.filter(t => {
                            const disciplina = disciplinaAtom?.find((d) => d.id === t.disciplinaId)
                            const professor = professorAtom?.find((p) => p.id === t.professorId)

                            return disciplina?.nome.toLowerCase().includes(value) || professor?.nome.toLowerCase().includes(value)
                        }) ?? []

                    setFilterTurmas(filter as ITurma[])
                }}
            />
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Disciplina</TableCell>
                            <TableCell>Professor</TableCell>
                            <TableCell>Horário</TableCell>
                            <TableCell>Semestre</TableCell>
                            <TableCell align="center">Ação</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            !!filterTurmas &&
                            filterTurmas.map(turma => {
                                const disciplina = disciplinaAtom?.find((d) => d.id === turma.disciplinaId)
                                const professor = professorAtom?.find((p) => p.id === turma.professorId)
                                const hasMatricula = matriculasAtom?.some(m => m.idTurma === turma.id)
                                
                                return (
                                    <TableRow key={turma.id}>
                                        <TableCell>
                                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                            {disciplina?.nome ?? "-"}
                                        </Typography>
                                        <Typography variant="caption" sx={{ color: "text.secondary" }}>
                                            {disciplina?.codigo}
                                        </Typography>
                                        </TableCell>
                                       <TableCell>
                                            <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
                                                <Avatar sx={{ width: 32, height: 32, fontSize: 13, bgcolor: "#c7d2fe", color: "#3730a3" }}>
                                                    {professor ? iniciais(professor.nome) : "?"}
                                                </Avatar>
                                                <Typography variant="body2">{professor?.nome ?? "-"}</Typography>
                                            </Stack>
                                        </TableCell>
                                        <TableCell>
                                            <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
                                                <Chip
                                                    label={`${turma.diaSemana}${turma.turno}`}
                                                    size="small"
                                                    color="primary"
                                                    sx={{ fontWeight: 700 }}
                                                />
                                                <Typography variant="body2">
                                                    {DIAS_SEMANA[turma.diaSemana]} · {TURNOS[turma.turno]}
                                                </Typography>
                                            </Stack>
                                        </TableCell>
                                        <TableCell>{turma.semestre}</TableCell>
                                        <TableCell align="center" sx={{ whiteSpace: "nowrap" }}>
                                            <Tooltip title="Matricular-se">
                                                <IconButton 
                                                    disabled={hasMatricula || userAtom?.isAdmin}
                                                    onClick={() => setShowModalConfirm({show: true, idTurma: turma.id})}
                                                >
                                                    <PersonAddAlt1Icon fontSize="small" color={hasMatricula || userAtom?.isAdmin ? "disabled": "success"} />
                                                </IconButton>
                                            </Tooltip>
                                        </TableCell>
                                    </TableRow>
                                )
                            })
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            <Dialog open={showModalConfirm.show} onClose={() => setShowModalConfirm({show: false, idTurma: ""})}>
                <DialogTitle>Deseja matricular-se na turma?</DialogTitle>
                <DialogActions sx={{ px: 3, pb: 2 }}>
                    <Button onClick={() => setShowModalConfirm({show: false, idTurma: ""})} variant="outlined" color="error">Cancelar</Button>
                    <Button variant="contained" onClick={() => confirmMatricula(showModalConfirm.idTurma)}>
                        Matricular
                    </Button>
                </DialogActions>
            </Dialog>

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

export default PortalAlunoDisciplinas