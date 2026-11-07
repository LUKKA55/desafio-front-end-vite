import type { IDisciplina, IProfessor, ITurma } from "./types"

export const disciplinasMock: IDisciplina[] = [
    { id: "d1", codigo: "INF101", nome: "Algoritmos e Programação", cargaHoraria: 60 },
    { id: "d2", codigo: "INF102", nome: "Estruturas de Dados", cargaHoraria: 60 },
    { id: "d3", codigo: "INF201", nome: "Banco de Dados", cargaHoraria: 60 },
    { id: "d4", codigo: "INF202", nome: "Desenvolvimento Web Front-end", cargaHoraria: 60 },
]

export const professoresMock: IProfessor[] = [
    { id: "p1", nome: "Ana Souza", email: "ana.souza@exemplo.com" },
    { id: "p2", nome: "Carlos Lima", email: "carlos.lima@exemplo.com" },
    { id: "p3", nome: "Fernanda Rocha", email: "fernanda.rocha@exemplo.com" },
]

export const turmasMock: ITurma[] = [
    { id: "t1", disciplinaId: "d1", professorId: "p1", diaSemana: 2, turno: 3, vagas: 40, semestre: "2026/2" },
    { id: "t2", disciplinaId: "d4", professorId: "p2", diaSemana: 4, turno: 3, vagas: 35, semestre: "2026/2" },
]
