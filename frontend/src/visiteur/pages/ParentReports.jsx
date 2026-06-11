import { useEffect, useState } from "react";

import axios from "axios";

import "../../styles/Parent/parentReports.css";

function ParentReports() {
  const [rapports, setRapports] = useState([]);

  const [loading, setLoading] = useState(true);

  // | Charger rapports parent

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get("http://127.0.0.1:8000/api/parent/rapports", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      .then((res) => {
        setRapports(res.data);

        setLoading(false);
      })

      .catch((err) => {
        console.log(err);

        setLoading(false);
      });
  }, []);
  async function downloadPdf(id) {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://127.0.0.1:8000/api/formateur/rapports/${id}/download`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!response.ok) {
        throw new Error("Erreur téléchargement");
      }

      const blob = await response.blob();

      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");

      link.href = url;

      link.download = `rapport_${id}.pdf`;

      document.body.appendChild(link);

      link.click();

      link.remove();
    } catch (error) {
      console.log(error);

      alert("Erreur téléchargement PDF ❌");
    }
  }

  return (
    <div className="parent-reports-page">
      <div className="reports-header">
        <h1>Mes Rapports</h1>

        <p>Historique des rapports pédagogiques</p>
      </div>

      {loading ? (
        <div className="loading">Chargement...</div>
      ) : rapports.length === 0 ? (
        <div className="empty">Aucun rapport disponible</div>
      ) : (
        <div className="reports-grid">
          {rapports.map((rapport) => (
            <div key={rapport.id} className="report-card">
              <h3>{rapport.atelier?.titre}</h3>

              <p>
                <strong>Période :</strong> {rapport.date_debut} →{" "}
                {rapport.date_fin}
              </p>

              <p>
                <strong>Présence :</strong> {rapport.taux_presence}%
              </p>

              {/* <a
                href={`http://127.0.0.1:8000/api/formateur/rapports/${rapport.id}/download`}
                target="_blank"
                rel="noreferrer"
                className="download-btn"
              >
                Télécharger PDF
              </a> */}

              <button
                onClick={() => downloadPdf(rapport.id)}
                className="download-link"
              >
                <i className="bi bi-download"></i>
                Télécharger
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ParentReports;
