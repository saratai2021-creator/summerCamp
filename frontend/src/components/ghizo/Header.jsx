import { Link } from "react-router-dom";
import "../styles/header.css";

function Header() {
  return (
    <header className="header">
      <div className="header-container">
        {/* LOGO + NAME */}

        <div className="logo-section">
          <img src="/logo.png" alt="Elite Coders" className="logo-img" />

          <h2 className="academy-name">
            <span className="elite">Elite</span>{" "}
            <span className="coders">Coders</span>{" "}
            <span className="academy">Academy</span>
          </h2>
        </div>

        {/* NAVIGATION */}

        <nav className="nav-links">
          <Link to="/">
            <i className="bi bi-mortarboard-fill"></i> Formations
          </Link>

          <Link to="/reports/history">
            <i className="bi bi-file-earmark-text"></i> Rapports
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;
