import { Controller, useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Stack,
    TextField,
} from "@mui/material"

import { professorSchema, type ProfessorFormValues } from "../../features/professores/schema"
import type { IProfessorForm } from "../../features/professores/types"

interface Props {
    aberto: boolean
    professorInicial: IProfessorForm | null
    onFechar: () => void
    onSalvar: (professor: IProfessorForm) => void
}

const ProfessorForm = ({ aberto, professorInicial, onFechar, onSalvar }: Props) => {
    const { control, handleSubmit } = useForm({
        resolver: yupResolver(professorSchema),
        defaultValues: professorInicial ?? { nome: "", email: "" },
    })

    const salvar = (dados: ProfessorFormValues) => {
        onSalvar(dados)
    }

    return (
        <Dialog open={aberto} onClose={onFechar} fullWidth maxWidth="sm">
            <DialogTitle>{professorInicial ? "Editar professor" : "Novo professor"}</DialogTitle>

            <DialogContent>
                <Stack spacing={2} sx={{ mt: 1 }}>
                    <Controller
                        name="nome"
                        control={control}
                        render={({ field, fieldState }) => (
                            <TextField
                                {...field}
                                label="Nome"
                                autoFocus
                                error={!!fieldState.error}
                                helperText={fieldState.error?.message}
                            />
                        )}
                    />

                    <Controller
                        name="email"
                        control={control}
                        render={({ field, fieldState }) => (
                            <TextField
                                {...field}
                                label="E-mail"
                                type="email"
                                placeholder="nome@exemplo.com"
                                error={!!fieldState.error}
                                helperText={fieldState.error?.message}
                            />
                        )}
                    />
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

export default ProfessorForm
