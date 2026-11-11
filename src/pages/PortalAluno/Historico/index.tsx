import {
    Box,
    Chip,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from "@mui/material"

const PortalAlunoHistorico = () => {

    return (

        <Box>

            <Typography variant="h4" fontWeight={700}>
                Histórico Acadêmico
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
                            <TableCell>Média</TableCell>
                            <TableCell>Situação</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>

                        <TableRow>
                            <TableCell>
                                Lógica de Programação
                            </TableCell>

                            <TableCell>
                                8.5
                            </TableCell>

                            <TableCell>

                                <Chip
                                    label="Aprovado"
                                    color="success"
                                />

                            </TableCell>

                        </TableRow>

                        <TableRow>
                            <TableCell>
                                Banco de Dados
                            </TableCell>

                            <TableCell>
                                7.2
                            </TableCell>

                            <TableCell>

                                <Chip
                                    label="Aprovado"
                                    color="success"
                                />

                            </TableCell>

                        </TableRow>

                    </TableBody>

                </Table>

            </TableContainer>

        </Box>

    )
}

export default PortalAlunoHistorico