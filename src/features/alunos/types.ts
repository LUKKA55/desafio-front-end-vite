export interface IAluno {
    id: string
    nome: string
    email: string
    matricula: string
    emailInstitucional: string
}

export interface IAlunoForm {
    nome: string
    email: string
    matricula: string
    senha?: string
}
