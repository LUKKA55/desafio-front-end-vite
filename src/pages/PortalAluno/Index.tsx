import { useEffect, useState, type ReactNode } from "react"
import {
    Alert,
    Avatar,
    Box,
    Button,
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

import ClassRoundedIcon from "@mui/icons-material/ClassRounded"
import PersonRoundedIcon from "@mui/icons-material/PersonRounded"

import { listarProfessores } from "../../features/professores/service"
import { DIAS_SEMANA, TURNOS, type IDisciplina, type ITurma } from "../../features/turmas/types"
import type { IProfessor } from "../../features/professores/types"

import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded"

import {
    listarDisciplinas,
    listarTurmas,
} from "../../features/turmas/service"

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
    const [turmas, setTurmas] = useState<ITurma[]>([])
    const [disciplinas, setDisciplinas] = useState<IDisciplina[]>([])
    const [professores, setProfessores] = useState<IProfessor[]>([])
    const [mensagem, setMensagem] = useState("")
        const [erro, setErro] = useState("")

const [matriculas, setMatriculas] = useState<ITurma[]>([])

const matricular = (turma: ITurma) => {

    const existe = matriculas.some(
        m => m.id === turma.id
    )

    if(existe){
        setErro("Você já está matriculado nesta turma")
        return
    }

    const conflito = matriculas.some(
        m =>
            m.diaSemana === turma.diaSemana &&
            m.turno === turma.turno
    )

    if(conflito){
        setErro("Conflito de horário")
        return
    }

    setMatriculas([
        ...matriculas,
        turma
    ])

    setMensagem("Matrícula realizada")
}

const cancelarMatricula = (id:string) => {

    setMatriculas(
        matriculas.filter(
            m => m.id !== id
        )
    )

    setMensagem("Matrícula cancelada")
}
    useEffect(() => {
        Promise.all([listarTurmas(), listarDisciplinas(), listarProfessores()])
            .then(([dadosTurmas, dadosDisciplinas, dadosProfessores]) => {
                setTurmas(dadosTurmas)
                setDisciplinas(dadosDisciplinas)
                setProfessores(dadosProfessores)
            })
            .catch((e) => setErro(e.message))
    }, [])

    const disciplina = (id: string) => disciplinas.find((d) => d.id === id)
    const professor = (id: string) =>
    professores.find((p) => p.id === id)

const totalConcluido = 83

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
    Matrículas, grade horária e histórico acadêmico
</Typography>
  </Box>

 <Button
    variant="contained"
    size="large"
    disabled
>
    Portal Acadêmico
</Button>
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
    valor={matriculas.length}
    icone={<SchoolRoundedIcon />}
/>

<Resumo
    titulo="Disciplinas"
    valor={turmas.length}
    icone={<ClassRoundedIcon />}
/>

<Resumo
    titulo="Conclusão"
    valor={totalConcluido}
    icone={<SchoolRoundedIcon />}
/>

<Resumo
    titulo="Pendências"
    valor={3}
    icone={<PersonRoundedIcon />}
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
                            <TableCell align="right">Vagas</TableCell>
                            <TableCell align="right">Matrícula</TableCell>
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
                                        {
    matriculas.some(
        m => m.id === turma.id
    )

    ?

    <Button
    variant="contained"
    color="success"
    disabled
>
    Matriculado
</Button>

    :

    <Button
        variant="contained"
        onClick={() => matricular(turma)}
    >
        Matricular
    </Button>
}



                                    </TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>

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
        </Box>





    )
}

export default PortalAluno
