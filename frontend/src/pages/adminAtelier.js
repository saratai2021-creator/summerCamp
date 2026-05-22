import { useEffect, useState } from "react"
import { getAteliers, deleteAtelier } from "../services/AdminService"
import { useNavigate } from "react-router-dom"
import "../styles/admin.css"

export function AdminAteliers() {

  const [ateliers, setAteliers] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    loadAteliers()
  }, [])

  const loadAteliers = () => {
    getAteliers().then(data => {
      setAteliers(data)
    })
  }

  const handleDelete = async (id) => {

    const confirmDelete = window.confirm(
      "⚠️ Êtes-vous sûr de vouloir supprimer cet atelier ? Cette action est irréversible."
    )

    if (!confirmDelete) return

    await deleteAtelier(id)

    loadAteliers()
  }

  return (

    <div className="atelier-admin">

      <h1>Gestion des Ateliers</h1>

      <button
        className="edit-btn"
        onClick={() => navigate("/admin/ateliers/create")}
      >
        + Ajouter un atelier
      </button>

      <div className="atelier-grid">

        {ateliers.map((atelier) => (

          <div key={atelier.id} className="atelier-card">

            <h3>{atelier.titre}</h3>

            <p>{atelier.description}</p>

            <p><strong>Capacité :</strong> {atelier.capacite}</p>

            <p><strong>Prix :</strong> {atelier.prix} €</p>

            <p><strong>Âge :</strong> {atelier.age_min} - {atelier.age_max}</p>

            <p><strong>Début :</strong> {atelier.date_debut}</p>

            <p><strong>Fin :</strong> {atelier.date_fin}</p>

            <div className="card-actions">

              <button
                className="edit-btn"
                onClick={() => navigate(`/admin/ateliers/edit/${atelier.id}`)}
              >
                Modifier
              </button>

              <button
                className="delete-btn"
                onClick={() => handleDelete(atelier.id)}
              >
                Supprimer
              </button>

            </div>

          </div>

        ))}

      </div>

    </div>

  )
}