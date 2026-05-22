import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "../styles/CreateReport.css";

function CreateReport() {
  const { id, formationId } = useParams();
  const navigate = useNavigate();

  const [student, setStudent] = useState(null);
  const [formation, setFormation] = useState(null);

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const [report, setReport] = useState({
    date_debut: "",
    date_fin: "",
    total_seances: "",
    seances_assistees: "",
    moyenne_exercices: "",
    moyenne_examen: "",
    modules_termines: "",
    modules_en_cours: "",
    appreciation_generale: "",
    points_forts: "",
    points_a_ameliorer: "",
    recommandations: "",
  });

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/students/${id}`)
      .then((res) => setStudent(res.data));

    axios
      .get(`http://127.0.0.1:8000/api/formations/${formationId}`)
      .then((res) => setFormation(res.data));
  }, []);

  const handleChange = (e) => {
    setReport({
      ...report,
      [e.target.name]: e.target.value,
    });

    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: null,
      });
    }
  };

  const total = Number(report.total_seances);
  const present = Number(report.seances_assistees);

  const tauxPresence = total > 0 ? Math.round((present / total) * 100) : 0;

  const scoreGlobal = (
    (Number(report.moyenne_exercices || 0) +
      Number(report.moyenne_examen || 0)) /
    2
  ).toFixed(1);

  function submitForm(e) {
    e.preventDefault();

    setLoading(true);
    setErrors({});

    axios
      .post("http://127.0.0.1:8000/api/reports", {
        student_id: Number(id),
        formation_id: Number(formationId),

        ...report,
      })

      .then((res) => {
        toast.success("Rapport généré avec succès 📄");

        const reportId = res.data.report_id;

        setTimeout(() => {
          navigate(`/report/result/${reportId}`);
        }, 1500);
      })

      .catch((err) => {
        if (err.response?.data?.errors) {
          setErrors(err.response.data.errors);
          toast.error("Veuillez corriger les champs obligatoires");
        } else {
          toast.error("Erreur serveur");
        }
      })

      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <div className="elite-container">
      {/* BREADCRUMB */}

      <div className="breadcrumb">
        <i className="bi bi-house"></i>
        Formations
        <i className="bi bi-chevron-right"></i>
        {formation?.title}
        <i className="bi bi-chevron-right"></i>
        Étudiants : {student?.first_name} {student?.last_name}
        <i className="bi bi-chevron-right"></i>
        Rapport
      </div>

      {/* CONTEXT CARD */}

      <div className="context-card">
        {student && formation ? (
          <>
            <h4>
              <i className="fa-solid fa-user-graduate"></i>
              {student?.first_name} {student?.last_name}
            </h4>

            <p>
              <i className="fa-solid fa-book-open"></i>
              {formation?.title}
            </p>
          </>
        ) : (
          <div className="skeleton-wrapper">
            <div className="skeleton skeleton-title"></div>
            <div className="skeleton skeleton-text"></div>
          </div>
        )}
      </div>

      {/* CARD */}

      <div className="elite-card">
        <h2 className="elite-title">
          <i className="bi bi-file-earmark-text"></i>
          Créer un rapport pédagogique
        </h2>

        <form onSubmit={submitForm}>
          {/* PERIODE */}

          <div className="section">
            <h4>
              <i className="bi bi-calendar-event"></i>
              Période
            </h4>

            <div className="row">
              <div className="col">
                <label>Date début</label>

                <input
                  type="date"
                  name="date_debut"
                  className="form-control"
                  onChange={handleChange}
                />

                {errors.date_debut && (
                  <small className="error">{errors.date_debut[0]}</small>
                )}
              </div>

              <div className="col">
                <label>Date fin</label>

                <input
                  type="date"
                  name="date_fin"
                  className="form-control"
                  onChange={handleChange}
                />

                {errors.date_fin && (
                  <small className="error">{errors.date_fin[0]}</small>
                )}
              </div>
            </div>
          </div>

          {/* PRESENCE */}

          <div className="section">
            <h4>
              <i className="bi bi-bar-chart-line"></i>
              Présence
            </h4>

            <div className="row">
              <div className="col">
                <input
                  type="number"
                  name="total_seances"
                  placeholder="Total séances"
                  className="form-control"
                  onChange={handleChange}
                />

                {errors.total_seances && (
                  <small className="error">{errors.total_seances[0]}</small>
                )}
              </div>

              <div className="col">
                <input
                  type="number"
                  name="seances_assistees"
                  placeholder="Séances assistées"
                  className="form-control"
                  onChange={handleChange}
                />

                {errors.seances_assistees && (
                  <small className="error">{errors.seances_assistees[0]}</small>
                )}
              </div>
            </div>

            <div className="presence-preview">
              <span>Taux de présence : {tauxPresence}%</span>

              <div className="progress">
                <div
                  className="progress-bar"
                  style={{ width: `${tauxPresence}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* PERFORMANCE */}

          <div className="section">
            <h4>
              <i className="bi bi-graph-up"></i>
              Performance
            </h4>

            <div className="row">
              <div className="col">
                <input
                  type="number"
                  step="0.1"
                  name="moyenne_exercices"
                  placeholder="Moyenne exercices"
                  className="form-control"
                  onChange={handleChange}
                />
              </div>

              <div className="col">
                <input
                  type="number"
                  step="0.1"
                  name="moyenne_examen"
                  placeholder="Moyenne examen"
                  className="form-control"
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="score-preview">
              <i className="bi bi-trophy"></i>
              Score global : {scoreGlobal}
            </div>
          </div>

          {/* MODULES */}

          <div className="section">
            <h4>
              <i className="bi bi-box-seam"></i>
              Modules
            </h4>

            <textarea
              name="modules_termines"
              placeholder="Modules terminés (un module par ligne )"
              className="form-control"
              onChange={handleChange}
            />

            {errors.modules_termines && (
              <small className="error">{errors.modules_termines[0]}</small>
            )}

            <textarea
              name="modules_en_cours"
              placeholder="Modules en cours (un module par ligne)"
              className="form-control"
              onChange={handleChange}
            />

            {errors.modules_en_cours && (
              <small className="error">{errors.modules_en_cours[0]}</small>
            )}
          </div>

          {/* COMMENTAIRES */}

          <div className="section">
            <h4>
              <i className="bi bi-chat-square-text"></i>
              Évaluation pédagogique
            </h4>

            <textarea
              name="appreciation_generale"
              placeholder="Appréciation générale"
              className="form-control"
              onChange={handleChange}
            />

            {errors.appreciation_generale && (
              <small className="error">{errors.appreciation_generale[0]}</small>
            )}

            <textarea
              name="points_forts"
              placeholder="Points forts"
              className="form-control"
              onChange={handleChange}
            />

            {errors.points_forts && (
              <small className="error">{errors.points_forts[0]}</small>
            )}

            <textarea
              name="points_a_ameliorer"
              placeholder="Points à améliorer"
              className="form-control"
              onChange={handleChange}
            />

            {errors.points_a_ameliorer && (
              <small className="error">{errors.points_a_ameliorer[0]}</small>
            )}

            <textarea
              name="recommandations"
              placeholder="Recommandations"
              className="form-control"
              onChange={handleChange}
            />

            {errors.recommandations && (
              <small className="error">{errors.recommandations[0]}</small>
            )}
          </div>

          <button className="generate-btn" disabled={loading}>
            {loading ? " Génération..." : " Générer le rapport"}
          </button>
        </form>
      </div>

      <ToastContainer position="top-right" autoClose={3000} theme="colored" />
    </div>
  );
}

export default CreateReport;
