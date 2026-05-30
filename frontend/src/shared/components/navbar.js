import { Link, useNavigate } from "react-router-dom";

import "../../styles/navbar.css";

export function Navbar() {
  const navigate = useNavigate();

  /*
  |--------------------------------------------------------------------------
  | Utilisateur connecté
  |--------------------------------------------------------------------------
  */

  const user = JSON.parse(localStorage.getItem("user"));

  /*
  |--------------------------------------------------------------------------
  | Vérifications
  |--------------------------------------------------------------------------
  */

  const isLoggedIn = !!user;

  const isFormateur = user?.role === "formateur";

  const isParent = user?.role === "parent";

  /*
  |--------------------------------------------------------------------------
  | Logout
  |--------------------------------------------------------------------------
  */

  function logout() {
    localStorage.removeItem("user");

    localStorage.removeItem("token");

    navigate("/login");
  }

  return (
    <nav className="navbar">
      {/* LOGO */}

      <h2 className="logo">Elite Coders</h2>

      {/* LINKS */}

      <div className="nav-links">
        {/* HOME */}

        <Link style={{ textDecoration: "none" }} to="/">
          Accueil
        </Link>

        {/* ATELIERS */}

        <Link style={{ textDecoration: "none" }} to="/ateliers">
          Ateliers
        </Link>

        {/* FORMATEUR */}

        {isFormateur && (
          <>
            {/* WORKSPACE */}

            <Link style={{ textDecoration: "none" }} to="/formateur">
              Workspace
            </Link>

            {/* HISTORIQUE */}

            <Link style={{ textDecoration: "none" }} to="/formateur/rapports">
              Historique
            </Link>
          </>
        )}

        {/* PARENT */}

        {isParent && (
          <Link style={{ textDecoration: "none" }} to="/visiteur">
            Dashboard
          </Link>
        )}

        {/* NON CONNECTÉ */}

        {!isLoggedIn ? (
          <>
            <Link style={{ textDecoration: "none" }} to="/login">
              Connexion
            </Link>

            <Link style={{ textDecoration: "none" }} to="/register">
              Inscription
            </Link>
          </>
        ) : (
          /* CONNECTÉ */

          <button className="logout-btn" onClick={logout}>
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
