import {
    Box,
    Button,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from "@mui/material"

const PortalAlunoMatriculas = () => {

    return (
        <Box>

            <Typography variant="h4" fontWeight={700}>
                Minhas Matrículas
            </Typography>

            <Typography
                color="text.secondary"
                sx={{ mb: 4 }}
            >
                Área do aluno
            </Typography>

            <TableContainer component={Paper}>

                <Table>

                    <TableHead>
                        <TableRow>
                            <TableCell>Disciplina</TableCell>
                            <TableCell>Professor</TableCell>
                            <TableCell>Horário</TableCell>
                            <TableCell>Ação</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>

                        <TableRow>
                            <TableCell>
                                Programação Front-End
                            </TableCell>

                            <TableCell>
                                Carlos Lima
                            </TableCell>

                            <TableCell>
                                43
                            </TableCell>

                            <TableCell>
                                <Button
                                    color="error"
                                    variant="contained"
                                >
                                    Cancelar
                                </Button>
                            </TableCell>

                        </TableRow>

                    </TableBody>

                </Table>

            </TableContainer>

        </Box>
    )
}

export default PortalAlunoMatriculas