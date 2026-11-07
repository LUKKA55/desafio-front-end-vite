export const api = async <T>(caminho: string, opcoes?: RequestInit): Promise<T> => {
    const resposta = await fetch(`/api${caminho}`, {
        ...opcoes,
        headers: { "Content-Type": "application/json" },
    })

    if (!resposta.ok) {
        const corpo = await resposta.json().catch(() => null)
        const mensagem = corpo?.errorMessages?.join(" ") ?? "Erro ao conectar com o servidor"
        throw new Error(mensagem)
    }

    if (resposta.status === 204) return undefined as T

    return resposta.json()
}