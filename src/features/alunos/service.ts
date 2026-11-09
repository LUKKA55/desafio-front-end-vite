import { api } from "../api"
import type { IAluno, IAlunoForm } from "./types"

export const listarAlunos = () => api<IAluno[]>("/aluno")

export const criarAluno = (aluno: IAlunoForm) =>
    api<IAluno>("/aluno", {
        method: "POST",
        body: JSON.stringify(aluno),
    })

export const atualizarAluno = (id: string, aluno: IAlunoForm) =>
    api<IAluno>(`/aluno/${id}`, {
        method: "PUT",
        body: JSON.stringify(aluno),
    })

export const excluirAluno = (id: string) =>
    api<void>(`/aluno/${id}`, { method: "DELETE" })
