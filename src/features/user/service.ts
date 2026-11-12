import { atomWithReset } from "jotai/utils"
import { api } from "../api"
import type { ILoginResponse, IUserAtom } from "./types"
import { atom } from 'jotai'

export const userAtom = atomWithReset<IUserAtom | null>(null)
const loadUser = () => 
    api<IUserAtom>("/user").then(r => {
        return r
    })

export const loadUserAtom = atom(
    (get) => get(userAtom),
    async (_get, set, novo?: IUserAtom | null) => {
        if (novo !== undefined) {
            set(userAtom, novo) 
            return
        }
        if (_get(userAtom) !== null) 
            return

        const response = await loadUser()
        set(userAtom, {...response, isAdmin: response.perfil.toLowerCase() === "admin"})
    }
)

export const login = async (userName: string, password: string) => 
    api<ILoginResponse>("/user/login", {
        method: "POST",
        body: JSON.stringify({
            userName: userName,
            password: password
        })},
    )
    .then((r) => r)
    .catch((e) => {
        return {
            success: false,
            message: e.message
        } as ILoginResponse
    })

export const logout = async () => 
    api("/user/logout", {
        method: "POST",
    })

