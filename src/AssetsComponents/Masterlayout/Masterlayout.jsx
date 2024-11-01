import React from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { Outlet } from "react-router-dom";

export default function Masterlayout() {
  return (
    <>
      <Navbar />
      <div className="container-md my-3">
        <Outlet></Outlet>
      </div>
      <Footer />
    </>
  );
}
