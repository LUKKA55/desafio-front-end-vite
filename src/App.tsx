import { createBrowserRouter, RouterProvider } from "react-router"

import Box from "@mui/material/Box"

import Home from "./pages/Home"
import Login from "./pages/Login"

import { authLoader } from "./features/middleware/auth"
import LayoutPage from "./pages/components/layout"

export const router = createBrowserRouter([
	{
		path: "/login",
		element: <Login />,
	},
	{
		element: <LayoutPage />,
		loader: authLoader,
		children: [
			{
				path: "/",
				element: <Home />,
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
