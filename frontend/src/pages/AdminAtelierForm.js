import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { createAtelier, updateAtelier, getAtelier } from "../services/AdminService"
import "../styles/admin.css"

export function AdminAtelierForm(){

 const navigate = useNavigate()
 const { id } = useParams()

 // state that stores atelier form data
 const [atelier,setAtelier] = useState({
  titre:"",
  description:"",
  date_debut:"",
  date_fin:"",
  capacite:"",
  prix:"",
  age_min:"",
  age_max:""
 })

 /* Load existing atelier values when editing */
 useEffect(()=>{

  if(id){

   getAtelier(id).then(data=>{

    console.log("atelier data:", data)

    setAtelier({
     titre: data.titre || "",
     description: data.description || "",
     date_debut: data.date_debut || "",
     date_fin: data.date_fin || "",
     capacite: data.capacite || "",
     prix: data.prix || "",
     age_min: data.age_min || "",
     age_max: data.age_max || ""
    })

   })

  }

 },[id])

 // update form state when user types
 const handleChange = (e)=>{

  setAtelier({
   ...atelier,
   [e.target.name]: e.target.value
  })

 }

 // submit form (create or update atelier)
 const handleSubmit = async(e)=>{

  e.preventDefault()

  if(id){
   await updateAtelier(id, atelier)
  }else{
   await createAtelier(atelier)
  }

  navigate("/admin/ateliers")

 }

 return(

  <div className="atelier-admin">

   {/* page title */}
   <h1>{id ? "Modifier un atelier" : "Créer un atelier"}</h1>

   <form onSubmit={handleSubmit} className="reservation-form">

    {/* atelier title */}
    <input
     name="titre"
     placeholder="Titre de l'atelier"
     value={atelier.titre}
     onChange={handleChange}
    />

    {/* atelier description */}
    <textarea
     name="description"
     placeholder="Description de l'atelier"
     value={atelier.description}
     onChange={handleChange}
    />

    {/* start date */}
    <input
     type="date"
     name="date_debut"
     value={atelier.date_debut}
     onChange={handleChange}
    />

    {/* end date */}
    <input
     type="date"
     name="date_fin"
     value={atelier.date_fin}
     onChange={handleChange}
    />

    {/* capacity */}
    <input
     name="capacite"
     placeholder="Capacité"
     value={atelier.capacite}
     onChange={handleChange}
    />

    {/* price */}
    <input
     name="prix"
     placeholder="Prix (€)"
     value={atelier.prix}
     onChange={handleChange}
    />

    {/* minimum age */}
    <input
     name="age_min"
     placeholder="Âge minimum"
     value={atelier.age_min}
     onChange={handleChange}
    />

    {/* maximum age */}
    <input
     name="age_max"
     placeholder="Âge maximum"
     value={atelier.age_max}
     onChange={handleChange}
    />

    <div className="form-buttons">

     {/* save button */}
     <button type="submit" className="btn-reserve">
      Enregistrer
     </button>

     {/* cancel button */}
     <button
      type="button"
      className="delete-btn"
      onClick={()=>navigate("/admin/ateliers")}
     >
      Annuler
     </button>

    </div>

   </form>

  </div>

 )
}