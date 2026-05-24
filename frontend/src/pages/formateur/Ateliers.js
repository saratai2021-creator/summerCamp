import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import "../../styles/Formateur/formateurAteliers.css";

function FormateurAteliers() {
  const [ateliers, setAteliers] = useState([]);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  /*
   * Charger les ateliers
   */
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/formateur/ateliers")
      .then((res) => setAteliers(res.data))
      .catch((err) => console.log(err));
  }, []);

  /*
   * Voir étudiants
   */
  function allStudent(id) {
    navigate(`/formateur/ateliers/${id}/students`);
  }

  /*
   * Voir rapports
   */
  function formationReports(id) {
    navigate(`/formateur/ateliers/${id}/reports`);
  }

  /*
   * Recherche
   */
  const filteredAteliers = ateliers.filter((atelier) =>
    atelier.titre.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="formateur-page">
      {/* HEADER */}
      <div className="formateur-header">
        <div className="header-title">
          <i className="bi bi-mortarboard-fill"></i>

          <div>
            <h1>Formations</h1>
            <p>Catalogue des programmes disponibles</p>
          </div>
        </div>
      </div>

      {/* TOP BAR */}
      <div className="top-bar">
        <div className="formations-count">
          <i className="bi bi-mortarboard-fill"></i>
          <span>{filteredAteliers.length} formations</span>
        </div>

        <div className="search-box">
          <i className="bi bi-search"></i>

          <input
            type="text"
            placeholder="Rechercher une formation..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* GRID */}
      <div className="formations-grid">
        {filteredAteliers.map((atelier) => (
          <div key={atelier.id} className="formation-card">
            {/* ICON */}
            <div className="formation-icon">
              <i className="bi bi-code-slash"></i>
            </div>

            {/* TITLE */}
            <h3>{atelier.titre}</h3>

            {/* DESCRIPTION */}
            <p>{atelier.description}</p>

            {/* DATES */}
            <div className="formation-dates">
              <span className="date-item">
                <i className="bi bi-calendar-event"></i>
                {atelier.date_debut}
              </span>

              <span className="date-item">
                <i className="bi bi-calendar-check"></i>
                {atelier.date_fin}
              </span>
            </div>

            {/* ACTIONS */}
            <div className="formation-actions">
              <button
                className="btn-students"
                onClick={() => allStudent(atelier.id)}
              >
                <i className="bi bi-people-fill"></i>
                Étudiants
              </button>

              <button
                className="btn-reports"
                onClick={() => formationReports(atelier.id)}
              >
                <i className="bi bi-file-earmark-text"></i>
                Rapports
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FormateurAteliers;
