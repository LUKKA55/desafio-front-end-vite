import { useState, type ChangeEvent } from "react"
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    MenuItem,
    Stack,
    TextField,
} from "@mui/material"

import {
    DIAS_SEMANA,
    TURNOS,
    type DiaSemana,
    type IDisciplina,
    type IProfessor,
    type ITurmaForm,
    type Turno,
} from "../../features/turmas/types"

interface Props {
    aberto: boolean
    turmaInicial: ITurmaForm | null
    disciplinas: IDisciplina[]
    professores: IProfessor[]
    onFechar: () => void
    onSalvar: (turma: ITurmaForm) => void
}

// Campos ficam como string no formulário e são convertidos só ao salvar
interface Campos {
    disciplinaId: string
    professorId: string
    diaSemana: string
    turno: string
    vagas: string
    semestre: string
}

type Erros = Partial<Record<keyof Campos, string>>

const vazio: Campos = {
    disciplinaId: "",
    professorId: "",
    diaSemana: "",
    turno: "",
    vagas: "",
    semestre: "",
}

const paraCampos = (turma: ITurmaForm | null): Campos =>
    turma
        ? {
              disciplinaId: turma.disciplinaId,
              professorId: turma.professorId,
              diaSemana: String(turma.diaSemana),
              turno: String(turma.turno),
              vagas: String(turma.vagas),
              semestre: turma.semestre,
          }
        : vazio

const validar = (c: Campos): Erros => {
    const erros: Erros = {}
    if (!c.disciplinaId) erros.disciplinaId = "Selecione a disciplina"
    if (!c.professorId) erros.professorId = "Selecione o professor"
    if (!c.diaSemana) erros.diaSemana = "Selecione o dia"
    if (!c.turno) erros.turno = "Selecione o turno"
    if (!c.semestre.trim()) erros.semestre = "Informe o semestre"
    if (!c.vagas) erros.vagas = "Informe as vagas"
    else if (Number(c.vagas) <= 0) erros.vagas = "Vagas tem que ser maior que 0"
    return erros
}

const TurmaForm = ({ aberto, turmaInicial, disciplinas, professores, onFechar, onSalvar }: Props) => {
    const [campos, setCampos] = useState<Campos>(() => paraCampos(turmaInicial))
    const [erros, setErros] = useState<Erros>({})

    const alterar = (campo: keyof Campos) => (e: ChangeEvent<HTMLInputElement>) => {
        setCampos({ ...campos, [campo]: e.target.value })
        setErros({ ...erros, [campo]: undefined })
    }

    const salvar = () => {
        const novosErros = validar(campos)
        setErros(novosErros)
        if (Object.keys(novosErros).length > 0) return

        onSalvar({
            disciplinaId: campos.disciplinaId,
            professorId: campos.professorId,
            diaSemana: Number(campos.diaSemana) as DiaSemana,
            turno: Number(campos.turno) as Turno,
            vagas: Number(campos.vagas),
            semestre: campos.semestre.trim(),
        })
    }

    return (
        <Dialog open={aberto} onClose={onFechar} fullWidth maxWidth="sm">
            <DialogTitle>{turmaInicial ? "Editar turma" : "Nova turma"}</DialogTitle>

            <DialogContent>
                <Stack spacing={2} sx={{ mt: 1 }}>
                    <TextField
                        select
                        label="Disciplina"
                        value={campos.disciplinaId}
                        onChange={alterar("disciplinaId")}
                        error={!!erros.disciplinaId}
                        helperText={erros.disciplinaId}
                    >
                        {disciplinas.map((d) => (
                            <MenuItem key={d.id} value={d.id}>
                                {d.codigo} - {d.nome}
                            </MenuItem>
                        ))}
                    </TextField>

                    <TextField
                        select
                        label="Professor"
                        value={campos.professorId}
                        onChange={alterar("professorId")}
                        error={!!erros.professorId}
                        helperText={erros.professorId}
                    >
                        {professores.map((p) => (
                            <MenuItem key={p.id} value={p.id}>
                                {p.nome}
                            </MenuItem>
                        ))}
                    </TextField>

                    <Stack direction="row" spacing={2}>
                        <TextField
                            select
                            fullWidth
                            label="Dia da semana"
                            value={campos.diaSemana}
                            onChange={alterar("diaSemana")}
                            error={!!erros.diaSemana}
                            helperText={erros.diaSemana}
                        >
                            {Object.entries(DIAS_SEMANA).map(([valor, nome]) => (
                                <MenuItem key={valor} value={valor}>
                                    {nome}
                                </MenuItem>
                            ))}
                        </TextField>

                        <TextField
                            select
                            fullWidth
                            label="Turno"
                            value={campos.turno}
                            onChange={alterar("turno")}
                            error={!!erros.turno}
                            helperText={erros.turno}
                        >
                            {Object.entries(TURNOS).map(([valor, nome]) => (
                                <MenuItem key={valor} value={valor}>
                                    {nome}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Stack>

                    <Stack direction="row" spacing={2}>
                        <TextField
                            fullWidth
                            label="Semestre"
                            placeholder="2026/2"
                            value={campos.semestre}
                            onChange={alterar("semestre")}
                            error={!!erros.semestre}
                            helperText={erros.semestre}
                        />

                        <TextField
                            fullWidth
                            type="number"
                            label="Vagas"
                            value={campos.vagas}
                            onChange={alterar("vagas")}
                            error={!!erros.vagas}
                            helperText={erros.vagas}
                            slotProps={{ htmlInput: { min: 1 } }}
                        />
                    </Stack>
                </Stack>
            </DialogContent>

            <DialogActions sx={{ px: 3, pb: 2 }}>
                <Button onClick={onFechar}>Cancelar</Button>
                <Button variant="contained" onClick={salvar}>
                    Salvar
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default TurmaForm
