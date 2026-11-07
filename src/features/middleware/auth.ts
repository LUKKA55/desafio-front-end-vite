import { redirect } from "react-router";

export const authLoader = async () => {
    const response = await fetch("http://localhost:9000/user/verify-session", {
        method: "GET",
        credentials: "include"
    });

    if (!response.ok)
        throw redirect("/login");
}