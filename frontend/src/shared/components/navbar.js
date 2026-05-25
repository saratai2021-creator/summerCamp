import { Link } from "react-router-dom";
import "../../styles/navbar.css";

export function Navbar() {
  return (
    <nav className="navbar">
      {/* website logo / brand name */}
      <h2 className="logo">Elite Coders</h2>

      {/* navigation links */}
      <div className="nav-links">
        {/* home */}
        <Link style={{ textDecoration: "none" }} to="/">
          Accueil
        </Link>

        {/* ateliers */}
        <Link style={{ textDecoration: "none" }} to="/ateliers">
          Ateliers
        </Link>

        {/* login */}
        <Link style={{ textDecoration: "none" }} to="/login">
          Connexion
        </Link>
        <Link style={{ textDecoration: "none" }} to="/register">
          Inscription
        </Link>
      </div>
    </nav>
  );
}
