import { Routes, Route } from "react-router-dom";
import "./styles/layout.css";

import Formations from "./pages/Formations";
import Students from "./pages/Students";
import CreateReport from "./pages/CreateReport";
import ReportResult from "./pages/ReportResult";
import ReportsHistory from "./pages/ReportsHistory";
import FormationReports from "./pages/FormationReports";
import StudentReports from "./pages/StudentReports";
import Header from "./components/Header";
import Footer from "./components/Footer";
function App() {
  return (
    <>
      <Header />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Formations />} />
          <Route path="/formations/:id/students" element={<Students />} />
          {/* <Route
        path="/formations/:formationId/students/:id/report"
        element={<CreateReport />}
      /> */}
          <Route
            path="/formations/:formationId/students/:id/report"
            element={<CreateReport />}
          />
          <Route path="/report/result/:id" element={<ReportResult />} />
          <Route path="/reports/history" element={<ReportsHistory />} />
          <Route
            path="/formations/:id/reports"
            element={<FormationReports />}
          />
          {/* <Route
        path="/formations/:formationId/students/:studentId/reports"
        element={<StudentReports />}
      />{" "} */}
          <Route
            path="/formations/:formationId/students/:studentId/reports"
            element={<StudentReports />}
          />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
