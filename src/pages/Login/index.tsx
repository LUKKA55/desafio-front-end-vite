import { Box, Button, TextField } from "@mui/material"

const Login = () => {
    return (
        <Box>
            <TextField label={"Usuário"} />
            <TextField label={"Senha"} />
            <Button>Entrar</Button>
        </Box>
    )
}

export default Login