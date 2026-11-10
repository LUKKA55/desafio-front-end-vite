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

import { alunoSchema, type AlunoFormValues } from "../../features/alunos/schema"
import type { IAluno, IAlunoForm } from "../../features/alunos/types"

interface Props {
    aberto: boolean
    alunoInicial: IAluno | null
    onFechar: () => void
    onSalvar: (aluno: IAlunoForm) => void
}

const AlunoForm = ({ aberto, alunoInicial, onFechar, onSalvar }: Props) => {
    const editando = !!alunoInicial

    const { control, handleSubmit } = useForm({
        resolver: yupResolver(alunoSchema),
        context: { editando },
        defaultValues: {
            nome: alunoInicial?.nome ?? "",
            matricula: alunoInicial?.matricula ?? "",
            email: alunoInicial?.email ?? "",
            senha: "",
        },
    })

    const salvar = (dados: AlunoFormValues) => {
        onSalvar(dados)
    }

    return (
        <Dialog open={aberto} onClose={onFechar} fullWidth maxWidth="sm">
            <DialogTitle>{editando ? "Editar aluno" : "Novo aluno"}</DialogTitle>

            <DialogContent>
                <Stack spacing={2} sx={{ mt: 1 }}>
                    <Controller
                        name="nome"
                        control={control}
                        render={({ field, fieldState }) => (
                            <TextField
                                {...field}
                                label="Nome completo"
                                autoFocus
                                error={!!fieldState.error}
                                helperText={fieldState.error?.message}
                            />
                        )}
                    />

                    <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                        <Controller
                            name="matricula"
                            control={control}
                            render={({ field, fieldState }) => (
                                <TextField
                                    {...field}
                                    label="Matrícula"
                                    sx={{ flex: 1 }}
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
                                    label="E-mail pessoal"
                                    type="email"
                                    placeholder="nome@exemplo.com"
                                    sx={{ flex: 2 }}
                                    error={!!fieldState.error}
                                    helperText={fieldState.error?.message}
                                />
                            )}
                        />
                    </Stack>

                    <Controller
                        name="senha"
                        control={control}
                        render={({ field, fieldState }) => (
                            <TextField
                                {...field}
                                value={field.value ?? ""}
                                label={editando ? "Nova senha" : "Senha inicial"}
                                type="password"
                                autoComplete="new-password"
                                error={!!fieldState.error}
                                helperText={
                                    fieldState.error?.message ??
                                    (editando ? "Deixe em branco para manter a senha atual" : "O aluno usa essa senha no primeiro acesso")
                                }
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

export default AlunoForm
