import "./App.css";
import Masterlayout from "../../AssetsComponents/Masterlayout/Masterlayout";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../Home/Home";
import About from "../About/About";
import Movies from "../Movies/Movies";
import People from "../People/People";
import Network from "../Network/Network";
import NotFound from "../NotFound/NotFound";
import LoginForm from "../LoginForm/LoginForm";
import RegisterForm from "../RegisterForm/RegisterForm";
import Tvshows from "../Tvshows/Tvshows";

function App() {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <Masterlayout />,
      children: [
        { index: true, element: <Home /> },
        { path: "about", element: <About /> },
        { path: "movies", element: <Movies /> },
        { path: "people", element: <People /> },
        { path: "network", element: <Network /> },
        { path: "tvshows", element: <Tvshows /> },
        { path: "login", element: <LoginForm /> },
        { path: "register", element: <RegisterForm /> },
      ],
      errorElement: <NotFound />,
    },
  ]);

  return (
    <>
      <RouterProvider router={routes} />
    </>
  );
}

export default App;
