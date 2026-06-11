import { useEffect, useState } from "react";

import { useParams, useNavigate } from "react-router-dom";

import { getAtelierStudents } from "../../shared/services/AdminService";

import "../../styles/Formateur/students.css";

function Students() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [etudiants, setEtudiants] = useState([]);

  const [atelier, setAtelier] = useState(null);

  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    getAtelierStudents(id)
      .then((data) => {
        setEtudiants(data?.etudiants || []);

        setAtelier(data);

        setLoading(false);
      })

      .catch((err) => {
        console.log(err);

        setLoading(false);
      });
  }, [id]);

  function genererRapport(etudiantId) {
    navigate(`/formateur/ateliers/${id}/etudiants/${etudiantId}/report`);
  }

  const filteredEtudiants = etudiants.filter((e) =>
    `${e.nom} ${e.prenom}`.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="students-page">
      {/* BREADCRUMB */}

      <div className="breadcrumb">
        <span>
          <i className="bi bi-house-fill"></i>
          Formateur
        </span>

        <i className="bi bi-chevron-right"></i>

        <span>{atelier?.titre}</span>

        <i className="bi bi-chevron-right"></i>

        <span className="active">Étudiants</span>
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
            <i className="bi bi-mortarboard-fill"></i>

            <div>
              <span>Total étudiants</span>

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

      <div className="table-card">
        {loading ? (
          <div className="loading">Chargement...</div>
        ) : filteredEtudiants.length === 0 ? (
          <div className="empty-state">
            <i className="bi bi-person-x-fill"></i>

            <p>Aucun étudiant trouvé</p>
          </div>
        ) : (
          <table className="students-table">
            <thead>
              <tr>
                <th>Étudiant</th>

                <th>Email parent</th>

                <th className="actions-header">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredEtudiants.map((etudiant) => (
                <tr key={etudiant.id}>
                  {/* ETUDIANT */}

                  <td>
                    <div className="student-name">
                      <div className="avatar">{etudiant.nom?.[0]}</div>

                      <div className="student-text">
                        <strong>
                          {etudiant.nom} {etudiant.prenom}
                        </strong>
                      </div>
                    </div>
                  </td>

                  {/* EMAIL */}

                  <td>
                    <span className="email-text">{etudiant.parent_email}</span>
                  </td>

                  {/* ACTION */}

                  <td className="action-column">
                    <button
                      className="btn-report"
                      onClick={() => genererRapport(etudiant.id)}
                    >
                      <i className="bi bi-file-earmark-plus-fill"></i>
                      Rapport
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
