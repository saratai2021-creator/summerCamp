import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import "../styles/FormationReports.css";

function FormationReports() {
  const { id } = useParams();

  const [reports, setReports] = useState([]);
  const [formation, setFormation] = useState(null);

  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setLoading(true);

    axios
      .get(`http://127.0.0.1:8000/api/formations/${id}`)
      .then((res) => setFormation(res.data));

    axios
      .get(`http://127.0.0.1:8000/api/formations/${id}/reports`)
      .then((res) => {
        setReports(res.data);

        setLoading(false);
      });
  }, [id]);

  const calculateScore = (report) => {
    const presence = report.taux_presence || 0;

    const grade =
      ((report.moyenne_exercices || 0) + (report.moyenne_examen || 0)) / 2;

    return Math.round((presence + grade) / 2);
  };

  const filteredReports = reports.filter((report) => {
    const name =
      `${report.student.first_name} ${report.student.last_name}`.toLowerCase();

    return name.includes(search.toLowerCase());
  });

  return (
    <div className="container-fluid elite-page">
      {/* BREADCRUMB */}

      <nav className="elite-breadcrumb mb-4">
        <span className="breadcrumb-item">
          <i className="bi bi-mortarboard"></i>
          Formations
        </span>

        <span className="breadcrumb-item active">
          {formation ? formation.title : "Chargement..."}
        </span>
      </nav>

      <div className="elite-card">
        <div className="elite-card-header">
          <h4>
            <i className="bi bi-file-earmark-text me-2"></i>
            Rapports de la formation {""}
            {formation ? formation.title : "Chargement..."}
          </h4>
        </div>

        {/* SEARCH */}

        <input
          type="text"
          className="form-control mb-3"
          placeholder="🔎 Rechercher un étudiant..."
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
                <th>Présence</th>
                <th>Score</th>
                <th>Date</th>
                <th>PDF</th>
              </tr>
            </thead>

            <tbody>
              {loading
                ? [...Array(5)].map((_, i) => (
                    <tr key={i}>
                      <td colSpan="6">
                        <div className="skeleton-row"></div>
                      </td>
                    </tr>
                  ))
                : filteredReports.map((report) => (
                    <tr key={report.id} className="elite-row">
                      <td>{report.id}</td>

                      <td>
                        <div className="student-cell">
                          <i className="bi bi-person-circle"></i>
                          {report.student.first_name} {report.student.last_name}
                        </div>
                      </td>

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
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default FormationReports;
