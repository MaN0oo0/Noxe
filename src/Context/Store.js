import axios from "axios";
import {jwtDecode} from "jwt-decode"; // Ensure you import jwt-decode correctly
import { createContext, useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export let AuthContext = createContext({});

export default function AuthContextProvider(props) {
  const [userData, setUserData] = useState(null);
  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate(); // Use useNavigate for navigation

  const logOut = () => {
    localStorage.removeItem("token");
    setUserData(null);
    setIsLogin(false);
  };

  const login = async (body) => {
    try {
      const res = await axios.post(
        "https://localhost:7103/api/Auth/GetUserToken/token",
        body
      );
      if (res.status === 200) {
        localStorage.setItem("token", res.data.token);
        saveUserData(); // Call to save user data
        setIsLogin(true);
        navigate("/"); // Programmatically navigate to the main page
      }
    } catch (error) {
      console.error("Login error:", error);
      // Handle error (e.g., show a message to the user)
    }
  };

  const saveUserData = useCallback(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      if (checkToken(decodedToken.exp)) {
        setUserData(decodedToken);
        setIsLogin(true);
      } else {
        localStorage.removeItem("token");
        setIsLogin(false);
      }
    }
  }, []);

  const checkToken = (exp) => {
    return Date.now() < exp * 1000;
  };

  useEffect(() => {
    // Check token on mount
    saveUserData();
  }, [saveUserData]);

  return (
    <AuthContext.Provider value={{ isLogin, logOut, login, userData }}>
      {props.children}
    </AuthContext.Provider>
  );
}
