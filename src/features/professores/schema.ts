import * as yup from "yup"

export const professorSchema = yup.object({
    nome: yup.string()
        .trim()
        .required("Informe o nome")
        .max(100, "O nome pode ter no máximo 100 caracteres"),
    email: yup.string()
        .trim()
        .required("Informe o e-mail")
        .email("E-mail inválido")
        .max(100, "O e-mail pode ter no máximo 100 caracteres"),
})

export type ProfessorFormValues = yup.InferType<typeof professorSchema>
