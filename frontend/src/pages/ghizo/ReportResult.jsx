import { useParams } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "../styles/ReportResult.css";

function ReportResult() {
  const { id } = useParams();

  const [sending, setSending] = useState(false);

  function sendEmail() {
    setSending(true);

    axios
      .post(`http://127.0.0.1:8000/api/reports/${id}/send-email`)
      .then(() => {
        toast.success("Email envoyé aux parents 📧");

        setSending(false);
      })
      .catch(() => {
        toast.error("Erreur lors de l'envoi ❌");

        setSending(false);
      });
  }

  return (
    <div className="container-fluid elite-page">
      {/* Breadcrumb */}

      <nav className="elite-breadcrumb mb-4">
        <span className="breadcrumb-item">
          <i className="bi bi-speedometer2"></i> Dashboard
        </span>

        <span className="breadcrumb-item">
          <i className="bi bi-file-earmark-text"></i> Rapports
        </span>

        <span className="breadcrumb-item active">Résultat</span>
      </nav>

      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="elite-result-card">
            <div className="success-icon">
              <i className="bi bi-check-circle-fill"></i>
            </div>

            <h3 className="success-title">Rapport généré avec succès</h3>

            <p className="success-text">
              Vous pouvez télécharger le rapport ou l'envoyer aux parents.
            </p>

            <div className="action-buttons">
              <a
                href={`http://127.0.0.1:8000/api/reports/${id}/download`}
                className="btn elite-btn-download"
              >
                <i className="bi bi-download me-2"></i>
                Télécharger PDF
              </a>

              <button
                onClick={sendEmail}
                className="btn elite-btn-mail"
                disabled={sending}
              >
                {sending ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2"></span>
                    Envoi...
                  </>
                ) : (
                  <>
                    <i className="bi bi-envelope me-2"></i>
                    Envoyer aux parents
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Toast container */}

      <ToastContainer position="top-right" autoClose={3000} theme="colored" />
    </div>
  );
}

export default ReportResult;
