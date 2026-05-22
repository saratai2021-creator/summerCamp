import { Link } from "react-router-dom"
import "../styles/navbar.css"

export function Navbar(){
  return(
    <nav className="navbar">

      {/* website logo / brand name */}
      <h2 className="logo">Elite Coders</h2>

      {/* navigation links */}
      <div className="nav-links">

        {/* home */}
        <Link 
          style={{textDecoration:"none"}}
          to="/"
        >
          Accueil
        </Link>

        {/* ateliers */}
        <Link
          style={{textDecoration:"none"}}
          to="/ateliers"
        >
          Ateliers
        </Link>

        {/* planning */}
        <Link
          style={{textDecoration:"none"}}
          to="/planning"
        >
          Planning
        </Link>

        {/* reservation */}
        <Link 
          style={{textDecoration:"none"}}
          to="/reservation"
        >
          Réservation
        </Link>

      </div>

    </nav>
  )
}