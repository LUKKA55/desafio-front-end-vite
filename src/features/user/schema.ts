import * as yup from "yup"


export const loginSchema = yup.object({
    userName: yup.string()
        .required("Nome é obrigatório")
        .min(3, "Nome precisa ter minimo ${min} caracteres")
        .max(100, "Nome com máximo de ${max} caracteres"),
    password: yup.string()
        .required("Senha é obrigatória")
        .min(6, "Nome precisa ter minimo ${min} caracteres")
        .max(20, "Senha com máximo de ${max} caracteres"),
})

export type LoginFormValues = yup.InferType<typeof loginSchema>