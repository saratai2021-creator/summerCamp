import { useState, useEffect } from "react";

import { useNavigate, useParams } from "react-router-dom";

// import axios from "axios";

import {
  getAtelierStudents,
  createRapport,
} from "../../shared/services/AdminService";
import "../../styles/Formateur/createReport.css";
function CreateReport() {
  /*
  |--------------------------------------------------------------------------
  | Params
  |--------------------------------------------------------------------------
  */

  const { id, etudiantId } = useParams();

  const navigate = useNavigate();

  /*
  |--------------------------------------------------------------------------
  | States
  |--------------------------------------------------------------------------
  */

  const [etudiant, setEtudiant] = useState(null);

  const [atelier, setAtelier] = useState(null);

  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState({});

  /*
  |--------------------------------------------------------------------------
  | Formulaire
  |--------------------------------------------------------------------------
  */

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

  /*
  |--------------------------------------------------------------------------
  | Charger étudiant + atelier
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    getAtelierStudents(id)
      .then((data) => {
        console.log(data);

        setAtelier(data);

        const foundStudent = data.etudiants.find(
          (e) => e.id === Number(etudiantId),
        );

        setEtudiant(foundStudent);
      })

      .catch((err) => {
        console.log(err);
      });
  }, [id, etudiantId]);

  /*
  |--------------------------------------------------------------------------
  | Changer valeurs
  |--------------------------------------------------------------------------
  */

  const handleChange = (e) => {
    setReport({
      ...report,

      [e.target.name]: e.target.value,
    });

    /*
    |--------------------------------------------------------------------------
    | Supprimer erreur champ
    |--------------------------------------------------------------------------
    */

    if (errors[e.target.name]) {
      setErrors({
        ...errors,

        [e.target.name]: null,
      });
    }
  };

  /*
  |--------------------------------------------------------------------------
  | Calcul présence
  |--------------------------------------------------------------------------
  */

  const total = Number(report.total_seances);

  const present = Number(report.seances_assistees);

  const tauxPresence = total > 0 ? Math.round((present / total) * 100) : 0;

  /*
  |--------------------------------------------------------------------------
  | Calcul moyenne
  |--------------------------------------------------------------------------
  */

  const moyenneGenerale = (
    (Number(report.moyenne_exercices || 0) +
      Number(report.moyenne_examen || 0)) /
    2
  ).toFixed(1);

  /*
  |--------------------------------------------------------------------------
  | Soumission formulaire
  |--------------------------------------------------------------------------
  */

  function submitForm(e) {
    e.preventDefault();

    setLoading(true);

    setErrors({});

    createRapport({
      /*
      |--------------------------------------------------------------------------
      | Relations
      |--------------------------------------------------------------------------
      */

      etudiant_id: Number(etudiantId),

      atelier_id: Number(id),

      /*
      |--------------------------------------------------------------------------
      | Données formulaire
      |--------------------------------------------------------------------------
      */

      ...report,
    })
      .then((data) => {
        alert("Rapport généré avec succès 📄");

        console.log(data);

        /*
        |--------------------------------------------------------------------------
        | Redirection vers page résultat
        |--------------------------------------------------------------------------
        */

        navigate(`/formateur/rapports/${data.rapport.id}/result`);
      })

      .catch((err) => {
        console.log(err);

        if (err.response?.data?.errors) {
          setErrors(err.response.data.errors);

          alert("Veuillez corriger les champs");
        } else {
          alert("Erreur serveur");
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
        Ateliers
        <i className="bi bi-chevron-right"></i>
        {atelier?.titre}
        <i className="bi bi-chevron-right"></i>
        Étudiants :{etudiant?.prenom} {etudiant?.nom}
        <i className="bi bi-chevron-right"></i>
        Rapport
      </div>

      {/* CONTEXT */}

      <div className="context-card">
        {etudiant && atelier ? (
          <>
            <h4>
              <i className="fa-solid fa-user-graduate"></i>
              {etudiant?.prenom} {etudiant?.nom}
            </h4>

            <p>
              <i className="fa-solid fa-book-open"></i>

              {atelier?.titre}
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
              </div>

              <div className="col">
                <input
                  type="number"
                  name="seances_assistees"
                  placeholder="Séances assistées"
                  className="form-control"
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="presence-preview">
              <span>Taux de présence : {tauxPresence}%</span>

              <div className="progress">
                <div
                  className="progress-bar"
                  style={{
                    width: `${tauxPresence}%`,
                  }}
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
              Moyenne générale : {moyenneGenerale}
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
              placeholder="Modules terminés"
              className="form-control"
              onChange={handleChange}
            />

            <textarea
              name="modules_en_cours"
              placeholder="Modules en cours"
              className="form-control"
              onChange={handleChange}
            />
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

            <textarea
              name="points_forts"
              placeholder="Points forts"
              className="form-control"
              onChange={handleChange}
            />

            <textarea
              name="points_a_ameliorer"
              placeholder="Points à améliorer"
              className="form-control"
              onChange={handleChange}
            />

            <textarea
              name="recommandations"
              placeholder="Recommandations"
              className="form-control"
              onChange={handleChange}
            />
          </div>

          {/* BUTTON */}

          <button className="generate-btn" disabled={loading}>
            {loading ? "Génération..." : "Générer le rapport"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateReport;
