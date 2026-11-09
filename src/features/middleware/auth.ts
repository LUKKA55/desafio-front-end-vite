import { redirect } from "react-router";
import { api } from "../api";

export const authLoader = async () =>
    api("/user/verify-session", {
        method: "GET",
        credentials: "include"
    }, 
    false,
    () => { throw redirect("/login")});