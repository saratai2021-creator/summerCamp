import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

import "../../styles/Formateur/students.css";

function Students() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [etudiants, setEtudiants] = useState([]);
  const [atelier, setAtelier] = useState(null);

  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);

  /*
   * Charger étudiants
   */
  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/formateur/ateliers/${id}/etudiants`)

      .then((res) => {
        setEtudiants(res.data.etudiants || res.data.etudiants);

        setAtelier(res.data);

        setLoading(false);
      })

      .catch((err) => {
        console.log(err);

        setLoading(false);
      });
  }, [id]);

  /*
   * Générer rapport
   */
  function genererRapport(etudiantId) {
    navigate(`/formateur/ateliers/${id}/etudiants/${etudiantId}/report`);
  }

  /*
   * Historique rapports
   */
  function viewReports(etudiantId) {
    navigate(`/formateur/ateliers/${id}/etudiants/${etudiantId}/reports`);
  }

  /*
   * Recherche
   */
  const filteredEtudiants = etudiants.filter((e) =>
    `${e.nom} ${e.prenom}`.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="students-page">
      {/* BREADCRUMB */}
      <div className="breadcrumb">
        <i className="bi bi-house"></i>
        Ateliers
        <i className="bi bi-chevron-right"></i>
        {atelier?.titre}
        <i className="bi bi-chevron-right"></i>
        Étudiants
      </div>

      {/* HEADER */}
      <div className="header-row">
        <div className="students-header">
          <button className="back-btn" onClick={() => navigate(-1)}>
            <i className="bi bi-arrow-left"></i>
          </button>

          <div>
            <h2>
              <i className="bi bi-people-fill"></i>
              Étudiants
            </h2>

            <p>
              Atelier : <strong>{atelier?.titre}</strong>
            </p>
          </div>
        </div>

        {/* STATS */}
        <div className="stats-cards">
          <div className="stat-card">
            <i className="bi bi-mortarboard"></i>

            <div>
              <span>Étudiants</span>
              <h3>{filteredEtudiants.length}</h3>
            </div>
          </div>
        </div>
      </div>

      {/* SEARCH */}
      <div className="students-top">
        <div className="search-box">
          <i className="bi bi-search"></i>

          <input
            type="text"
            placeholder="Rechercher un étudiant..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* TABLE */}
      <div className="card table-card">
        {loading ? (
          <div className="loading">Chargement...</div>
        ) : filteredEtudiants.length === 0 ? (
          <div className="empty-state">
            <i className="bi bi-person-x"></i>

            <p>Aucun étudiant trouvé</p>
          </div>
        ) : (
          <table className="table table-hover align-middle">
            <thead>
              <tr>
                <th>Nom</th>
                <th>Email Parent</th>
                <th style={{ width: "260px" }}>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredEtudiants.map((etudiant) => (
                <tr key={etudiant.id}>
                  <td>
                    <div className="student-name">
                      <div className="avatar">{etudiant.nom?.[0]}</div>
                      {etudiant.nom} {etudiant.prenom}
                    </div>
                  </td>

                  <td>{etudiant.parent_email}</td>

                  <td className="actions-cell">
                    <button
                      className="btn btn-report"
                      onClick={() => genererRapport(etudiant.id)}
                    >
                      <i className="bi bi-file-earmark-plus"></i>
                      Rapport
                    </button>

                    <button
                      className="btn-history"
                      onClick={() => viewReports(etudiant.id)}
                    >
                      <i className="bi bi-clock-history"></i>
                      Historique
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Students;
