import "../../styles/footer.css"

export function Footer(){
  return(
    <footer className="footer">

      <div className="footer-container">

        {/* company description */}
        <div className="footer-section">
          <h3 className="footer-logo">Elite Coders</h3>
          <p>
            Former les jeunes esprits grâce aux ateliers de programmation,
            de robotique et de technologie.
          </p>
        </div>

        {/* navigation links */}
        <div className="footer-section">
          <h4>Liens</h4>
          <p>Accueil</p>
          <p>Ateliers</p>
          <p>Réservations</p>
        </div>

        {/* contact information */}
        <div className="footer-section">
          <h4>Contact</h4>
          <p>Email : contact@elitecodersacademy.com</p>
          <p>Téléphone : +212 XXX XXX XXX</p>
        </div>

      </div>

      {/* copyright section */}
      <div className="footer-bottom">
        © {new Date().getFullYear()} Elite Coders Academy
      </div>

    </footer>
  )
}