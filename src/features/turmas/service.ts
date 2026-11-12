import { atom } from "jotai"
import { api } from "../api"
import type { IDisciplina, ITurma, ITurmaForm } from "./types"
import { atomWithReset } from "jotai/utils"

export const turmaAtom = atomWithReset<ITurma[] | null>(null)

export const loadTurmaAtom = atom(
  (get) => get(turmaAtom),
  async (_get, set, novo?: ITurma[] | null) => {
        if (novo !== undefined) {
            set(turmaAtom, novo) 
            return
        }

      if (_get(turmaAtom) !== null) 
          return

    set(turmaAtom, await listarTurmas())
})

const listarTurmas = () => api<ITurma[]>("/turma")

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


const disciplinaAtom = atom<IDisciplina[] | null>(null)

export const loadDisciplinaAtom = atom(
  (get) => get(disciplinaAtom),
  async (_get, set, novo?: IDisciplina[] | null) => {
      if (novo !== undefined) {
          set(disciplinaAtom, novo) 
          return
      }

      if (_get(disciplinaAtom) !== null) 
          return

    set(disciplinaAtom, await listarDisciplinas())
})


const listarDisciplinas = () => api<IDisciplina[]>("/disciplina")
