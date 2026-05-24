import { useEffect, useState } from "react"

//import "../../styles/MesReservations.css"

export function MesReservations() {

  const [reservations, setReservations] = useState([])

  /* ===============================
     LOAD RESERVATIONS
  =============================== */
  useEffect(() => {

    // temporary fake data
    // later replace with API

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

    // temporary frontend update
    // later replace with API call

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

      <h1>Mes Réservations</h1>

      <div className="reservations-list">

        {reservations.map((reservation) => (

          <div
            key={reservation.id}
            className="reservation-card"
          >

            <h2>
              {reservation.atelier}
            </h2>

            <p>
              <strong>Date :</strong>
              {" "}
              {reservation.date}
            </p>

            <p>
              <strong>Statut :</strong>
              {" "}
              <span className={reservation.statut}>
                {reservation.statut}
              </span>
            </p>

            {/* pending reservation */}
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

            {/* confirmed reservation */}
            {reservation.statut === "confirme" && (

              <button
                className="confirmed-btn"
                disabled
              >
                Confirmé
              </button>

            )}

            {/* cancelled reservation */}
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