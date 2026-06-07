import { useEffect, useState } from "react"

import {
  getReservations,
  confirmReservation,
  cancelReservation
} from "../../shared/services/AdminService"

import "../../styles/adminreservations.css"

export function AdminReservations() {

  const [reservations, setReservations] = useState([])

  useEffect(() => {

    loadReservations()

  }, [])

  const loadReservations = async () => {

    try {

      const data = await getReservations()

      setReservations(data || [])

    } catch (error) {

      console.error("Erreur :", error)
    }
  }


  const handleConfirm = async (reservation) => {

    try {

      await confirmReservation(reservation.id)

      let phone = reservation.etudiant?.parent_telephone || ""

      // convert Moroccan number
      if (phone.startsWith("0")) {

        phone = "212" + phone.substring(1)
      }

      const message =
        `Bonjour, la réservation pour votre enfant ` +
        `${reservation.etudiant?.nom} ` +
        `${reservation.etudiant?.prenom} ` +
        `est confirmée.`

      const whatsappUrl =
        `https://wa.me/${phone}?text=${encodeURIComponent(message)}`

      window.open(whatsappUrl, "_blank")

      loadReservations()

    } catch (error) {

      console.error("Erreur confirmation :", error)
    }
  }

  /* ===============================
     CANCEL RESERVATION
  =============================== */
  const handleCancel = async (id) => {

    try {

      await cancelReservation(id)

      loadReservations()

    } catch (error) {

      console.error("Erreur annulation :", error)
    }
  }

  return (

    <div className="admin-reservations">

      <h1>Gestion des Réservations</h1>

      <table className="reservations-table">

        <thead>

          <tr>

            <th>Enfant</th>

            <th>Atelier</th>

            <th>Téléphone Parent</th>

            <th>Statut</th>

            <th>Action</th>

          </tr>

        </thead>

        <tbody>

          {reservations.map((r) => (

            <tr key={r.id}>

              {/* enfant */}
              <td>
                {r.etudiant?.nom} {r.etudiant?.prenom}
              </td>

              {/* atelier */}
              <td>
                {r.atelier?.titre}
              </td>

              {/* telephone */}
              <td>
                {r.etudiant?.parent_telephone}
              </td>

              {/* statut */}
              <td
                className={
                  r.statut === "payee"
                    ? "status-confirm"
                    : "status-wait"
                }
              >
                {r.statut}
              </td>

              {/* actions */}
              <td className="action-buttons">

                <button
                  className="confirm-btn"
                  onClick={() => handleConfirm(r)}
                >
                  Confirmer
                </button>

                <button
                  className="cancel-btn"
                  onClick={() => handleCancel(r.id)}
                >
                  Annuler
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  )
}