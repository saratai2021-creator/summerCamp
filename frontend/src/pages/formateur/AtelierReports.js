import { useEffect, useState } from "react";

import axios from "axios";

import "../../styles/Formateur/atelierReports.css";

function AtelierReports() {
  /*
  |--------------------------------------------------------------------------
  | States
  |--------------------------------------------------------------------------
  */

  const [rapports, setRapports] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [page, setPage] = useState(1);

  const [lastPage, setLastPage] = useState(1);

  /*
  |--------------------------------------------------------------------------
  | Charger rapports
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    setLoading(true);

    axios
      .get(`http://127.0.0.1:8000/api/formateur/rapports?page=${page}`)

      .then((res) => {
        setRapports(res.data.data);

        setLastPage(res.data.last_page);

        setLoading(false);
      })

      .catch((err) => {
        console.log(err);

        setLoading(false);
      });
  }, [page]);

  /*
  |--------------------------------------------------------------------------
  | Recherche
  |--------------------------------------------------------------------------
  */

  const filteredRapports = rapports.filter((rapport) => {
    const fullName =
      `${rapport.etudiant?.nom} ${rapport.etudiant?.prenom}`.toLowerCase();

    return fullName.includes(search.toLowerCase());
  });

  /*
  |--------------------------------------------------------------------------
  | Calcul moyenne
  |--------------------------------------------------------------------------
  */

  const moyenneGenerale = (rapport) => {
    return (
      (Number(rapport.moyenne_exercices || 0) +
        Number(rapport.moyenne_examen || 0)) /
      2
    ).toFixed(1);
  };

  return (
    <div className="history-page">
      {/* HEADER */}

      <div className="history-header">
        <h1>
          <i className="bi bi-clock-history"></i>
          Historique des rapports
        </h1>

        <p>Tous les rapports pédagogiques générés.</p>
      </div>

      {/* SEARCH */}

      <div className="history-top">
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

      {/* CARD */}

      <div className="history-card">
        {loading ? (
          <div className="loading-state">Chargement...</div>
        ) : filteredRapports.length === 0 ? (
          <div className="empty-state">
            <i className="bi bi-folder-x"></i>

            <p>Aucun rapport trouvé</p>
          </div>
        ) : (
          <>
            <table className="history-table">
              <thead>
                <tr>
                  <th>Étudiant</th>

                  <th>Atelier</th>

                  <th>Présence</th>

                  <th>Moyenne</th>

                  <th>Date</th>

                  <th>PDF</th>

                  <th>Email</th>
                </tr>
              </thead>

              <tbody>
                {filteredRapports.map((rapport) => (
                  <tr key={rapport.id}>
                    {/* STUDENT */}

                    <td>
                      <div className="student-info">
                        <div className="avatar">
                          {rapport.etudiant?.nom?.[0]}
                        </div>

                        <div>
                          {rapport.etudiant?.nom} {rapport.etudiant?.prenom}
                        </div>
                      </div>
                    </td>

                    {/* ATELIER */}

                    <td>
                      <span className="atelier-badge">
                        {rapport.atelier?.titre}
                      </span>
                    </td>

                    {/* PRESENCE */}

                    <td>
                      <span className="presence-badge">
                        {rapport.taux_presence}%
                      </span>
                    </td>

                    {/* MOYENNE */}

                    <td>
                      <span className="score-badge">
                        {moyenneGenerale(rapport)}/20
                      </span>
                    </td>

                    {/* DATE */}

                    <td>{rapport.created_at?.slice(0, 10)}</td>

                    {/* DOWNLOAD */}

                    <td>
                      <a
                        href={`http://127.0.0.1:8000/api/formateur/rapports/${rapport.id}/download`}
                        className="download-btn"
                      >
                        <i className="bi bi-download"></i>
                      </a>
                    </td>

                    {/* EMAIL */}

                    <td>
                      <button
                        className="mail-btn"
                        onClick={() => {
                          axios.post(
                            `http://127.0.0.1:8000/api/formateur/rapports/${rapport.id}/send-email`,
                          );

                          alert("Email envoyé 📧");
                        }}
                      >
                        <i className="bi bi-envelope-fill"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* PAGINATION */}

            <div className="pagination">
              <button disabled={page === 1} onClick={() => setPage(page - 1)}>
                Previous
              </button>

              <span>
                Page {page} / {lastPage}
              </span>

              <button
                disabled={page === lastPage}
                onClick={() => setPage(page + 1)}
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default AtelierReports;
