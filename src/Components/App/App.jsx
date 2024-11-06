import "./App.css";
import Masterlayout from "../../AssetsComponents/Masterlayout/Masterlayout";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
  useLocation,
  useNavigate,
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
import { useCallback, useEffect, useState } from "react";
import Profile from "../Profile/Profile";
import ProtectRoute from "../ProtectRoute/ProtectRoute";

const App = () => {
  const [userData, setUserData] = useState(null);
  const [isLogin, setIsLogin] = useState(false);

  const saveUserData = useCallback(() => {
    return IsLogin(); // Call your login check function
  }, []);

  const checkToken = (exp) => {
    return Date.now() < exp * 1000;
  };

  const IsLogin = () => {
    if (localStorage.getItem("token")) {
      let decodedToken = jwtDecode(localStorage.getItem("token"));
      setUserData(decodedToken);
      if (checkToken(decodedToken.exp)) {
        setIsLogin(true);
      } else {
        localStorage.removeItem("token");
        setIsLogin(false);
      }
    }
  };
  const logOut = () => {
    localStorage.removeItem("token");
    setUserData(null);
    setIsLogin(false);
  };
  //save data while refreshing :)
  useEffect(() => {
    if (localStorage.getItem("token")) {
      saveUserData();
    }
  }, [saveUserData]);

  const routes = createBrowserRouter([
    {
      path: "/",
      element: (
        <Masterlayout IsLogin={isLogin} logOut={logOut} userdata={userData} />
      ),
      children: [
        {
          index: true,
          element: (
            <ProtectRoute isLogin={isLogin}>
            
              <Home />
            </ProtectRoute>
          ),
        },
        {
          path: "about",
          element: (
            <ProtectRoute isLogin={isLogin}>
            
              <About />
            </ProtectRoute>
          ),
        },
        {
          path: "movies",
          element: (
            <ProtectRoute isLogin={isLogin}>
              <Movies />
            </ProtectRoute>
          ),
        },
        {
          path: "people",
          element: (
            <ProtectRoute isLogin={isLogin}>
              <People />
            </ProtectRoute>
          ),
        },
        {
          path: "network",
          element: (
            <ProtectRoute isLogin={isLogin}>
              <Network />
            </ProtectRoute>
          ),
        },
        {
          path: "tvshows",
          element: (
            <ProtectRoute isLogin={isLogin}>
              <Tvshows />{" "}
            </ProtectRoute>
          ),
        },
        {
          path: "profile",
          element: (
            <ProtectRoute isLogin={isLogin}>
              <Profile userData={userData} />
            </ProtectRoute>
          ),
        },
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
};

export default App;
