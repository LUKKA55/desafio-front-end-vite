import * as yup from "yup"

export const alunoSchema = yup.object({
    nome: yup.string()
        .trim()
        .required("Informe o nome")
        .max(100, "O nome pode ter no máximo 100 caracteres"),
    matricula: yup.string()
        .trim()
        .required("Informe a matrícula")
        .max(10, "A matrícula pode ter no máximo 10 caracteres"),
    email: yup.string()
        .trim()
        .required("Informe o e-mail")
        .email("E-mail inválido")
        .max(100, "O e-mail pode ter no máximo 100 caracteres"),
    senha: yup.string()
        .when("$editando", ([editando], schema) =>
            editando
                ? schema.test("tamanho", "A senha precisa ter entre 6 e 20 caracteres", (valor) =>
                      !valor || (valor.length >= 6 && valor.length <= 20))
                : schema
                      .required("Informe a senha inicial")
                      .min(6, "A senha precisa ter no mínimo 6 caracteres")
                      .max(20, "A senha pode ter no máximo 20 caracteres")),
})

export type AlunoFormValues = yup.InferType<typeof alunoSchema>
