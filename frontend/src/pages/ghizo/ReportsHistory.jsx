import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/ReportsHistory.css";

function ReportsHistory() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [formationFilter, setFormationFilter] = useState("");

  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  useEffect(() => {
    setLoading(true);

    axios.get(`http://127.0.0.1:8000/api/reports?page=${page}`).then((res) => {
      setReports(res.data.data);
      setLastPage(res.data.last_page);

      setLoading(false);
    });
  }, [page]);

  const calculateScore = (report) => {
    const presence = report.taux_presence || 0;

    const grade =
      ((report.moyenne_exercices || 0) + (report.moyenne_examen || 0)) / 2;

    return Math.round((presence + grade) / 2);
  };

  const formations = [
    ...new Set(reports.map((r) => r.formation?.title).filter(Boolean)),
  ];

  const filteredReports = reports.filter((report) => {
    const fullName =
      `${report.student.first_name} ${report.student.last_name}`.toLowerCase();

    const matchSearch = fullName.includes(search.toLowerCase());

    const matchFormation =
      formationFilter === "" || report.formation?.title === formationFilter;

    return matchSearch && matchFormation;
  });

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

        <span className="breadcrumb-item active">Historique</span>
      </nav>

      <div className="elite-card">
        <div className="elite-card-header">
          <h4>
            <i className="bi bi-clock-history me-2"></i>
            Historique des rapports
          </h4>
        </div>

        {/* Search + Filter */}

        <div className="row mb-3">
          <div className="col-md-6">
            <input
              type="text"
              className="form-control"
              placeholder="🔎 Rechercher un étudiant..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="col-md-4">
            <select
              className="form-select"
              value={formationFilter}
              onChange={(e) => setFormationFilter(e.target.value)}
            >
              <option value="">Toutes les formations</option>

              {formations.map((f, index) => (
                <option key={index} value={f}>
                  {f}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Table */}

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
              {loading
                ? [...Array(6)].map((_, i) => (
                    <tr key={i}>
                      <td colSpan="8">
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
                        <span className="formation-badge">
                          <i className="bi bi-mortarboard"></i>

                          {report.formation?.title || "N/A"}
                        </span>
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

                      <td>
                        <button
                          className="btn elite-btn-mail btn-sm"
                          onClick={() => {
                            axios.post(
                              `http://127.0.0.1:8000/api/reports/${report.id}/send-email`,
                            );
                          }}
                        >
                          <i className="bi bi-envelope"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}

        <div className="mt-4 d-flex justify-content-center align-items-center">
          <button
            className="btn btn-outline-primary me-3"
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
          >
            Previous
          </button>

          <span>
            Page <strong>{page}</strong> / {lastPage}
          </span>

          <button
            className="btn btn-outline-primary ms-3"
            disabled={page === lastPage}
            onClick={() => setPage(page + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default ReportsHistory;
