import { atom } from "jotai"
import { api } from "../api"
import type { IAluno, IAlunoForm } from "./types"
import { atomWithReset } from "jotai/utils"

export const alunosAtom = atomWithReset<IAluno[] | null>(null)

export const loadAlunosAtom = atom(
    (get) => get(alunosAtom),
    async (_get, set, novo?: IAluno[] | null) => {
        if (novo !== undefined) {
            set(alunosAtom, novo) 
            return
        }

        if (_get(alunosAtom) !== null) 
            return

        set(alunosAtom, await listarAlunos())
})

const listarAlunos = () => api<IAluno[]>("/aluno")

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
