import { atom } from "jotai"
import { api } from "../api"
import type { IProfessor, IProfessorForm } from "./types"
import { atomWithReset } from "jotai/utils"

export const professorAtom = atomWithReset<IProfessor[] | null>(null)

export const loadProfessorAtom = atom(
  (get) => get(professorAtom),
  async (_get, set, novo?: IProfessor[] | null) => {
    if (novo !== undefined) {
        set(professorAtom, novo) 
        return
    }
    if (_get(professorAtom) !== null) 
        return

    set(professorAtom, await loadProfessor())
  }
)
const loadProfessor = () => api<IProfessor[]>("/professor")

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
