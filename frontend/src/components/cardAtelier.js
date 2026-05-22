import "../styles/cards.css"


export function Atelier({ atelier }) {
  return (
    <div className="atelier-card">

      {/* atelier title */}
      <h3 className="atelier-title">{atelier.titre}</h3>

      {/* atelier description */}
      <p>{atelier.description}</p>

      {/* dates */}
      <p>📅 Du {atelier.date_debut} au {atelier.date_fin}</p>

      {/* capacity */}
      <p>Capacité : {atelier.capacite}</p>

      {/* price */}
      <p>Prix : {atelier.prix} DH</p>

      {/* age range */}
      <p>Âge : {atelier.age_min} - {atelier.age_max} ans</p>

      

    </div>
  );
}