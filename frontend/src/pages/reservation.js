import { useEffect, useState } from "react"
import { getAteliers } from "../services/AdminService"
import "../styles/forms.css"

export function Reservation(){

  const [ateliers,setAteliers] = useState([])

  const [formData,setFormData] = useState({
    nom:"",
    prenom:"",
    age:"",
    nom_parent:"",
    parent_telephone:"",
    planning_id:"",
    atelier_id:"",
    date_debut:"",
    date_fin:""
  })

  /* ===============================
     LOAD ATELIERS
  =============================== */
  useEffect(()=>{

    const fetchAteliers = async ()=>{
      try{
        const data = await getAteliers()
        setAteliers(data || [])
      }catch(err){
        console.error("Error loading ateliers:",err)
      }
    }

    fetchAteliers()

  },[])

  /* ===============================
     INPUT CHANGE
  =============================== */
  const handleChange = (e)=>{
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  /* ===============================
     SUBMIT RESERVATION
  =============================== */
  const handleSubmit = async (e)=>{
    e.preventDefault()

    try{

      const response = await fetch("http://127.0.0.1:8000/api/reservations",{
        method:"POST",
        headers:{
          "Content-Type":"application/json",
          "Accept":"application/json"
        },
        body:JSON.stringify(formData)
      })

      if(!response.ok){
        const text = await response.text()
        console.error("Server error:",text)
        alert("Erreur serveur lors de la réservation")
        return
      }

      await response.json()

      alert("Réservation envoyée avec succès")

      setFormData({
        nom:"",
        prenom:"",
        age:"",
        nom_parent:"",
        parent_telephone:"",
        planning_id:"",
        atelier_id:"",
        date_debut:"",
        date_fin:""
      })

    }catch(err){
      console.error("Network error:",err)
      alert("Erreur serveur")
    }
  }

  return(

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
          type="number"
          name="age"
          placeholder="Âge de l'enfant"
          value={formData.age}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="nom_parent"
          placeholder="Nom du parent"
          value={formData.nom_parent}
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

        {/* Planning Choice */}

        <div className="planning-radio-group">

          <p>Choisissez le planning :</p>

          <label>
            <input
              type="radio"
              name="planning_id"
              value="1"
              onChange={handleChange}
              required
            />
            Journée complète
          </label>

          <label>
            <input
              type="radio"
              name="planning_id"
              value="2"
              onChange={handleChange}
            />
            Demi-journée
          </label>

          <label>
            <input
              type="radio"
              name="planning_id"
              value="3"
              onChange={handleChange}
            />
            Une activité
          </label>

        </div>

        {/* Show atelier only if single activity */}

        {formData.planning_id === "3" && (

          <div className="atelier-select">

            <p>Choisissez un atelier :</p>

            <select
              name="atelier_id"
              value={formData.atelier_id}
              onChange={handleChange}
              required
            >

              <option value="">-- choisir atelier --</option>

              {ateliers.map((atelier)=>(
                <option key={atelier.id} value={atelier.id}>
                  {atelier.titre}
                </option>
              ))}

            </select>

          </div>

        )}

        <input
          type="date"
          name="date_debut"
          value={formData.date_debut}
          onChange={handleChange}
          required
        />

        <input
          type="date"
          name="date_fin"
          value={formData.date_fin}
          onChange={handleChange}
          required
        />

        <button className="btn-reserve">
          Envoyer la réservation
        </button>

      </form>

    </div>
  )
}