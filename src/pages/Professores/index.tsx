import { useEffect, useState } from "react"
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
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded"
import EditRoundedIcon from "@mui/icons-material/EditRounded"

import {
    atualizarProfessor,
    criarProfessor,
    excluirProfessor,
    loadProfessorAtom,
} from "../../features/professores/service"
import type { IProfessor, IProfessorForm } from "../../features/professores/types"
import ProfessorForm from "./ProfessorForm"
import { useAtom } from "jotai"
import Loading from "../components/loading"
import { loadTurmaAtom } from "../../features/turmas/service"

const iniciais = (nome: string) =>
    nome
        .split(" ")
        .map((parte) => parte[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()

const Professores = () => {
    const [formAberto, setFormAberto] = useState(false)
    const [professorEditando, setProfessorEditando] = useState<IProfessor | null>(null)
    const [professorExcluindo, setProfessorExcluindo] = useState<IProfessor | null>(null)
    const [mensagem, setMensagem] = useState("")
    const [erro, setErro] = useState("")

    const [ isLoading, setIsLoading ] = useState<boolean>(false)
    const [ professorAtom, setProfessorAtom ] = useAtom(loadProfessorAtom)
    const [ turmaAtom, setTurmaAtom ] = useAtom(loadTurmaAtom)
    
    useEffect(() => {
        setIsLoading(true)

        Promise.all([setTurmaAtom(), setProfessorAtom()])
            .catch((e) => setErro(e.message))
            .finally(() => setIsLoading(false))

    }, [ setTurmaAtom, setProfessorAtom ])

    const totalTurmas = (id: string) => turmaAtom?.filter((t) => t.professorId === id).length ?? 0

    const abrirNovo = () => {
        setProfessorEditando(null)
        setFormAberto(true)
    }

    const abrirEdicao = (professor: IProfessor) => {
        setProfessorEditando(professor)
        setFormAberto(true)
    }

    const salvar = async (dados: IProfessorForm) => {
        try {
            if (professorEditando) {
                const atualizado = await atualizarProfessor(professorEditando.id, dados)
                setProfessorAtom(professorAtom?.map((p) => (p.id === atualizado.id ? atualizado : p)))
                setMensagem("Professor atualizado")
            } else {
                const novo = await criarProfessor(dados)
                setProfessorAtom([...professorAtom as IProfessor[], novo])
                setMensagem("Professor cadastrado")
            }
            setFormAberto(false)
        } catch (e) {
            setErro((e as Error).message)
        }
    }

    const confirmarExclusao = async () => {
        if (!professorExcluindo) return
        try {
            await excluirProfessor(professorExcluindo.id)
            setProfessorAtom(professorAtom?.filter((p) => p.id !== professorExcluindo.id))
            setMensagem("Professor excluído")
        } catch (e) {
            setErro((e as Error).message)
        }
        setProfessorExcluindo(null)
    }

    return (
        <Box>
            <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={2}
                sx={{ justifyContent: "space-between", alignItems: { xs: "stretch", sm: "center" }, mb: 4 }}
            >
                <Box>
                    <Typography variant="h4">Professores</Typography>
                    <Typography sx={{ color: "text.secondary" }}>
                        Cadastre os professores da instituição
                    </Typography>
                </Box>
                <Button variant="contained" size="large" startIcon={<AddRoundedIcon />} onClick={abrirNovo}>
                    Novo professor
                </Button>
            </Stack>

            <TableContainer component={Paper} variant="outlined">
                <Table sx={{ whiteSpace: "nowrap" }}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Nome</TableCell>
                            <TableCell>E-mail</TableCell>
                            <TableCell>Turmas</TableCell>
                            <TableCell align="right">Ações</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {professorAtom?.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={4} align="center" sx={{ py: 6 }}>
                                    <Typography sx={{ fontWeight: 600 }}>Nenhum professor cadastrado</Typography>
                                    <Typography variant="body2" sx={{ color: "text.secondary" }}>
                                        Clique em "Novo professor" para cadastrar o primeiro
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        )}

                        {professorAtom?.map((professor) => {
                            const quantidade = totalTurmas(professor.id)

                            return (
                                <TableRow key={professor.id} hover>
                                    <TableCell>
                                        <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
                                            <Avatar sx={{ width: 32, height: 32, fontSize: 13, bgcolor: "#c7d2fe", color: "#3730a3" }}>
                                                {iniciais(professor.nome)}
                                            </Avatar>
                                            <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                                {professor.nome}
                                            </Typography>
                                        </Stack>
                                    </TableCell>
                                    <TableCell>{professor.email}</TableCell>
                                    <TableCell>
                                        <Chip
                                            label={quantidade === 1 ? "1 turma" : `${quantidade} turmas`}
                                            size="small"
                                            color={quantidade > 0 ? "primary" : "default"}
                                            variant={quantidade > 0 ? "filled" : "outlined"}
                                        />
                                    </TableCell>
                                    <TableCell align="right">
                                        <Tooltip title="Editar">
                                            <IconButton size="small" onClick={() => abrirEdicao(professor)}>
                                                <EditRoundedIcon fontSize="small" />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title={quantidade > 0 ? "Professor com turmas não pode ser excluído" : "Excluir"}>
                                            <span>
                                                <IconButton
                                                    size="small"
                                                    color="error"
                                                    disabled={quantidade > 0}
                                                    onClick={() => setProfessorExcluindo(professor)}
                                                >
                                                    <DeleteOutlineRoundedIcon fontSize="small" />
                                                </IconButton>
                                            </span>
                                        </Tooltip>
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>

            {formAberto && (
                <ProfessorForm
                    aberto={formAberto}
                    professorInicial={professorEditando}
                    onFechar={() => setFormAberto(false)}
                    onSalvar={salvar}
                />
            )}

            <Dialog open={!!professorExcluindo} onClose={() => setProfessorExcluindo(null)}>
                <DialogTitle>Excluir professor?</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {professorExcluindo?.nome} será removido do cadastro.
                    </DialogContentText>
                </DialogContent>
                <DialogActions sx={{ px: 3, pb: 2 }}>
                    <Button onClick={() => setProfessorExcluindo(null)}>Cancelar</Button>
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

export default Professores
