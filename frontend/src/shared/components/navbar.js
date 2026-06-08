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
      <h2 className="logo">Elite Coders</h2>

      <div className="nav-links">
        <Link style={{ textDecoration: "none" }} to="/">
          Accueil
        </Link>

        <Link style={{ textDecoration: "none" }} to="/ateliers">
          Ateliers
        </Link>

        {isAdmin && (
          <Link style={{ textDecoration: "none" }} to="/admin">
            Espace Admin
          </Link>
        )}

        {isFormateur && (
          <>
            <Link style={{ textDecoration: "none" }} to="/formateur">
              Workspace
            </Link>

            <Link style={{ textDecoration: "none" }} to="/formateur/rapports">
              Historique
            </Link>
          </>
        )}

        {isParent && (
          <>
            <Link style={{ textDecoration: "none" }} to="/parent">
              Espace Parent
            </Link>

            <Link style={{ textDecoration: "none" }} to="/parent/reservations">
              Mes Réservations
            </Link>
          </>
        )}

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

// Quand l'utilisateur se connecte,
//  React envoie l'email et le mot de
//  passe à Laravel. Laravel vérifie les
//   informations puis renvoie un token et les
//   informations de l'utilisateur au format JSON.
//    Ensuite React enregistre le user et le token
//    dans localStorage. Après cela, Navbar récupère
//     le user depuis localStorage et vérifie son rôle
//      pour afficher les liens correspondants.

//local storage
// J'utilise localStorage pour conserver les informations
//  de l'utilisateur connecté même après un
//  rafraîchissement de la page.
