import { Link, useNavigate } from "react-router-dom";
import "../../styles/navbar.css";

export function Navbar() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  //récupère l'utilisateur enregistré dans le navigateur.
  //transforme ce texte en objet JavaScript.

  const isLoggedIn = !!user;
   //veut dire :
   //Est-ce qu'un utilisateur est connecté ?
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
     //Il supprime les informations de connexion du navigateur lors du logout.
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
//J'utilise Link au lieu de balise a car 
//Link change la page sans recharger toute
//  l'application React.
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
