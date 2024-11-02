import React from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { Outlet } from "react-router-dom";

export default function Masterlayout(props) {
  return (
    <>
      <Navbar IsLogin={props.IsLogin} logOut={props.logOut} userdata={props.userdata}/>
      <div className="container-md my-3">
        <Outlet></Outlet>
      </div>
      <Footer />
    </>
  );
}
