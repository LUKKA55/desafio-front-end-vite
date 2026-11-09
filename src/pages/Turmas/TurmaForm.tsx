import { Controller, useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
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

import { turmaSchema, type TurmaFormValues } from "../../features/turmas/schema"
import {
    DIAS_SEMANA,
    TURNOS,
    type DiaSemana,
    type IDisciplina,
    type ITurmaForm,
    type Turno,
} from "../../features/turmas/types"
import type { IProfessor } from "../../features/professores/types"

interface Props {
    aberto: boolean
    turmaInicial: ITurmaForm | null
    disciplinas: IDisciplina[]
    professores: IProfessor[]
    onFechar: () => void
    onSalvar: (turma: ITurmaForm) => void
}

const TurmaForm = ({ aberto, turmaInicial, disciplinas, professores, onFechar, onSalvar }: Props) => {
    const { control, handleSubmit } = useForm({
        resolver: yupResolver(turmaSchema),
        defaultValues: turmaInicial ?? undefined,
    })

    const salvar = (dados: TurmaFormValues) => {
        onSalvar({
            ...dados,
            diaSemana: dados.diaSemana as DiaSemana,
            turno: dados.turno as Turno,
        })
    }

    return (
        <Dialog open={aberto} onClose={onFechar} fullWidth maxWidth="sm">
            <DialogTitle>{turmaInicial ? "Editar turma" : "Nova turma"}</DialogTitle>

            <DialogContent>
                <Stack spacing={2} sx={{ mt: 1 }}>
                    <Controller
                        name="disciplinaId"
                        control={control}
                        render={({ field, fieldState }) => (
                            <TextField
                                {...field}
                                value={field.value ?? ""}
                                select
                                label="Disciplina"
                                error={!!fieldState.error}
                                helperText={fieldState.error?.message}
                            >
                                {disciplinas.map((d) => (
                                    <MenuItem key={d.id} value={d.id}>
                                        {d.codigo} - {d.nome}
                                    </MenuItem>
                                ))}
                            </TextField>
                        )}
                    />

                    <Controller
                        name="professorId"
                        control={control}
                        render={({ field, fieldState }) => (
                            <TextField
                                {...field}
                                value={field.value ?? ""}
                                select
                                label="Professor"
                                error={!!fieldState.error}
                                helperText={fieldState.error?.message}
                            >
                                {professores.map((p) => (
                                    <MenuItem key={p.id} value={p.id}>
                                        {p.nome}
                                    </MenuItem>
                                ))}
                            </TextField>
                        )}
                    />

                    <Stack direction="row" spacing={2}>
                        <Controller
                            name="diaSemana"
                            control={control}
                            render={({ field, fieldState }) => (
                                <TextField
                                    {...field}
                                    value={field.value ?? ""}
                                    select
                                    fullWidth
                                    label="Dia da semana"
                                    error={!!fieldState.error}
                                    helperText={fieldState.error?.message}
                                >
                                    {Object.entries(DIAS_SEMANA).map(([valor, nome]) => (
                                        <MenuItem key={valor} value={Number(valor)}>
                                            {nome}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            )}
                        />

                        <Controller
                            name="turno"
                            control={control}
                            render={({ field, fieldState }) => (
                                <TextField
                                    {...field}
                                    value={field.value ?? ""}
                                    select
                                    fullWidth
                                    label="Turno"
                                    error={!!fieldState.error}
                                    helperText={fieldState.error?.message}
                                >
                                    {Object.entries(TURNOS).map(([valor, nome]) => (
                                        <MenuItem key={valor} value={Number(valor)}>
                                            {nome}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            )}
                        />
                    </Stack>

                    <Stack direction="row" spacing={2}>
                        <Controller
                            name="semestre"
                            control={control}
                            render={({ field, fieldState }) => (
                                <TextField
                                    {...field}
                                    value={field.value ?? ""}
                                    fullWidth
                                    label="Semestre"
                                    placeholder="2026/2"
                                    error={!!fieldState.error}
                                    helperText={fieldState.error?.message}
                                />
                            )}
                        />

                        <Controller
                            name="vagas"
                            control={control}
                            render={({ field, fieldState }) => (
                                <TextField
                                    {...field}
                                    value={field.value ?? ""}
                                    fullWidth
                                    type="number"
                                    label="Vagas"
                                    error={!!fieldState.error}
                                    helperText={fieldState.error?.message}
                                    slotProps={{ htmlInput: { min: 1 } }}
                                />
                            )}
                        />
                    </Stack>
                </Stack>
            </DialogContent>

            <DialogActions sx={{ px: 3, pb: 2 }}>
                <Button onClick={onFechar}>Cancelar</Button>
                <Button variant="contained" onClick={handleSubmit(salvar)}>
                    Salvar
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default TurmaForm
