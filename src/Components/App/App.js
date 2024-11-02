import "./App.css";
import Masterlayout from "../../AssetsComponents/Masterlayout/Masterlayout";
import {
  createBrowserRouter,
  RouterProvider,
  BrowserRouter,
} from "react-router-dom";
import Home from "../Home/Home";
import About from "../About/About";
import Movies from "../Movies/Movies";
import People from "../People/People";
import Network from "../Network/Network";
import NotFound from "../NotFound/NotFound";
import LoginForm from "../LoginForm/LoginForm";
import RegisterForm from "../RegisterForm/RegisterForm";
import Tvshows from "../Tvshows/Tvshows";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import Profile from "../Profile/Profile";

function App() {
  const [userData, setUserData] = useState(null);
  const [isLogin, setIsLogin] = useState(false);

  const saveUserData = () => {
    if (IsLogin()) {
      let encodedToken = localStorage.getItem("token");
      let decodedToken = jwtDecode(encodedToken);
      if (checkToken(decodedToken.exp)) {
        setUserData(decodedToken);
        setIsLogin(true);
        // Route("/") // Note: `navigate` should be defined within the context of a component
      } else {
        setIsLogin(false);
        localStorage.removeItem("token");
      }
    }
  };

  const checkToken = (exp) => {
    return Date.now() < exp * 1000;
  };

  const IsLogin = () => {
    return !!localStorage.getItem("token");
  };
  const logOut = () => {
    localStorage.removeItem("token");
    setIsLogin(false);
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      saveUserData();
    }
  }, []);

  const routes = createBrowserRouter([
    {
      path: "/",
      element: (
        <Masterlayout IsLogin={isLogin} logOut={logOut} userdata={userData} />
      ),
      children: [
        { index: true, element: <Home /> },
        { path: "about", element: <About /> },
        { path: "movies", element: <Movies /> },
        { path: "people", element: <People /> },
        { path: "network", element: <Network /> },
        { path: "tvshows", element: <Tvshows /> },
        { path: "profile", element: <Profile userData={userData} /> },
        { path: "login", element: <LoginForm saveUserData={saveUserData} /> },
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
