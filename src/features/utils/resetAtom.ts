import { atom } from "jotai"
import { RESET } from "jotai/utils"
import { alunosAtom } from "../alunos/service"
import { matriculasAtom } from "../matriculas/service"
import { professorAtom } from "../professores/service"
import { turmaAtom } from "../turmas/service"

export const resetTudoAtom = atom(null, (_get, set) => {
  set(alunosAtom, RESET)
  set(matriculasAtom, RESET)
  set(professorAtom, RESET)
  set(turmaAtom, RESET)
})