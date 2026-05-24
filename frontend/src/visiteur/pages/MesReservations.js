import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import "../../styles/MesReservations.css"

export function MesReservations() {

  const navigate = useNavigate()

  const [reservations, setReservations] = useState([])

  /* ===============================
     LOAD RESERVATIONS
  =============================== */
  useEffect(() => {

    // temporary fake data

    setReservations([

      {
        id: 1,
        atelier: "Laravel",
        statut: "en_attente",
        date: "2026-06-01"
      },

      {
        id: 2,
        atelier: "React",
        statut: "confirme",
        date: "2026-06-10"
      }

    ])

  }, [])

  /* ===============================
     CANCEL RESERVATION
  =============================== */
  const handleCancel = (id) => {

    const confirmCancel = window.confirm(
      "Voulez-vous annuler cette réservation ?"
    )

    if (!confirmCancel) return

    setReservations(

      reservations.map((reservation) =>

        reservation.id === id

          ? {
              ...reservation,
              statut: "annule"
            }

          : reservation
      )
    )
  }

  return (

    <div className="reservations-container">

      {/* TOPBAR */}

      <div className="reservations-topbar">

        <div>

          <h2 className="reservations-logo">
            Summer Camp
          </h2>

          <p className="reservations-subtitle">
            My Reservations
          </p>

        </div>

        <button
          className="back-btn"
          onClick={() => navigate("/visiteur")}
        >
          Dashboard
        </button>

      </div>

      {/* TITLE */}

      <div className="reservations-header">

        <h1>Mes Réservations</h1>

        <p>
          Consultez l’historique de vos réservations.
        </p>

      </div>

      {/* LIST */}

      <div className="reservations-list">

        {reservations.map((reservation) => (

          <div
            key={reservation.id}
            className="reservation-card"
          >

            <div className="reservation-icon">
              📚
            </div>

            <h2>
              {reservation.atelier}
            </h2>

            <p>
              <strong>Date :</strong>
              {" "}
              {reservation.date}
            </p>

            <div className="status-box">

              <strong>Statut :</strong>

              <span className={reservation.statut}>
                {reservation.statut}
              </span>

            </div>

            {/* pending */}

            {reservation.statut === "en_attente" && (

              <button
                className="cancel-btn"
                onClick={() =>
                  handleCancel(reservation.id)
                }
              >
                Annuler
              </button>

            )}

            {/* confirmed */}

            {reservation.statut === "confirme" && (

              <button
                className="confirmed-btn"
                disabled
              >
                Confirmé
              </button>

            )}

            {/* cancelled */}

            {reservation.statut === "annule" && (

              <button
                className="cancelled-btn"
                disabled
              >
                Annulée
              </button>

            )}

          </div>

        ))}

      </div>

    </div>
  )
}