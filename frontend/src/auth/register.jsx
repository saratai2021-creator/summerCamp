import { useState } from "react"

import { Link, useNavigate } from "react-router-dom"
import "../styles/Register.css"
export function Register() {

  const navigate = useNavigate()

  const [formData, setFormData] = useState({

    nom: "",
    prenom: "",
    date_naissance: "",
    parent_telephone: "",
    parent_email: "",
    parent_password: "",
    parent_password_confirmation: ""

  })

  const [loading, setLoading] = useState(false)

  const [error, setError] = useState("")


  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]: e.target.value

    })
  }


  const handleSubmit = async (e) => {

    e.preventDefault()

    setLoading(true)

    setError("")

    try {

      const response = await fetch(
        "http://127.0.0.1:8000/api/register",
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

      if (response.ok) {

        localStorage.setItem("token", data.token)

  localStorage.setItem(
    "user",
    JSON.stringify(data.user)
  )

  alert("Compte créé avec succès")

  navigate("/parent")
      } else {

        setError(
          data.message ||
          "Erreur d'inscription"
        )
      }

    } catch (error) {

      console.error(error)

      setError("Erreur serveur")
    }

    setLoading(false)
  }

  return (

    <div className="register-page">

      <form onSubmit={handleSubmit}>

        <h1>Inscription</h1>

        {error && (

          <p className="login-error">
            {error}
          </p>

        )}

        <input
          type="text"
          name="nom"
          placeholder="Nom"
          value={formData.nom}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="prenom"
          placeholder="Prénom"
          value={formData.prenom}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="parent_email"
          placeholder="Email parent"
          value={formData.parent_email}
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
          placeholder="Téléphone parent"
          value={formData.parent_telephone}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="parent_password"
          placeholder="Mot de passe"
          value={formData.parent_password}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="parent_password_confirmation"
          placeholder="Confirmer le mot de passe"
          value={formData.parent_password_confirmation}
          onChange={handleChange}
          required
        />

        <button
          type="submit"
          disabled={loading}
        >

          {loading
            ? "Inscription..."
            : "S'inscrire"}

        </button>

        <p className="auth-link">

          Vous avez déjà un compte ?

          <Link to="/login">
            {" "}Connexion
          </Link>

        </p>

      </form>

    </div>
  )
}