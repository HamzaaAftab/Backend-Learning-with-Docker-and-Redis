import Home from "./pages/Home"
import Login from "./pages/Login"
import SignUp from "./pages/SignUp"
import { createBrowserRouter, RouterProvider } from "react-router-dom"

//Routes
const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <Home/>,
  },
  {
    path: '/signup',
    element: <SignUp/>,
  },
  {
    path: '/login',
    element: <Login/>,
  }
])

const App = () => {
  return (
   <RouterProvider router={appRouter} />

  )
}

export default App
