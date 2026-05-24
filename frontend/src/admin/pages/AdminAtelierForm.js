import { useState, useEffect } from "react"

import {
  createAtelier,
  updateAtelier,
  getAtelier
} from "../../shared/services/AdminService"

import {
  useNavigate,
  useParams
} from "react-router-dom"

import "../../styles/admin.css"

export function AdminAtelierForm() {

  const navigate = useNavigate()

  const { id } = useParams()

  // atelier form state
  const [atelier, setAtelier] = useState({

    titre: "",
    description: "",
    date_debut: "",
    date_fin: "",
    capacite: "",
    prix: "",
    age_min: "",
    age_max: "",
    image: ""

  })

  /* ===============================
     LOAD ATELIER WHEN EDITING
  =============================== */
  useEffect(() => {

    if (id) {

      getAtelier(id).then((data) => {

        console.log("atelier data:", data)

        setAtelier({

          titre: data.titre || "",
          description: data.description || "",
          date_debut: data.date_debut || "",
          date_fin: data.date_fin || "",
          capacite: data.capacite || "",
          prix: data.prix || "",
          age_min: data.age_min || "",
          age_max: data.age_max || "",
          image: data.image || ""

        })

      })

    }

  }, [id])

  /* ===============================
     HANDLE INPUT CHANGE
  =============================== */
  const handleChange = (e) => {

    setAtelier({

      ...atelier,
      [e.target.name]: e.target.value

    })
  }

  /* ===============================
     SUBMIT FORM
  =============================== */
  const handleSubmit = async (e) => {

    e.preventDefault()

    try {

      if (id) {

        await updateAtelier(id, atelier)

      } else {

        await createAtelier(atelier)
      }

      navigate("/admin/ateliers")

    } catch (error) {

      console.error("Erreur :", error)

      alert("Erreur lors de l'enregistrement")
    }
  }

  return (

    <div className="atelier-admin">

      <h1>
        {id ? "Modifier un atelier" : "Créer un atelier"}
      </h1>

      <form
        onSubmit={handleSubmit}
        className="reservation-form"
      >

        {/* titre */}
        <input
          type="text"
          name="titre"
          placeholder="Titre de l'atelier"
          value={atelier.titre}
          onChange={handleChange}
          required
        />

        {/* description */}
        <textarea
          name="description"
          placeholder="Description de l'atelier"
          value={atelier.description}
          onChange={handleChange}
          required
        />

        {/* date debut */}
        <input
          type="date"
          name="date_debut"
          value={atelier.date_debut}
          onChange={handleChange}
          required
        />

        {/* date fin */}
        <input
          type="date"
          name="date_fin"
          value={atelier.date_fin}
          onChange={handleChange}
          required
        />

        {/* capacite */}
        <input
          type="number"
          name="capacite"
          placeholder="Capacité"
          value={atelier.capacite}
          onChange={handleChange}
          required
        />

        {/* prix */}
        <input
          type="number"
          name="prix"
          placeholder="Prix (€)"
          value={atelier.prix}
          onChange={handleChange}
          required
        />

        {/* age minimum */}
        <input
          type="number"
          name="age_min"
          placeholder="Âge minimum"
          value={atelier.age_min}
          onChange={handleChange}
          required
        />

        {/* age maximum */}
        <input
          type="number"
          name="age_max"
          placeholder="Âge maximum"
          value={atelier.age_max}
          onChange={handleChange}
          required
        />

        {/* image */}
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={atelier.image}
          onChange={handleChange}
        />

        <div className="form-buttons">

          <button
            type="submit"
            className="btn-reserve"
          >
            Enregistrer
          </button>

          <button
            type="button"
            className="delete-btn"
            onClick={() => navigate("/admin/ateliers")}
          >
            Annuler
          </button>

        </div>

      </form>

    </div>
  )
}