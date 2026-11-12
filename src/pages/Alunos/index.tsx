import { useEffect, useState } from "react"
import {
    Alert,
    Avatar,
    Box,
    Button,
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
import ContentCopyRoundedIcon from "@mui/icons-material/ContentCopyRounded"
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded"
import EditRoundedIcon from "@mui/icons-material/EditRounded"

import { atualizarAluno, criarAluno, excluirAluno, loadAlunosAtom } from "../../features/alunos/service"
import type { IAluno, IAlunoForm } from "../../features/alunos/types"
import AlunoForm from "./AlunoForm"
import Loading from "../components/loading"
import { useAtom } from "jotai"

const iniciais = (nome: string) =>
    nome
        .split(" ")
        .map((parte) => parte[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()

const Alunos = () => {
    const [formAberto, setFormAberto] = useState(false)
    const [alunoEditando, setAlunoEditando] = useState<IAluno | null>(null)
    const [alunoExcluindo, setAlunoExcluindo] = useState<IAluno | null>(null)
    const [alunoCadastrado, setAlunoCadastrado] = useState<IAluno | null>(null)
    const [mensagem, setMensagem] = useState("")
    const [erro, setErro] = useState("")

    const [ alunosAtom, setAlunosAtom ] = useAtom(loadAlunosAtom)
    
    const [ isLoading, setIsLoading ] = useState<boolean>(false)

   useEffect(() => {
        setIsLoading(true)
        Promise.all([ setAlunosAtom()])
            .catch((e) => setErro(e.message))
            .finally(() => setIsLoading(false))

    }, [ setAlunosAtom ])

    const abrirNovo = () => {
        setAlunoEditando(null)
        setFormAberto(true)
    }

    const abrirEdicao = (aluno: IAluno) => {
        setAlunoEditando(aluno)
        setFormAberto(true)
    }

    const salvar = async (dados: IAlunoForm) => {
        try {
            if (alunoEditando) {
                const atualizado = await atualizarAluno(alunoEditando.id, dados)
                setAlunosAtom(alunosAtom?.map((a) => (a.id === atualizado.id ? atualizado : a)))
                setMensagem("Aluno atualizado")
            } else {
                const novo = await criarAluno(dados)
                setAlunosAtom([...alunosAtom as IAluno[], novo].sort((a, b) => a.nome.localeCompare(b.nome)))
                setAlunoCadastrado(novo)
            }
            setFormAberto(false)
        } catch (e) {
            setErro((e as Error).message)
        }
    }

    const confirmarExclusao = async () => {
        if (!alunoExcluindo) return
        try {
            await excluirAluno(alunoExcluindo.id)
            setAlunosAtom(alunosAtom?.filter((a) => a.id !== alunoExcluindo.id))
            setMensagem("Aluno excluído")
        } catch (e) {
            setErro((e as Error).message)
        }
        setAlunoExcluindo(null)
    }

    const copiarLogin = async (login: string) => {
        try {
            await navigator.clipboard.writeText(login)
            setMensagem("Login copiado")
        } catch {
            setErro("Não foi possível copiar o login")
        }
    }

    return (
        <Box>
            <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={2}
                sx={{ justifyContent: "space-between", alignItems: { xs: "stretch", sm: "center" }, mb: 4 }}
            >
                <Box>
                    <Typography variant="h4">Alunos</Typography>
                    <Typography sx={{ color: "text.secondary" }}>
                        Cadastre os alunos e gere o acesso deles ao sistema
                    </Typography>
                </Box>
                <Button variant="contained" size="large" startIcon={<AddRoundedIcon />} onClick={abrirNovo}>
                    Novo aluno
                </Button>
            </Stack>

            <TableContainer component={Paper} variant="outlined">
                <Table sx={{ whiteSpace: "nowrap" }}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Aluno</TableCell>
                            <TableCell>Matrícula</TableCell>
                            <TableCell>Login institucional</TableCell>
                            <TableCell>E-mail pessoal</TableCell>
                            <TableCell align="right">Ações</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {alunosAtom?.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={5} align="center" sx={{ py: 6 }}>
                                    <Typography sx={{ fontWeight: 600 }}>Nenhum aluno cadastrado</Typography>
                                    <Typography variant="body2" sx={{ color: "text.secondary" }}>
                                        Clique em "Novo aluno" para cadastrar o primeiro
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        )}

                        {
                            
                            !!alunosAtom &&
                            alunosAtom.map((aluno) => (
                                <TableRow key={aluno.id} hover>
                                    <TableCell>
                                        <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
                                            <Avatar sx={{ width: 32, height: 32, fontSize: 13, bgcolor: "#c7d2fe", color: "#3730a3" }}>
                                                {iniciais(aluno.nome)}
                                            </Avatar>
                                            <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                                {aluno.nome}
                                            </Typography>
                                        </Stack>
                                    </TableCell>
                                    <TableCell>{aluno.matricula}</TableCell>
                                    <TableCell>
                                        <Stack direction="row" spacing={0.5} sx={{ alignItems: "center" }}>
                                            <Typography variant="body2">{aluno.emailInstitucional}</Typography>
                                            <Tooltip title="Copiar login">
                                                <IconButton size="small" onClick={() => copiarLogin(aluno.emailInstitucional)}>
                                                    <ContentCopyRoundedIcon sx={{ fontSize: 16 }} />
                                                </IconButton>
                                            </Tooltip>
                                        </Stack>
                                    </TableCell>
                                    <TableCell>{aluno.email}</TableCell>
                                    <TableCell align="right">
                                        <Tooltip title="Editar">
                                            <IconButton size="small" onClick={() => abrirEdicao(aluno)}>
                                                <EditRoundedIcon fontSize="small" />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Excluir">
                                            <IconButton size="small" color="error" onClick={() => setAlunoExcluindo(aluno)}>
                                                <DeleteOutlineRoundedIcon fontSize="small" />
                                            </IconButton>
                                        </Tooltip>
                                    </TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>

            {formAberto && (
                <AlunoForm
                    aberto={formAberto}
                    alunoInicial={alunoEditando}
                    onFechar={() => setFormAberto(false)}
                    onSalvar={salvar}
                />
            )}

            <Dialog open={!!alunoCadastrado} onClose={() => setAlunoCadastrado(null)} fullWidth maxWidth="xs">
                <DialogTitle>Aluno cadastrado</DialogTitle>
                <DialogContent>
                    <DialogContentText sx={{ mb: 2 }}>
                        Passe o login abaixo e a senha inicial para {alunoCadastrado?.nome} acessar o sistema.
                    </DialogContentText>
                    <Paper variant="outlined" sx={{ p: 2, display: "flex", alignItems: "center", gap: 1 }}>
                        <Box sx={{ flex: 1, minWidth: 0 }}>
                            <Typography variant="caption" sx={{ color: "text.secondary" }}>
                                Login institucional
                            </Typography>
                            <Typography sx={{ fontWeight: 600, wordBreak: "break-all" }}>
                                {alunoCadastrado?.emailInstitucional}
                            </Typography>
                        </Box>
                        <Tooltip title="Copiar login">
                            <IconButton onClick={() => alunoCadastrado && copiarLogin(alunoCadastrado.emailInstitucional)}>
                                <ContentCopyRoundedIcon />
                            </IconButton>
                        </Tooltip>
                    </Paper>
                </DialogContent>
                <DialogActions sx={{ px: 3, pb: 2 }}>
                    <Button variant="contained" onClick={() => setAlunoCadastrado(null)}>
                        Concluir
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog open={!!alunoExcluindo} onClose={() => setAlunoExcluindo(null)}>
                <DialogTitle>Excluir aluno?</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {alunoExcluindo?.nome} será removido do cadastro e perderá o acesso ao sistema.
                    </DialogContentText>
                </DialogContent>
                <DialogActions sx={{ px: 3, pb: 2 }}>
                    <Button onClick={() => setAlunoExcluindo(null)}>Cancelar</Button>
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

export default Alunos
