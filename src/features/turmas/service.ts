import { api } from "../api"
import type { IDisciplina, IProfessor, ITurma, ITurmaForm } from "./types"

export const listarTurmas = () => api<ITurma[]>("/turma")

export const criarTurma = (turma: ITurmaForm) =>
    api<ITurma>("/turma", {
        method: "POST",
        body: JSON.stringify(turma),
    })

export const atualizarTurma = (id: string, turma: ITurmaForm) =>
    api<ITurma>(`/turma/${id}`, {
        method: "PUT",
        body: JSON.stringify(turma),
    })

export const excluirTurma = (id: string) =>
    api<void>(`/turma/${id}`, { method: "DELETE" })

export const listarDisciplinas = () => api<IDisciplina[]>("/disciplina")

export const listarProfessores = () => api<IProfessor[]>("/professor")