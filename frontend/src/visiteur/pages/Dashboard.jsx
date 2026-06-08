import { useNavigate } from "react-router-dom";

import "../../styles/Dashboard.css";

export function Dashboard() {
  const navigate = useNavigate();

  // Utilisateur connecté
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="dashboard-container">
      {/* EN-TÊTE */}
      <div className="dashboard-topbar">
        <div>
          {/* Nom de l'académie */}
          <h2 className="dashboard-logo">FormaCamp Academy</h2>

          {/* Sous-titre */}
          <p className="dashboard-subtitle">Espace Parent</p>
        </div>
      </div>

      {/* MESSAGE DE BIENVENUE */}
      <div className="dashboard-hero">
        <div>
          <h1>Bon retour, {user?.name || "Parent"} 👋</h1>

          <p>
            Gérez facilement les ateliers, les réservations et le suivi
            pédagogique de votre enfant.
          </p>
        </div>
      </div>

      {/* CARTES PRINCIPALES */}
      <div className="dashboard-cards">
        {/* PROFIL */}
        <div className="dashboard-card">
          <div className="card-icon">👤</div>

          <h2>Mon Profil</h2>

          <p>Consultez vos informations personnelles.</p>

          <button onClick={() => navigate("/parent/profile")}>Ouvrir</button>
        </div>

        {/* RÉSERVATIONS */}
        <div className="dashboard-card">
          <div className="card-icon">📅</div>

          <h2>Mes Réservations</h2>

          <p>Consultez l'historique de vos réservations.</p>

          <button onClick={() => navigate("/parent/reservations")}>
            Ouvrir
          </button>
        </div>

        {/* NOUVELLE RÉSERVATION */}
        <div className="dashboard-card">
          <div className="card-icon">🚀</div>

          <h2>Nouvelle Réservation</h2>

          <p>Réservez un atelier en quelques clics.</p>

          <button onClick={() => navigate("/reservation")}>Réserver</button>
        </div>

        {/* RAPPORTS */}
        <div className="dashboard-card">
          <div className="card-icon">📄</div>

          <h2>Rapports Pédagogiques</h2>

          <p>Consultez les rapports de suivi de votre enfant.</p>

          <button onClick={() => navigate("/parent/rapports")}>Ouvrir</button>
        </div>
      </div>
    </div>
  );
}
