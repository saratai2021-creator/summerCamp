import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/StudentReports.css";

function StudentReports() {
  const { formationId, studentId } = useParams();

  const [reports, setReports] = useState([]);
  const [student, setStudent] = useState(null);

  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setLoading(true);

    axios
      .get(`http://127.0.0.1:8000/api/students/${studentId}`)
      .then((res) => setStudent(res.data));

    axios
      .get(
        `http://127.0.0.1:8000/api/formations/${formationId}/students/${studentId}/reports`,
      )
      .then((res) => {
        console.log("DATA API:", res.data);
        setReports(res.data);
        setLoading(false);
      });
  }, [formationId, studentId]);

  function sendEmail(reportId) {
    axios
      .post(`http://127.0.0.1:8000/api/reports/${reportId}/send-email`)
      .then(() => {
        toast.success("Rapport envoyé aux parents 📧");
      })
      .catch(() => {
        toast.error("Erreur lors de l'envoi");
      });
  }

  const calculateScore = (report) => {
    const presence = report.taux_presence || 0;

    const grade =
      ((report.moyenne_exercices || 0) + (report.moyenne_examen || 0)) / 2;

    return Math.round((presence + grade) / 2);
  };

  const filteredReports = reports.filter((report) => {
    const keyword = search.toLowerCase();

    return (
      report.appreciation_generale?.toLowerCase().includes(keyword) ||
      report.points_forts?.toLowerCase().includes(keyword) ||
      report.recommandations?.toLowerCase().includes(keyword) ||
      report.date_generation?.toLowerCase().includes(keyword)
    );
  });

  return (
    <div className="container-fluid elite-page">
      {/* BREADCRUMB */}

      <nav className="elite-breadcrumb mb-4">
        <span className="breadcrumb-item">
          <i className="bi bi-mortarboard"></i>
          Formation
        </span>

        <span className="breadcrumb-item">
          <i className="bi bi-person"></i>

          {student
            ? `${student.first_name} ${student.last_name}`
            : "Chargement..."}
        </span>

        <span className="breadcrumb-item active">Rapports</span>
      </nav>

      <div className="elite-card">
        <div className="elite-card-header">
          <h4>
            <i className="bi bi-file-earmark-text me-2"></i>
            Rapports de l'étudiant
          </h4>
        </div>

        {/* SEARCH */}

        <input
          type="text"
          className="form-control mb-3"
          placeholder="🔎 Rechercher dans les rapports..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* TABLE */}

        <div className="table-responsive">
          <table className="table elite-table align-middle">
            <thead>
              <tr>
                <th>#</th>
                <th>Étudiant</th>
                <th>Formation</th>
                <th>Présence</th>
                <th>Score</th>
                <th>Date</th>
                <th>PDF</th>
                <th>Email</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                [...Array(4)].map((_, i) => (
                  <tr key={i}>
                    <td colSpan="6">
                      <div className="skeleton-row"></div>
                    </td>
                  </tr>
                ))
              ) : filteredReports.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center">
                    Aucun rapport trouvé
                  </td>
                </tr>
              ) : (
                filteredReports.map((report) => (
                  <tr key={report.id} className="elite-row">
                    <td>{report.id}</td>
                    <td>
                      {student?.first_name} {student?.last_name}
                    </td>

                    <td>{report.formation?.title}</td>
                    <td>
                      <div className="progress elite-progress">
                        <div
                          className="progress-bar bg-success"
                          style={{
                            width: `${report.taux_presence || 0}%`,
                          }}
                        >
                          {Math.round(report.taux_presence || 0)}%
                        </div>
                      </div>
                    </td>

                    <td>
                      <span className="score-badge">
                        <i className="bi bi-graph-up"></i>
                        {calculateScore(report)}%
                      </span>
                    </td>

                    <td>
                      <i className="bi bi-calendar3"></i>{" "}
                      {new Date(report.date_generation).toLocaleDateString()}
                    </td>

                    <td>
                      <a
                        href={`http://127.0.0.1:8000/api/reports/${report.id}/download`}
                        className="btn elite-btn-download btn-sm"
                      >
                        <i className="bi bi-download"></i>
                      </a>
                    </td>

                    <td>
                      <button
                        className="btn elite-btn-mail btn-sm"
                        onClick={() => sendEmail(report.id)}
                      >
                        <i className="bi bi-envelope"></i>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={3000} theme="colored" />
    </div>
  );
}

export default StudentReports;
