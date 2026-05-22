import "../styles/footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* ABOUT */}

        <div className="footer-section">
          <h3>Elite Coders Academy</h3>

          <p>
            Plateforme éducative dédiée à l’apprentissage de la programmation,
            de la robotique et du développement logiciel pour les étudiants.
          </p>
        </div>

        {/* CONTACT */}

        <div className="footer-section">
          <h4>Contact</h4>

          <p>
            <i className="bi bi-envelope-fill"></i>
            elitecodersacademy@gmail.com
          </p>

          <p>
            <i className="bi bi-telephone-fill"></i>
            +212 6 12 34 56 78
          </p>
        </div>

        {/* LOCATION */}

        <div className="footer-section">
          <h4>Localisation</h4>

          <p>
            <i className="bi bi-geo-alt-fill"></i>
            Casablanca, Maroc
          </p>
        </div>
      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} Elite Coders Academy
      </div>
    </footer>
  );
}

export default Footer;
