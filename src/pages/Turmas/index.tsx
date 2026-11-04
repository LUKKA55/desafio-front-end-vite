import { useState, type ReactNode } from "react"
import {
    Alert,
    Avatar,
    Box,
    Button,
    Chip,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
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
    Typography,
} from "@mui/material"
import AddRoundedIcon from "@mui/icons-material/AddRounded"
import ClassRoundedIcon from "@mui/icons-material/ClassRounded"
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded"
import EditRoundedIcon from "@mui/icons-material/EditRounded"
import EventSeatRoundedIcon from "@mui/icons-material/EventSeatRounded"
import PersonRoundedIcon from "@mui/icons-material/PersonRounded"

import { disciplinasMock, professoresMock, turmasMock } from "../../features/turmas/mock"
import { DIAS_SEMANA, TURNOS, type ITurma, type ITurmaForm } from "../../features/turmas/types"
import TurmaForm from "./TurmaForm"

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

const Turmas = () => {
    const [turmas, setTurmas] = useState<ITurma[]>(turmasMock)
    const [formAberto, setFormAberto] = useState(false)
    const [turmaEditando, setTurmaEditando] = useState<ITurma | null>(null)
    const [turmaExcluindo, setTurmaExcluindo] = useState<ITurma | null>(null)
    const [mensagem, setMensagem] = useState("")

    const disciplina = (id: string) => disciplinasMock.find((d) => d.id === id)
    const professor = (id: string) => professoresMock.find((p) => p.id === id)

    const totalVagas = turmas.reduce((soma, t) => soma + t.vagas, 0)
    const totalProfessores = new Set(turmas.map((t) => t.professorId)).size

    const abrirNova = () => {
        setTurmaEditando(null)
        setFormAberto(true)
    }

    const abrirEdicao = (turma: ITurma) => {
        setTurmaEditando(turma)
        setFormAberto(true)
    }

    const salvar = (dados: ITurmaForm) => {
        if (turmaEditando) {
            setTurmas(turmas.map((t) => (t.id === turmaEditando.id ? { ...dados, id: t.id } : t)))
            setMensagem("Turma atualizada")
        } else {
            setTurmas([...turmas, { ...dados, id: crypto.randomUUID() }])
            setMensagem("Turma cadastrada")
        }
        setFormAberto(false)
    }

    const confirmarExclusao = () => {
        if (!turmaExcluindo) return
        setTurmas(turmas.filter((t) => t.id !== turmaExcluindo.id))
        setTurmaExcluindo(null)
        setMensagem("Turma excluída")
    }

    return (
        <Box>
            <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={2}
                sx={{ justifyContent: "space-between", alignItems: { xs: "stretch", sm: "center" }, mb: 4 }}
            >
                <Box>
                    <Typography variant="h4">Turmas</Typography>
                    <Typography sx={{ color: "text.secondary" }}>
                        Monte a oferta de turmas do semestre
                    </Typography>
                </Box>
                <Button variant="contained" size="large" startIcon={<AddRoundedIcon />} onClick={abrirNova}>
                    Nova turma
                </Button>
            </Stack>

            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: { xs: "1fr", sm: "repeat(3, 1fr)" },
                    gap: 2,
                    mb: 3,
                }}
            >
                <Resumo titulo="Turmas ofertadas" valor={turmas.length} icone={<ClassRoundedIcon />} />
                <Resumo titulo="Vagas ofertadas" valor={totalVagas} icone={<EventSeatRoundedIcon />} />
                <Resumo titulo="Professores alocados" valor={totalProfessores} icone={<PersonRoundedIcon />} />
            </Box>

            <TableContainer component={Paper} variant="outlined">
                <Table sx={{ whiteSpace: "nowrap" }}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Disciplina</TableCell>
                            <TableCell>Professor</TableCell>
                            <TableCell>Horário</TableCell>
                            <TableCell>Semestre</TableCell>
                            <TableCell align="right">Vagas</TableCell>
                            <TableCell align="right">Ações</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {turmas.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={6} align="center" sx={{ py: 6 }}>
                                    <Typography sx={{ fontWeight: 600 }}>Nenhuma turma cadastrada</Typography>
                                    <Typography variant="body2" sx={{ color: "text.secondary" }}>
                                        Clique em "Nova turma" para criar a primeira oferta
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        )}

                        {turmas.map((turma) => {
                            const d = disciplina(turma.disciplinaId)
                            const p = professor(turma.professorId)

                            return (
                                <TableRow key={turma.id} hover>
                                    <TableCell>
                                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                            {d?.nome ?? "-"}
                                        </Typography>
                                        <Typography variant="caption" sx={{ color: "text.secondary" }}>
                                            {d?.codigo}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
                                            <Avatar sx={{ width: 32, height: 32, fontSize: 13, bgcolor: "#c7d2fe", color: "#3730a3" }}>
                                                {p ? iniciais(p.nome) : "?"}
                                            </Avatar>
                                            <Typography variant="body2">{p?.nome ?? "-"}</Typography>
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
                                    <TableCell align="right">{turma.vagas}</TableCell>
                                    <TableCell align="right" sx={{ whiteSpace: "nowrap" }}>
                                        <Tooltip title="Editar">
                                            <IconButton size="small" onClick={() => abrirEdicao(turma)}>
                                                <EditRoundedIcon fontSize="small" />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Excluir">
                                            <IconButton size="small" color="error" onClick={() => setTurmaExcluindo(turma)}>
                                                <DeleteOutlineRoundedIcon fontSize="small" />
                                            </IconButton>
                                        </Tooltip>
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>

            {formAberto && (
                <TurmaForm
                    aberto={formAberto}
                    turmaInicial={turmaEditando}
                    disciplinas={disciplinasMock}
                    professores={professoresMock}
                    onFechar={() => setFormAberto(false)}
                    onSalvar={salvar}
                />
            )}

            <Dialog open={!!turmaExcluindo} onClose={() => setTurmaExcluindo(null)}>
                <DialogTitle>Excluir turma?</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        A turma de {turmaExcluindo && disciplina(turmaExcluindo.disciplinaId)?.nome} será removida.
                    </DialogContentText>
                </DialogContent>
                <DialogActions sx={{ px: 3, pb: 2 }}>
                    <Button onClick={() => setTurmaExcluindo(null)}>Cancelar</Button>
                    <Button variant="contained" color="error" onClick={confirmarExclusao}>
                        Excluir
                    </Button>
                </DialogActions>
            </Dialog>

            <Snackbar
                open={!!mensagem}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                autoHideDuration={3000}
                onClose={() => setMensagem("")}
            >
                <Alert severity="success" variant="filled" onClose={() => setMensagem("")}>
                    {mensagem}
                </Alert>
            </Snackbar>
        </Box>
    )
}

export default Turmas
