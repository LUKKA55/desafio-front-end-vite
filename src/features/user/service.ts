import { api } from "../api"
import type { ILoginResponse, IUserAtom } from "./types"
import { atom } from 'jotai'

const userAtom = atom<IUserAtom | null>(null)
const loadUser = () => 
    api<IUserAtom>("/user", {
        credentials:"include"
    }).then(r => {
        return r
    })

export const loadUserAtom = atom(
  (get) => get(userAtom),
  async (_get, set) => {
    const response = await loadUser()
    set(userAtom, response)
  }
)

export const login = async (userName: string, password: string) => 
    api<ILoginResponse>("/user/login", {
        method: "POST",
        credentials: "include", 
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

