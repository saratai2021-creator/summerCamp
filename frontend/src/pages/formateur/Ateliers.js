import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import { getFormateurAteliers } from "../../shared/services/AdminService";

import "../../styles/Formateur/formateurAteliers.css";

function FormateurAteliers() {
  const [ateliers, setAteliers] = useState([]);

  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    getFormateurAteliers()
      .then((data) => {
        setAteliers(data || []);
      })

      .catch((err) => {
        console.log(err);
      });
  }, []);

  function allStudent(id) {
    navigate(`/formateur/ateliers/${id}/students`);
  }

  function formationReports(id) {
    navigate(`/formateur/ateliers/${id}/reports`);
  }

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
            <h1>Ateliers</h1>

            <p>Catalogue des programmes disponibles</p>
          </div>
        </div>
      </div>
      {/* TOP BAR */}

      <div className="top-bar">
        <div className="formations-count">
          <i className="bi bi-mortarboard-fill"></i>

          <span>{filteredAteliers.length} ateliers</span>
        </div>

        {/* SEARCH */}

        <div className="search-box">
          <i className="bi bi-search"></i>

          <input
            type="text"
            placeholder="Rechercher un atelier..."
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
