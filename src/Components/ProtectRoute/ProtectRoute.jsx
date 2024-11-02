import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectRoute({ isLogin, children }) {
  if (isLogin && localStorage.getItem("token")) {
    return children;
  } else {
    return <Navigate to="/login" replace={true} />;
  }
}
