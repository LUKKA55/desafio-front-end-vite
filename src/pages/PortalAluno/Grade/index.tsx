import {
    Box,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from "@mui/material"

const PortalAlunoGrade = () => {

    return (

        <Box>

            <Typography variant="h4" fontWeight={700}>
                Minha Grade Horária
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
                            <TableCell>Turno</TableCell>
                            <TableCell>Segunda</TableCell>
                            <TableCell>Terça</TableCell>
                            <TableCell>Quarta</TableCell>
                            <TableCell>Quinta</TableCell>
                            <TableCell>Sexta</TableCell>
                        </TableRow>

                    </TableHead>

                    <TableBody>

                        <TableRow>
                            <TableCell>Manhã</TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                        </TableRow>

                        <TableRow>
                            <TableCell>Tarde</TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                        </TableRow>

                        <TableRow>
                            <TableCell>Noite</TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell>
                                Programação Front-End
                            </TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                        </TableRow>

                    </TableBody>

                </Table>

            </TableContainer>

        </Box>

    )
}

export default PortalAlunoGrade