export const api = async <T>(caminho: string, opcoes?: RequestInit, returnJson: boolean = true, actionWhenNotOk?: () => null): Promise<T> => {
    const resposta = await fetch(`/api${caminho}`, {
        ...opcoes,
        credentials: "include", 
        headers: { "Content-Type": "application/json" },
    })

    if (!resposta.ok) {
        if(!!actionWhenNotOk){
            actionWhenNotOk()
            
        } else {
            const corpo = await resposta.json().catch(() => null)
            const mensagem = corpo?.errorMessages?.join(" ") ?? "Erro ao conectar com o servidor"
            throw new Error(mensagem)
        }
    }

    if (resposta.status === 204) return undefined as T

    if(!returnJson)
        return null as T

    return resposta.json()
}