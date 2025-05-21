import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css"

const Navbar = () => {
  return (
    <nav className="navbar">
      <NavLink className="navbrand">
        <img src="/logo.png" alt="" />
      </NavLink>
      <div className="navlinks">
        <NavLink className="navlink" to={"/"}>Home</NavLink>
        <NavLink className="navlink" to={"/formulario"}>Formulário</NavLink>
        <NavLink className="navlink" to={"/dashboard"}>Dashboard</NavLink>
        <NavLink className="navlink" to={"/login"}>Login</NavLink>
        <NavLink className="navlink" to={"/register"}></NavLink>
      </div>

    </nav>
  );
};

export default Navbar;
