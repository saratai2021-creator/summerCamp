// import { useParams } from "react-router-dom";

// import { useState } from "react";

// import axios from "axios";

// import "../../styles/Formateur/reportResult.css";

// function ReportResult() {
//   const { id } = useParams();

//   const [sending, setSending] = useState(false);

//   const [message, setMessage] = useState("");

//   const [error, setError] = useState("");

//   /*
//   |--------------------------------------------------------------------------
//   | Envoyer email
//   |--------------------------------------------------------------------------
//   */

//   function sendEmail() {
//     setSending(true);

//     setMessage("");

//     setError("");

//     axios
//       .post(`http://127.0.0.1:8000/api/formateur/rapports/${id}/send-email`)

//       .then(() => {
//         setMessage("Email envoyé aux parents 📧");

//         setSending(false);
//       })

//       .catch(() => {
//         setError("Erreur lors de l'envoi ❌");

//         setSending(false);
//       });
//   }

//   return (
//     <div className="result-page">
//       {/* BREADCRUMB */}

//       <div className="result-breadcrumb">
//         <span>
//           <i className="bi bi-speedometer2"></i>
//           Dashboard
//         </span>

//         <i className="bi bi-chevron-right"></i>

//         <span>
//           <i className="bi bi-file-earmark-text"></i>
//           Rapports
//         </span>

//         <i className="bi bi-chevron-right"></i>

//         <span className="active">Résultat</span>
//       </div>

//       {/* CARD */}

//       <div className="result-card">
//         {/* ICON */}

//         <div className="success-icon">
//           <i className="bi bi-check-circle-fill"></i>
//         </div>

//         {/* TITLE */}

//         <h2>Rapport généré avec succès</h2>

//         <p>
//           Vous pouvez maintenant télécharger le rapport PDF ou l'envoyer aux
//           parents.
//         </p>

//         {/* ALERTS */}

//         {message && (
//           <div className="success-alert">
//             <i className="bi bi-check-circle-fill"></i>

//             {message}
//           </div>
//         )}

//         {error && (
//           <div className="error-alert">
//             <i className="bi bi-exclamation-circle-fill"></i>

//             {error}
//           </div>
//         )}

//         {/* BUTTONS */}

//         <div className="result-actions">
//           {/* DOWNLOAD */}

//           <a
//             href={`http://127.0.0.1:8000/api/formateur/rapports/${id}/download`}
//             className="download-btn"
//           >
//             <i className="bi bi-download"></i>
//             Télécharger PDF
//           </a>

//           {/* EMAIL */}

//           <button onClick={sendEmail} className="mail-btn" disabled={sending}>
//             {sending ? (
//               <>
//                 <span className="spinner-border spinner-border-sm"></span>
//                 Envoi...
//               </>
//             ) : (
//               <>
//                 <i className="bi bi-envelope-fill"></i>
//                 Envoyer aux parents
//               </>
//             )}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ReportResult;
import { useParams } from "react-router-dom";

import { useState } from "react";

// import axios from "axios";

import { sendReportEmail } from "../../shared/services/AdminService";

import "../../styles/Formateur/reportResult.css";

function ReportResult() {
  const { id } = useParams();

  const [sending, setSending] = useState(false);

  const [message, setMessage] = useState("");

  const [error, setError] = useState("");

  /*
  |--------------------------------------------------------------------------
  | Envoyer email
  |--------------------------------------------------------------------------
  */

  function sendEmail() {
    setSending(true);

    setMessage("");

    setError("");

    sendReportEmail(id)
      .then(() => {
        setMessage("Email envoyé aux parents 📧");

        setSending(false);
      })

      .catch(() => {
        setError("Erreur lors de l'envoi ❌");

        setSending(false);
      });
  }
  /*
|--------------------------------------------------------------------------
| Télécharger PDF
|--------------------------------------------------------------------------
*/

  async function downloadPdf() {
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

      setError("Erreur téléchargement PDF ❌");
    }
  }
  return (
    <div className="result-page">
      {/* BREADCRUMB */}

      <div className="result-breadcrumb">
        <span>
          <i className="bi bi-speedometer2"></i>
          Dashboard
        </span>

        <i className="bi bi-chevron-right"></i>

        <span>
          <i className="bi bi-file-earmark-text"></i>
          Rapports
        </span>

        <i className="bi bi-chevron-right"></i>

        <span className="active">Résultat</span>
      </div>

      {/* CARD */}

      <div className="result-card">
        {/* ICON */}

        <div className="success-icon">
          <i className="bi bi-check-circle-fill"></i>
        </div>

        {/* TITLE */}

        <h2>Rapport généré avec succès</h2>

        <p>
          Vous pouvez maintenant télécharger le rapport PDF ou l'envoyer aux
          parents.
        </p>

        {/* ALERTS */}

        {message && (
          <div className="success-alert">
            <i className="bi bi-check-circle-fill"></i>

            {message}
          </div>
        )}

        {error && (
          <div className="error-alert">
            <i className="bi bi-exclamation-circle-fill"></i>

            {error}
          </div>
        )}

        {/* BUTTONS */}

        <div className="result-actions">
          {/* DOWNLOAD */}

          <button className="download-btn" onClick={downloadPdf}>
            <i className="bi bi-download"></i>
            Télécharger PDF
          </button>

          {/* EMAIL */}

          <button onClick={sendEmail} className="mail-btn" disabled={sending}>
            {sending ? (
              <>
                <span className="spinner-border spinner-border-sm"></span>
                Envoi...
              </>
            ) : (
              <>
                <i className="bi bi-envelope-fill"></i>
                Envoyer aux parents
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ReportResult;
