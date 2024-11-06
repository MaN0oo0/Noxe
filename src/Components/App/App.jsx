import "./App.css";
import Masterlayout from "../../AssetsComponents/Masterlayout/Masterlayout";
import {
  BrowserRouter,
  Route,
  Routes,
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


import Profile from "../Profile/Profile";
import ProtectRoute from "../ProtectRoute/ProtectRoute";
import Details from "../Details/Details";
import AuthContextProvider, { AuthContext } from "../../Context/Store";
import { useContext } from "react";

const App = () => {
  // const [userData, setUserData] = useState(null);

  // const saveUserData = useCallback(() => {
  //   return IsLogin(); // Call your login check function
  // }, []);

  // const checkToken = (exp) => {
  //   return Date.now() < exp * 1000;
  // };

  // const IsLogin = () => {
  //   if (localStorage.getItem("token")) {
  //     let decodedToken = jwtDecode(localStorage.getItem("token"));

  //     if (checkToken(decodedToken.exp)) {
  //       setUserData(decodedToken);
  //     } else {
  //       localStorage.removeItem("token");
  //     }
  //   }
  // };
  // // const logOut = () => {
  // //   localStorage.removeItem("token");
  // //   setUserData(null);
  // //   setIsLogin(false);
  // // };
  // //save data while refreshing :)
  // useEffect(() => {
  //   if (localStorage.getItem("token")) {
  //     saveUserData();
  //   }
  // }, []);

  // const routes = createBrowserRouter([
  //   {
  //     path: "/",
  //     element: <Masterlayout userdata={userData} />,
  //     children: [
  //       {
  //         path: "",
  //         element: (
  //           <ProtectRoute>
  //             <Home />
  //           </ProtectRoute>
  //         ),
  //       },
  //       {
  //         path: "about",
  //         element: (
  //           <ProtectRoute>
  //             <About />
  //           </ProtectRoute>
  //         ),
  //       },
  //       {
  //         path: "movies",
  //         element: (
  //           <ProtectRoute>
  //             <Movies />
  //           </ProtectRoute>
  //         ),
  //       },
  //       {
  //         path: "details/:type/:id",
  //         element: (
  //           <ProtectRoute>
  //             <Details />
  //           </ProtectRoute>
  //         ),
  //       },
  //       {
  //         path: "people",
  //         element: (
  //           <ProtectRoute>
  //             <People />
  //           </ProtectRoute>
  //         ),
  //       },
  //       {
  //         path: "network",
  //         element: (
  //           <ProtectRoute>
  //             <Network />
  //           </ProtectRoute>
  //         ),
  //       },
  //       {
  //         path: "tvshows",
  //         element: (
  //           <ProtectRoute>
  //             <Tvshows />
  //           </ProtectRoute>
  //         ),
  //       },
  //       {
  //         path: "profile",
  //         element: (
  //           <ProtectRoute>
  //             <Profile userData={userData} />
  //           </ProtectRoute>
  //         ),
  //       },
  //       { path: "login", element: <LoginForm /> },
  //       { path: "register", element: <RegisterForm /> },
  //     ],
  //     errorElement: <NotFound />,
  //   },
  // ]);

  return (
    <>
      {/* <AuthContextProvider>
          <RouterProvider router={routes} />
        </AuthContextProvider> */}

      <BrowserRouter>
        <AuthContextProvider>
          <Routes>
            <Route path="/" element={<Masterlayout />}>
              <Route
                index={true}
                element={
                  <ProtectRoute>
                    <Home />
                  </ProtectRoute>
                }
              />
              <Route
                path="about"
                element={
                  <ProtectRoute >
                    <About />
                  </ProtectRoute>
                }
              />
              <Route
                path="movies"
                element={
                  <ProtectRoute >
                    <Movies />
                  </ProtectRoute>
                }
              />
              <Route
                path="details/:type/:id"
                element={
                  <ProtectRoute>
                    <Details />
                  </ProtectRoute>
                }
              />
              <Route
                path="people"
                element={
                  <ProtectRoute>
                    <People />
                  </ProtectRoute>
                }
              />
              <Route
                path="network"
                element={
                  <ProtectRoute>
                    <Network />
                  </ProtectRoute>
                }
              />
              <Route
                path="tvshows"
                element={
                  <ProtectRoute>
                    <Tvshows />
                  </ProtectRoute>
                }
              />
              <Route
                path="profile"
                element={
                  <ProtectRoute>
                    <Profile />
                  </ProtectRoute>
                }
              />
              <Route path="login" element={<LoginForm />} />
              <Route path="register" element={<RegisterForm />} />
              {/* Add other routes here */}
              <Route path="*" element={<NotFound />} /> {/* Catch-all route */}
            </Route>
          </Routes>
        </AuthContextProvider>
      </BrowserRouter>
    </>
  );
};

export default App;
