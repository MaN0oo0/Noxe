import React from "react";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.scss";
export default function Navbar() {
  return (
    <>
      <nav className={`navbar navbar-expand-lg ${styles.bg_dark}`}>
        <div className="container-fluid">
          <Link className="navbar-brand" to={``}>
            <h2 className="main-title">
              <b>Noxe</b>
            </h2>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link " to={""}>
                  Home
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to={`movies`}>
                  Movies
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={`tvshows`}>
                  Tv shows
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={`people`}>
                  People
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={`about`}>
                  About
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={`network`}>
                  Networks
                </Link>
              </li>
            </ul>

            <form className="d-flex" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              {/* <button className="btn btn-outline-success" type="submit">
                Search
              </button> */}
            </form>
            <div className={`${styles.Nav_Icons}`}>
              <i className="fa fa-brands fa-facebook-f"></i>
              <i className="fa fa-brands fa-x-twitter"></i>
              <i className="fa fa-brands fa-instagram"></i>
              <i className="fa-brands fa-spotify"></i>
            </div>
            <div className="Nav_btns">
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link className="nav-link " to={"login"}>
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link " to={"register"}>
                    Register
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link " to={"login"}>
                    Logout
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
