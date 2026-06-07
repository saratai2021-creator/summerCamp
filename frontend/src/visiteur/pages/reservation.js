import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import { getAteliers } from "../../shared/services/AdminService"

import "../../styles/Reservation.css"

export function Reservation() {

  const navigate = useNavigate()

  const [ateliers, setAteliers] = useState([])

  const [formData, setFormData] = useState({
    atelier_id: ""
  })

  useEffect(() => {

    const fetchAteliers = async () => {

      try {

        const data = await getAteliers()

        setAteliers(data || [])

      } catch (err) {

        console.error("Error loading ateliers:", err)
      }
    }

    fetchAteliers()

  }, [])


  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]: e.target.value
    })
  }


  const handleSubmit = async (e) => {

    e.preventDefault()

    try {

      const token = localStorage.getItem("token")

      const response = await fetch(
        "http://127.0.0.1:8000/api/reservations",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Bearer ${token}`
          },

          body: JSON.stringify(formData)
        }
      )

      const data = await response.json()

      if (!response.ok) {

        console.error(data)

        alert(data.message || "Erreur serveur")

        return
      }

      alert("Réservation envoyée avec succès")

      setFormData({
        atelier_id: ""
      })

    } catch (err) {

      console.error("Network error:", err)

      alert("Erreur serveur")
    }
  }

  return (

    <div className="reservation-container">

      {/* TOPBAR */}

      <div className="reservation-topbar">

        <div>

          <h2 className="reservation-logo">
            Summer Camp
          </h2>

          <p className="reservation-subtitle">
            Workshop Reservation
          </p>

        </div>

        <button
          className="back-btn"
          onClick={() => navigate("/parent")}
        >
          Dashboard
        </button>

      </div>

      {/* HERO */}

      <div className="reservation-hero">

        <h1>
          Reserve Your Workshop 🚀
        </h1>

        <p>
          Choose an atelier and confirm your reservation.
        </p>

      </div>

      {/* FORM */}

      <form
        onSubmit={handleSubmit}
        className="reservation-form"
      >

        <div className="atelier-select">

          <label>
            Choose an atelier
          </label>

          <select
            name="atelier_id"
            value={formData.atelier_id}
            onChange={handleChange}
            required
          >

            <option value="">
              -- choose atelier --
            </option>

            {ateliers.map((atelier) => (

              <option
                key={atelier.id}
                value={atelier.id}
              >
                {atelier.titre}
              </option>

            ))}

          </select>

        </div>

        <button className="btn-reserve">

          Reserve Now

        </button>

      </form>

    </div>
  )
}