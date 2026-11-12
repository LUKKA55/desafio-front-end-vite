import {
    Alert,
    Box,
    Paper,
    Snackbar,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from "@mui/material"
import { useAtom } from "jotai"
import { useEffect, useMemo, useState } from "react"
import { loadMatriculasAtom } from "../../../features/matriculas/service"
import Loading from "../../components/loading"
import { DIAS_SEMANA, TURNOS, type DiaSemana, type Turno } from "../../../features/turmas/types"
import type { IAlunoMatricula } from "../../../features/matriculas/types"

type Grade = Record<Turno, Record<DiaSemana, IAlunoMatricula[]>>

const turnos = Object.entries(TURNOS).map(([valor, label]) => ({ valor: Number(valor) as Turno, label }))
const dias = Object.entries(DIAS_SEMANA).map(([valor, label]) => ({ valor: Number(valor) as DiaSemana, label }))

export function montarGrade(matriculas: IAlunoMatricula[]): Grade {
    const grade = {} as Grade

    for (const t of turnos) {
        grade[t.valor] = {} as Record<DiaSemana, IAlunoMatricula[]>
        for (const d of dias) {
            grade[t.valor][d.valor] = []
        }
    }

    for (const m of matriculas) {
        grade[m.turno]?.[m.diaSemana]?.push(m)
    }

    return grade
}

const PortalAlunoGrade = () => {
    const [ matriculasAtom, setMatriculasAtom ] = useAtom(loadMatriculasAtom)
    const [ isLoading, setIsLoading ] = useState<boolean>(false)
    const [ erro, setErro ] = useState("")

    useEffect(() => {
        setIsLoading(true)
        Promise.all([setMatriculasAtom()])
            .catch((e) => setErro(e.message))
            .finally(() => setIsLoading(false))

    }, [ setMatriculasAtom, ])

    const grade = useMemo(() => montarGrade(matriculasAtom ?? []), [matriculasAtom])

    return (
        <Box>
            <Typography variant="h4" sx={{fontWeight:700, mb: 4}}>
                Minha Grade Horária
            </Typography>
            <TableContainer component={Paper}>
                <Table sx={{ tableLayout: "fixed" }}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Turno</TableCell>
                            {dias.map((d) => (
                                <TableCell key={d.valor}>{d.label}</TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {turnos.map((t) => (
                            <TableRow key={t.valor}>
                                <TableCell>{t.label}</TableCell>
                                {dias.map((d) => (
                                    <TableCell key={d.valor}>
                                        {grade[t.valor][d.valor].map((m) => (
                                            <div key={m.id}>{m.disciplina}</div>
                                        ))}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
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

export default PortalAlunoGrade