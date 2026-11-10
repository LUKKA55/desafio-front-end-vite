export interface IDisciplina {
    id: string
    codigo: string
    nome: string
    cargaHoraria: number
}

export type DiaSemana = 2 | 3 | 4 | 5 | 6 | 7
export type Turno = 1 | 2 | 3

export interface ITurma {
    id: string
    disciplinaId: string
    professorId: string
    diaSemana: DiaSemana
    turno: Turno
    vagas: number
    semestre: string
}

export type ITurmaForm = Omit<ITurma, "id">

export const DIAS_SEMANA: Record<DiaSemana, string> = {
    2: "Segunda",
    3: "Terça",
    4: "Quarta",
    5: "Quinta",
    6: "Sexta",
    7: "Sábado",
}

export const TURNOS: Record<Turno, string> = {
    1: "Manhã",
    2: "Tarde",
    3: "Noite",
}
