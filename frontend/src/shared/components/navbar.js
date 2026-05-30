import { Link, useNavigate } from "react-router-dom";
import "../../styles/navbar.css";

export function Navbar() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const isLoggedIn = !!user;

  const isFormateur = user?.role === "formateur";
  const isParent = user?.role === "parent";
  const isAdmin = user?.role === "admin";

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

        <Link
          style={{ textDecoration: "none" }}
          to="/"
        >
          Accueil
        </Link>

        {/* ATELIERS */}

        <Link
          style={{ textDecoration: "none" }}
          to="/ateliers"
        >
          Ateliers
        </Link>

        {/* ADMIN */}

        {isAdmin && (
          <Link
            style={{ textDecoration: "none" }}
            to="/admin"
          >
            Espace Admin
          </Link>
        )}

        {/* FORMATEUR */}

        {isFormateur && (
          <>
            <Link
              style={{ textDecoration: "none" }}
              to="/formateur"
            >
              Espace Formateur
            </Link>

            <Link
              style={{ textDecoration: "none" }}
              to="/formateur/rapports"
            >
              Historique
            </Link>
          </>
        )}

        {/* PARENT */}

        {isParent && (
          <>
            <Link
              style={{ textDecoration: "none" }}
              to="/parent"
            >
              Espace Parent
            </Link>

            <Link
              style={{ textDecoration: "none" }}
              to="/parent/reservations"
            >
              Mes Réservations
            </Link>
          </>
        )}

        {/* NOT LOGGED IN */}

        {!isLoggedIn ? (
          <>
            <Link
              style={{ textDecoration: "none" }}
              to="/login"
            >
              Connexion
            </Link>

            <Link
              style={{ textDecoration: "none" }}
              to="/register"
            >
              Inscription
            </Link>
          </>
        ) : (
          <button
            className="logout-btn"
            onClick={logout}
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;