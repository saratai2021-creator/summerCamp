import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/formations.css";

function Formations() {
  const [formations, setFormations] = useState([]);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/formations")
      .then((res) => setFormations(res.data));
  }, []);

  function allStudent(id) {
    navigate(`/formations/${id}/students`);
  }

  function formationReports(id) {
    navigate(`/formations/${id}/reports`);
  }

  const filteredFormations = formations.filter((f) =>
    f.title.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="formations-page">
      <div className="dashboard-header">
        <div className="page-title">
          <i className="bi bi-mortarboard-fill"></i>
          <div>
            <h2>Formations</h2>
            <p>Catalogue des programmes disponibles</p>
          </div>
        </div>
      </div>

      <div className="formations-top">
        <div className="formations-count">
          <i className="bi bi-mortarboard-fill"></i>
          {filteredFormations.length} formations
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

      <div className="formations-grid">
        {filteredFormations.map((formation) => (
          <div key={formation.id} className="formation-card">
            <div className="formation-icon">
              <i className="bi bi-code-slash"></i>
            </div>

            <h3>{formation.title}</h3>

            <p>{formation.description}</p>

            <div className="formation-dates">
              <span className="date-item">
                <i className="bi bi-calendar-event"></i>
                {formation.start_date}
              </span>

              <span className="date-item">
                <i className="bi bi-calendar-check"></i>
                {formation.end_date}
              </span>
            </div>

            <div className="formation-actions">
              <button
                className="btn-students"
                onClick={() => allStudent(formation.id)}
              >
                <i className="bi bi-people-fill"></i>
                Étudiants
              </button>

              <button
                className="btn-reports"
                onClick={() => formationReports(formation.id)}
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

export default Formations;
