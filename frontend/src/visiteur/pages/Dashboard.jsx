import { useNavigate } from "react-router-dom"

//import "../../styles/Dashboard.css"

export function Dashboard() {

  const navigate = useNavigate()

  const user = JSON.parse(
    localStorage.getItem("user")
  )

  return (

    <div className="dashboard-container">

      {/* welcome section */}
      <div className="dashboard-header">

        <h1>
          Bienvenue
          {" "}
          {user?.name || "Visiteur"}
        </h1>

        <p>
          Gérez vos réservations et consultez vos rapports.
        </p>

      </div>

      {/* dashboard cards */}
      <div className="dashboard-cards">

        {/* profile */}
        <div className="dashboard-card">

          <h2>Mon Profil</h2>

          <p>
            Consulter vos informations personnelles.
          </p>

          <button
            onClick={() => navigate("/visiteur/profile")}
          >
            Voir Profil
          </button>

        </div>

        {/* reservations */}
        <div className="dashboard-card">

          <h2>Mes Réservations</h2>

          <p>
            Voir l’historique de vos réservations.
          </p>

          <button
            onClick={() =>
              navigate("/visiteur/reservations")
            }
          >
            Voir Réservations
          </button>

        </div>

        {/* new reservation */}
        <div className="dashboard-card">

          <h2>Nouvelle Réservation</h2>

          <p>
            Réserver un nouvel atelier.
          </p>

          <button
            onClick={() =>
              navigate("/reservation")
            }
          >
            Réserver
          </button>

        </div>

        {/* rapports */}
        <div className="dashboard-card">

          <h2>Mes Rapports</h2>

          <p>
            Consulter les rapports pédagogiques.
          </p>

          <button
            onClick={() =>
              navigate("/visiteur/rapports")
            }
          >
            Voir Rapports
          </button>

        </div>

      </div>

    </div>
  )
}