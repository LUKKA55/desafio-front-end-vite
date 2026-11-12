import { createBrowserRouter, RouterProvider } from "react-router"

import Box from "@mui/material/Box"

import Home from "./pages/Home"
import Login from "./pages/Login"
import Turmas from "./pages/Turmas"
import Professores from "./pages/Professores"
import Alunos from "./pages/Alunos"
import PortalAluno from "./pages/PortalAluno"

import { authLoader } from "./features/middleware/auth"
import LayoutPage from "./pages/components/layout"

import PortalAlunoDisciplinas from "./pages/PortalAluno/Disciplinas"
import PortalAlunoMatriculas from "./pages/PortalAluno/Matriculas"
import PortalAlunoGrade from "./pages/PortalAluno/Grade"

export const router = createBrowserRouter([
	{
		path: "/login",
		element: <Login />,
	},
	{
		element: <LayoutPage />,
		loader: authLoader,
		shouldRevalidate: () => true,
		children: [
			{
				path: "/",
				element: <Home />,
			},
			{
				path: "/turmas",
				element: <Turmas />
			},
			{
				path: "/professores",
				element: <Professores />
			},
			{
				path: "/alunos",
				element: <Alunos />
			},
            {
                path: "/portal-aluno",
                element: <PortalAluno />
            },
            {
				path: "/portal-aluno/disciplinas",
				element: <PortalAlunoDisciplinas  />
			},
			{
				path: "/portal-aluno/matriculas",
				element: <PortalAlunoMatriculas  />
			},
			{
			path: "/portal-aluno/grade",
				element: <PortalAlunoGrade  />
			}
		]
	}
]);

const App = () => {

 	return (
		<Box>
			<RouterProvider router={router} />
		</Box>
  	)
}

export default App
