import { api } from "../api"
import type { IProfessor, IProfessorForm } from "./types"

export const listarProfessores = () => api<IProfessor[]>("/professor")

export const criarProfessor = (professor: IProfessorForm) =>
    api<IProfessor>("/professor", {
        method: "POST",
        body: JSON.stringify(professor),
    })

export const atualizarProfessor = (id: string, professor: IProfessorForm) =>
    api<IProfessor>(`/professor/${id}`, {
        method: "PUT",
        body: JSON.stringify(professor),
    })

export const excluirProfessor = (id: string) =>
    api<void>(`/professor/${id}`, { method: "DELETE" })
