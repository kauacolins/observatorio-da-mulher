import React from "react";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src="/logo.png" alt="Logo" />
      </div>
      <ul className="navbar-links">
        <li><a href="/">Home</a></li>
        <li><a href="/formulario">Formulário</a></li>
        <li><a href="/dashboard">Dashboard</a></li>
        <li><a href="/sobre">Sobre</a></li>
        <li><a href="/entrar">Entrar</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;
