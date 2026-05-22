import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/students.css";

function Students() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [students, setStudents] = useState([]);
  const [formation, setFormation] = useState(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/formations/${id}/students`)
      .then((res) => {
        setStudents(res.data.students);
        setFormation(res.data.formation);
        setLoading(false);
      });
  }, [id]);

  function genererRapport(studentId) {
    navigate(`/formations/${id}/students/${studentId}/report`);
  }

  function viewReports(studentId) {
    navigate(`/formations/${id}/students/${studentId}/reports`);
  }

  const filteredStudents = (students || []).filter((student) =>
    `${student.first_name} ${student.last_name}`
      .toLowerCase()
      .includes(search.toLowerCase()),
  );

  return (
    <div className="students-page">
      {/* BREADCRUMB */}

      <div className="breadcrumb">
        <i className="bi bi-house"></i>
        Formations
        <i className="bi bi-chevron-right"></i>
        {formation?.title}
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
              Formation :<strong> {formation?.title}</strong>
            </p>
          </div>
        </div>

        {/* STATS */}

        <div className="stats-cards">
          <div className="stat-card">
            <i className="bi bi-mortarboard"></i>

            <div>
              <span>Étudiants</span>

              <h3>{filteredStudents.length}</h3>
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
          <div className="skeleton-table"></div>
        ) : filteredStudents.length === 0 ? (
          <div className="empty-state">
            <i className="bi bi-person-x"></i>

            <p>Aucun étudiant trouvé</p>
          </div>
        ) : (
          <table className="table table-hover">
            <thead>
              <tr>
                <th>Nom</th>
                <th style={{ width: "260px" }}>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredStudents.map((student) => (
                <tr key={student.id}>
                  <td>
                    <div className="student-name">
                      <div className="avatar">{student.first_name[0]}</div>
                      {student.first_name} {student.last_name}
                    </div>
                  </td>

                  <td>
                    <button
                      className="btn btn-report"
                      onClick={() => genererRapport(student.id)}
                    >
                      <i className="bi bi-file-earmark-plus"></i>
                      Rapport
                    </button>

                    <button
                      className="btn btn-history"
                      onClick={() => viewReports(student.id)}
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
