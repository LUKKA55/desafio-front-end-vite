import * as yup from "yup"

export const turmaSchema = yup.object({
    disciplinaId: yup.string()
        .required("Selecione a disciplina"),
    professorId: yup.string()
        .required("Selecione o professor"),
    diaSemana: yup.number()
        .typeError("Selecione o dia")
        .required("Selecione o dia")
        .min(2, "Dia inválido")
        .max(7, "Dia inválido"),
    turno: yup.number()
        .typeError("Selecione o turno")
        .required("Selecione o turno")
        .min(1, "Turno inválido")
        .max(3, "Turno inválido"),
    semestre: yup.string()
        .trim()
        .required("Informe o semestre")
        .matches(/^\d{4}\/[12]$/, "Use o formato 2026/2"),
    vagas: yup.number()
        .typeError("Informe as vagas")
        .required("Informe as vagas")
        .integer("Vagas tem que ser um número inteiro")
        .positive("Vagas tem que ser maior que 0"),
})

export type TurmaFormValues = yup.InferType<typeof turmaSchema>