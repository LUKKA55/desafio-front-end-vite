interface ILoginResponse {
    success: boolean
    message: string
    errorMessage: string
}

export const login = async (userName: string, password: string) => {
    const response = await fetch("http://localhost:9000/user/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
            userName: userName,
            password: password
        })
    }).then(r => r.json()) as ILoginResponse

    return response;
}