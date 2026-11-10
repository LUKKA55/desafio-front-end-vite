export interface IProfessor {
    id: string
    nome: string
    email: string
}

export type IProfessorForm = Omit<IProfessor, "id">