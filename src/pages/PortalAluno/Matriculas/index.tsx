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
    Tooltip,
    Typography
} from "@mui/material"
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded"

import { deleteMatricula, loadMatriculasAtom } from "../../../features/matriculas/service"
import { useEffect, useState } from "react"
import Loading from "../../components/loading"
import { DIAS_SEMANA, TURNOS } from "../../../features/turmas/types"
import { useAtom } from "jotai"

const iniciais = (nome: string) =>
    nome
    .split(" ")
    .map((parte) => parte[0])
    .slice(0, 2)
    .join("")
    .toUpperCase()

const PortalAlunoMatriculas = () => {
    const [ matriculasAtom, setMatriculasAtom ] = useAtom(loadMatriculasAtom)
    const [ showModalDelete, setShowModalDelete ] = useState<{show: boolean, idMatricula: string}>({show: false, idMatricula: ""})
    
    const [ isLoading, setIsLoading ] = useState<boolean>(false)
    const [ erro, setErro ] = useState("")

    useEffect(() => {
        setIsLoading(true)
        Promise.all([setMatriculasAtom()])
            .catch((e) => setErro(e.message))
            .finally(() => setIsLoading(false))
    }, [ setMatriculasAtom, ])

    const confirmDeleteMatricula = async (idTurma: string) => {
        setIsLoading(true)

        await deleteMatricula(idTurma)
        setMatriculasAtom(null, true)
        setShowModalDelete({show: false, idMatricula: ""})
        
        setIsLoading(false)
    }

    return (
        <Box>
            <Typography variant="h4" sx={{fontWeight: 700, mb: 4}}>
                Minhas Matrículas
            </Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Disciplina</TableCell>
                            <TableCell>Professor</TableCell>
                            <TableCell>Horário</TableCell>
                            <TableCell>Semestre</TableCell>
                            <TableCell>Ação</TableCell>
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
                                        <TableCell align="center" sx={{ whiteSpace: "nowrap" }}>
                                            <Tooltip title="Deletar Matricula">
                                                <IconButton
                                                    onClick={() => setShowModalDelete({show: true, idMatricula: matricula.id})}
                                                >
                                                    <DeleteOutlineRoundedIcon fontSize="small" color="error" />
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
            <Dialog open={showModalDelete.show} onClose={() => setShowModalDelete({show: false, idMatricula: ""})}>
                <DialogTitle>Deseja deletar a matricula na turma?</DialogTitle>
                <DialogActions sx={{ px: 3, pb: 2 }}>
                    <Button onClick={() => setShowModalDelete({show: false, idMatricula: ""})} variant="outlined" color="error">Cancelar</Button>
                    <Button variant="contained" onClick={() => confirmDeleteMatricula(showModalDelete.idMatricula)}>
                        Deletar
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

export default PortalAlunoMatriculas