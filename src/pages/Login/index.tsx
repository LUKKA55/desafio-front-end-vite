import { Alert, Box, Button, Paper, TextField, Typography } from "@mui/material"
import { Controller, useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { login } from "../../features/user/service"
import Loading from "../components/loading";
import { useState } from "react";
import { useNavigate } from "react-router"
import { loginSchema } from "../../features/user/schema";

const Login = () => {
    const navigate = useNavigate()

    const [ isLoading, setIsLoading ] = useState<boolean>(false)
    const [ alert, setAlert ] = useState<{show: boolean, message: string, success: boolean} | null>(null)

    const {
        handleSubmit,
        control
    } = useForm({ 
        mode: "onBlur", 
        resolver:  yupResolver(loginSchema)
    })

    return (
        <Box 
            sx={{
                position: "absolute",
                translate: "-50% -50%",
                left: "50%",
                top: "50%",
            }}
        >
            {
                alert?.show &&
                <Alert sx={{ mb: 2}} color={alert?.success ? "success" : "error"}>
                    {alert?.message}
                </Alert>
            }
            <Paper 
                sx={{
                    padding: "50px 15px 25px 15px",
                    width: "450px"
                }}
            >
                <Box
                    sx={{
                        mb: 4,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                    }}
                >
                    <Typography variant="h4" color="primary">Matrículas</Typography>
                </Box>
                <Box
                    sx={{
                        mb: 4
                    }}
                >
                    <Controller
                        control={control}
                        name="userName"
                        render={({field, fieldState}) => 
                            <>
                                <TextField 
                                    {...field} 
                                    fullWidth 
                                    label="Usuário" 
                                    error={fieldState.invalid}
                                />
                                {
                                    fieldState.invalid &&
                                    <Typography color="error">{fieldState.error?.message}</Typography>
                                }
                            </>
                        }
                    />
                </Box>
                <Box
                    sx={{
                        mb: 4
                    }}
                >
                    <Controller
                        control={control}
                        name="password"
                        render={({field, fieldState}) => 
                            <>
                                <TextField 
                                    {...field} 
                                    fullWidth 
                                    label="Senha" 
                                    error={fieldState.invalid}
                                />
                                {
                                    fieldState.invalid &&
                                    <Typography color="error">{fieldState.error?.message}</Typography>
                                }
                            </>
                        }
                    />
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                    }}
                >
                    <Button 
                        sx={{
                            paddingLeft: "40px",
                            paddingRight: "40px" 
                        }}
                        variant="contained" 
                        size="large"
                        onClick={handleSubmit(async (values) => {
                            setIsLoading(true)
                            const response = await login(values.userName, values.password)
                            setIsLoading(false)

                            setAlert({ 
                                message: response.message, 
                                show: true, 
                                success: response.success 
                            })

                            if(response.success)
                                setTimeout(() => {
                                    navigate("/")
                                }, 300)

                            setTimeout(() => {
                                setAlert(null)
                            }, 3000)
                        })}
                    >
                        Entrar
                    </Button>
                </Box>
                <Loading isLoading={isLoading} />
            </Paper>
        </Box>
    )
}

export default Login