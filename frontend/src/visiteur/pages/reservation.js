import { useEffect, useState } from "react"
import { getAteliers } from "../../shared/services/AdminService"
import "../../styles/forms.css"

export function Reservation() {

  const [ateliers, setAteliers] = useState([])

  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    date_naissance: "",
    parent_telephone: "",
    parent_email: "",
    parent_password: "",
    atelier_id: ""
  })

  /* ===============================
     LOAD ATELIERS
  =============================== */
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

  /* ===============================
     INPUT CHANGE
  =============================== */
  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  /* ===============================
     SUBMIT RESERVATION
  =============================== */
  const handleSubmit = async (e) => {

    e.preventDefault()

    try {

      const response = await fetch(
        "http://127.0.0.1:8000/api/reservations",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
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
        nom: "",
        prenom: "",
        date_naissance: "",
        parent_telephone: "",
        parent_email: "",
        parent_password: "",
        atelier_id: ""
      })

    } catch (err) {

      console.error("Network error:", err)
      alert("Erreur serveur")
    }
  }

  return (

    <div className="reservation-container">

      <h1>Réservation Atelier</h1>

      <form onSubmit={handleSubmit} className="reservation-form">

        <input
          type="text"
          name="nom"
          placeholder="Nom de l'enfant"
          value={formData.nom}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="prenom"
          placeholder="Prénom de l'enfant"
          value={formData.prenom}
          onChange={handleChange}
          required
        />

        <input
          type="date"
          name="date_naissance"
          value={formData.date_naissance}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="parent_telephone"
          placeholder="Téléphone du parent"
          value={formData.parent_telephone}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="parent_email"
          placeholder="Email du parent"
          value={formData.parent_email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="parent_password"
          placeholder="Mot de passe parent"
          value={formData.parent_password}
          onChange={handleChange}
          required
        />

        {/* Atelier Choice */}

        <div className="atelier-select">

          <p>Choisissez un atelier :</p>

          <select
            name="atelier_id"
            value={formData.atelier_id}
            onChange={handleChange}
            required
          >

            <option value="">-- choisir atelier --</option>

            {ateliers.map((atelier) => (
              <option key={atelier.id} value={atelier.id}>
                {atelier.titre}
              </option>
            ))}

          </select>

        </div>

        <button className="btn-reserve">
          Envoyer la réservation
        </button>

      </form>

    </div>
  )
}