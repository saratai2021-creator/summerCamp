import { useEffect, useState } from "react"
import { getReservations, confirmReservation, cancelReservation } from "../services/AdminService"
import "../styles/adminreservations.css"

export function AdminReservations(){

 const [reservations,setReservations] = useState([])

 // load reservations when component mounts
 useEffect(()=>{
  loadReservations()
 },[])

 const loadReservations = async ()=>{
  const data = await getReservations()
  setReservations(data || [])
 }

 // confirm reservation + open WhatsApp message
 const handleConfirm = async (reservation) => {

  await confirmReservation(reservation.id)

  let phone = reservation.parent_phone

  // convert Moroccan number 06xxxxxxx → 2126xxxxxxx
  if(phone.startsWith("0")){
    phone = "212" + phone.substring(1)
  }

  const message = `Bonjour, la réservation pour votre enfant ${reservation.nom_enfant} ${reservation.prenom_enfant} (${reservation.planning_type}) est confirmée.`

  const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`

  window.open(whatsappUrl,"_blank")

  loadReservations()
 }

 // cancel confirmation
 const handleCancel = async(id)=>{
  await cancelReservation(id)
  loadReservations()
 }

 return(

  <div className="admin-reservations">

   <h1>Gestion des Réservations</h1>

   <table className="reservations-table">

    <thead>
     <tr>
      <th>Enfant</th>
      <th>Planning</th>
      <th>Atelier</th>
      <th>Période</th>
      <th>Téléphone Parent</th>
      <th>Statut</th>
      <th>Action</th>
     </tr>
    </thead>

    <tbody>

     {reservations.map((r)=>(
      <tr key={r.id}>

       {/* child */}
       <td>{r.nom_enfant} {r.prenom_enfant}</td>

       {/* planning */}
       <td>{r.planning_type}</td>

       {/* atelier */}
       <td>{r.atelier}</td>

       {/* dates */}
       <td>{r.date_debut} → {r.date_fin}</td>

       {/* parent phone */}
       <td>{r.parent_phone}</td>

       {/* status */}
       <td className={r.statut === "confirme" ? "status-confirm" : "status-wait"}>
        {r.statut}
       </td>

       <td className="action-buttons">

        <button
         className="confirm-btn"
         onClick={()=>handleConfirm(r)}
        >
         Confirmer
        </button>

        <button
         className="cancel-btn"
         onClick={()=>handleCancel(r.id)}
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