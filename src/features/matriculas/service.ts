import { atom } from "jotai";
import { api } from "../api";
import type { IAlunoMatricula } from "./types";
import { atomWithReset } from "jotai/utils";

export const matriculasAtom = atomWithReset<IAlunoMatricula[] | null>(null)

export const loadMatriculasAtom = atom(
    (get) => get(matriculasAtom),
    async (_get, set, novo?: IAlunoMatricula[] | null, renew?: boolean) => {
        if(renew){
            set(matriculasAtom, await listarMatriculas())
            return      
        }

        if (novo) {
            set(matriculasAtom, novo) 
            return
        }

        if (_get(matriculasAtom) !== null) 
            return

        set(matriculasAtom, await listarMatriculas())
})

const listarMatriculas = () => 
    api<IAlunoMatricula[]>("/matricula")

export const matricular = (idTurma: string) => 
    api(`/matricula/${idTurma}`, {
        method: "POST",
    })

export const deleteMatricula = (idMatricula: string) => 
    api(`/matricula/${idMatricula}`, {
        method: "DELETE",
    })