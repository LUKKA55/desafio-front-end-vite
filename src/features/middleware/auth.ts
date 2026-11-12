import { redirect } from "react-router";
import { api } from "../api";

let ultimaValidacao = 0
const INTERVALO = 180_000 // 3min

export const authLoader = async () => {
    const agora = Date.now()

    if (agora - ultimaValidacao >= INTERVALO) {
        await api(
            "/user/verify-session",
            {},
            false,
            () => { throw redirect("/login") }
        )
        ultimaValidacao = Date.now()
    }

    return null
}