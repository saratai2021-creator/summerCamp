import { Link, useNavigate } from "react-router-dom";
import "../../styles/navbar.css";

export function Navbar() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const isLoggedIn = !!user;

  const isFormateur = user?.role === "formateur";
  // <<<<<<< HEAD

  //   const isParent = user?.role === "parent";

  //   /*
  //   |--------------------------------------------------------------------------
  //   | Logout
  //   |--------------------------------------------------------------------------
  //   */
  // =======
  const isParent = user?.role === "parent";
  const isAdmin = user?.role === "admin";
  // >>>>>>> 947ef4f569d34e65a0b5f3820c2fc2e783609f2e

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

        {/* ADMIN */}

        {isAdmin && (
          <Link style={{ textDecoration: "none" }} to="/admin">
            Espace Admin
          </Link>
        )}

        {/* FORMATEUR */}

        {isFormateur && (
          <>
            {/* <<<<<<< HEAD */}
            {/* WORKSPACE */}

            <Link style={{ textDecoration: "none" }} to="/formateur">
              Workspace
            </Link>
            {/* =======
            <Link
              style={{ textDecoration: "none" }}
              to="/formateur"
            >
              Espace Formateur
>>>>>>> 947ef4f569d34e65a0b5f3820c2fc2e783609f2e
            </Link> */}

            <Link style={{ textDecoration: "none" }} to="/formateur/rapports">
              Historique
            </Link>
          </>
        )}

        {/* PARENT */}

        {isParent && (
          // <<<<<<< HEAD
          //           <Link style={{ textDecoration: "none" }} to="/visiteur">
          //             Dashboard
          //           </Link>
          //         )}

          //         {/* NON CONNECTÉ */}
          // =======
          <>
            <Link style={{ textDecoration: "none" }} to="/parent">
              Espace Parent
            </Link>

            <Link style={{ textDecoration: "none" }} to="/parent/reservations">
              Mes Réservations
            </Link>
          </>
        )}

        {/* NOT LOGGED IN */}
        {/* >>>>>>> 947ef4f569d34e65a0b5f3820c2fc2e783609f2e */}

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
          <button className="logout-btn" onClick={logout}>
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
