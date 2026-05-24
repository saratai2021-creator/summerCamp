import { Link } from "react-router-dom";
import "../../styles/hero.css"

export function Hero(){
  return(
    <section className="hero">

      <h1>Apprenez à coder en vous amusant 🚀</h1>

      <p>
        Rejoignez les ateliers d'été Elite Coders et découvrez
        la robotique, l'intelligence artificielle et la création de jeux.
      </p>

      <Link 
        to="/ateliers" 
        style={{textDecoration:"none"}}
        className="hero-btn"
      >
        Voir les ateliers
      </Link>

    </section>
  )
}