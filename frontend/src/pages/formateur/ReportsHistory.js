import { useEffect, useState } from "react";

import axios from "axios";

import "../../styles/Formateur/reportsHistory.css";

function ReportsHistory() {
  /*
  |--------------------------------------------------------------------------
  | States
  |--------------------------------------------------------------------------
  */

  const [rapports, setRapports] = useState([]);

  const [loading, setLoading] = useState(true);

  /*
  |--------------------------------------------------------------------------
  | Charger rapports
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    axios

      .get("http://127.0.0.1:8000/api/formateur/rapports")

      .then((res) => {
        /*
        |--------------------------------------------------------------------------
        | Laravel paginate()
        |--------------------------------------------------------------------------
        */

        setRapports(res.data.data);

        setLoading(false);
      })

      .catch((err) => {
        console.log(err);

        setLoading(false);
      });
  }, []);

  return (
    <div className="history-page">
      {/* HEADER */}

      <div className="history-header">
        <div>
          <h1>
            <i className="bi bi-clock-history"></i>
            Historique des rapports
          </h1>

          <p>Liste des rapports générés</p>
        </div>
      </div>

      {/* TABLE */}

      <div className="history-card">
        {loading ? (
          <div className="loading-state">Chargement...</div>
        ) : rapports.length === 0 ? (
          <div className="empty-state">
            <i className="bi bi-folder-x"></i>

            <p>Aucun rapport trouvé</p>
          </div>
        ) : (
          <table className="history-table">
            <thead>
              <tr>
                <th>Étudiant</th>

                <th>Atelier</th>

                <th>Présence</th>

                <th>Date</th>

                <th>PDF</th>
              </tr>
            </thead>

            <tbody>
              {rapports.map((rapport) => (
                <tr key={rapport.id}>
                  {/* STUDENT */}

                  <td>
                    <div className="student-info">
                      <div className="avatar">{rapport.etudiant?.nom?.[0]}</div>

                      <span>
                        {rapport.etudiant?.prenom} {rapport.etudiant?.nom}
                      </span>
                    </div>
                  </td>

                  {/* ATELIER */}

                  <td>{rapport.atelier?.titre}</td>

                  {/* PRESENCE */}

                  <td>
                    <span className="presence-badge">
                      {rapport.taux_presence}%
                    </span>
                  </td>

                  {/* DATE */}

                  <td>{rapport.created_at?.slice(0, 10)}</td>

                  {/* PDF */}

                  <td>
                    <a
                      href={`http://127.0.0.1:8000/api/formateur/rapports/${rapport.id}/download`}
                      className="download-link"
                    >
                      <i className="bi bi-download"></i>
                      Télécharger
                    </a>
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

export default ReportsHistory;
