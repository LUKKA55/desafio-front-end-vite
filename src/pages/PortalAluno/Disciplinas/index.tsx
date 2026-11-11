import {
    Box,
    Button,
    Chip,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography
} from "@mui/material"

import { useState } from "react"

const PortalAlunoDisciplinas = () => {

    const [matriculado, setMatriculado] = useState(false)

    return (
        <Box>

            <Typography variant="h4" fontWeight={700}>
                Disciplinas Ofertadas
            </Typography>

            <Typography
                color="text.secondary"
                sx={{ mb: 4 }}
            >
                Área do aluno
            </Typography>

            <TextField
                fullWidth
                placeholder="Pesquisar disciplina..."
                sx={{ mb: 3 }}
            />

            <TableContainer component={Paper}>

                <Table>

                    <TableHead>
                        <TableRow>
                            <TableCell>Disciplina</TableCell>
                            <TableCell>Professor</TableCell>
                            <TableCell>Horário</TableCell>
                            <TableCell>Vagas</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>

                        <TableRow>
                            <TableCell>Programação Front-End</TableCell>
                            <TableCell>Carlos Lima</TableCell>

                            <TableCell>
                                <Chip
                                    label="43"
                                    color="primary"
                                />
                            </TableCell>

                            <TableCell>34</TableCell>

                            <TableCell>
                                <Button
                                    variant="contained"
                                    color="success"
                                    disabled
                                >
                                    Matriculado
                                </Button>
                            </TableCell>
                        </TableRow>

                        <TableRow>
                            <TableCell>Arquitetura de Software</TableCell>
                            <TableCell>Ana Souza</TableCell>

                            <TableCell>
                                <Chip
                                    label="23"
                                    color="primary"
                                />
                            </TableCell>

                            <TableCell>40</TableCell>

                            <TableCell>
                                <Button
    variant="contained"
    color={matriculado ? "success" : "primary"}
    disabled={matriculado}
    onClick={() => setMatriculado(true)}
>
    {matriculado ? "Matriculado" : "Matricular"}
</Button>
                            </TableCell>
                        </TableRow>

                    </TableBody>

                </Table>

            </TableContainer>

        </Box>
    )
}

export default PortalAlunoDisciplinas