import type { DiaSemana, Turno } from "../turmas/types"

export interface IAlunoMatricula {
    id: string
    professor: string
    disciplina: string
    diaSemana: DiaSemana
    turno: Turno
    semestre: string
    idTurma: string
    codDisciplina: string
}