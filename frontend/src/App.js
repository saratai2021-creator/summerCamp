import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";

// Shared components
import { Navbar } from "./shared/components/navbar";
import { Footer } from "./shared/components/footer";
import { Hero } from "./shared/components/hero";
import { WhyUs } from "./shared/components/whyUs";
import { Programs } from "./shared/components/programmes";

// Auth
import { Login } from "./auth/login";
import { Register } from "./auth/register";

// Visiteur
import { Ateliers } from "./visiteur/pages/ateliers";
import { Reservation } from "./visiteur/pages/reservation";
import { Dashboard } from "./visiteur/pages/Dashboard";
import { Profile } from "./visiteur/pages/Profile";
import { MesReservations } from "./visiteur/pages/MesReservations";

// Admin
import { AdminAteliers } from "./admin/pages/adminAtelier";
import { AdminAtelierForm } from "./admin/pages/AdminAtelierForm";
import { AdminReservations } from "./admin/pages/AdminReservations";
import { AdminLayout } from "./admin/components/AdminLayout";
import { AdminRoute } from "./admin/routes/AdminRoute";

// Formateur
import FormateurAteliers from "./pages/formateur/Ateliers";
import Students from "./pages/formateur/Students";
import CreateReport from "./pages/formateur/CreateReport";
import ReportResult from "./pages/formateur/ReportResult";
import ReportsHistory from "./pages/formateur/ReportsHistory";
import AtelierReports from "./pages/formateur/AtelierReports";
import { ParentRoute } from "./visiteur/components/ParentRoute";

function LayoutWrapper() {
  const location = useLocation();

  //const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <>
    <Navbar />
      <Routes>
        {/* HOME */}
        <Route
          path="/"
          element={
            <>
              <Hero />
              <WhyUs />
              <Programs />
            </>
          }
        />

        {/* AUTH */}
        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        {/* VISITEUR */}
       {/* PARENT */}
       
<Route path="/ateliers" element={<Ateliers />} />

<Route path="/reservation" element={<Reservation />} />

<Route path="/parent" element={
  <ParentRoute>
     <Dashboard />
     </ParentRoute>
 } />

<Route path="/parent/profile" element={<ParentRoute>
      <Profile />
    </ParentRoute>} />

<Route path="/parent/reservations" element={ <ParentRoute>
      <MesReservations />
    </ParentRoute>} />

        {/* ADMIN */}
        <Route
          path="/admin/*"
          element={
            <AdminRoute>
              <AdminLayout />
            </AdminRoute>
          }
        >
          <Route index element={<AdminAteliers />} />

          <Route path="ateliers" element={<AdminAteliers />} />

          <Route path="ateliers/create" element={<AdminAtelierForm />} />

          <Route path="ateliers/edit/:id" element={<AdminAtelierForm />} />

          <Route path="reservations" element={<AdminReservations />} />
        </Route>

        {/* FORMATEUR */}
        <Route path="/formateur" element={<FormateurAteliers />} />

        <Route path="/formateur/ateliers/:id/students" element={<Students />} />

        <Route
          path="/formateur/ateliers/:id/etudiants/:etudiantId/report"
          element={<CreateReport />}
        />
        <Route
          path="/formateur/rapports/:id/result"
          element={<ReportResult />}
        />
        <Route path="/formateur/rapports" element={<ReportsHistory />} />

        <Route
          path="/formateur/ateliers/:id/reports"
          element={<AtelierReports />}
        />

        {/* FALLBACK */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <Footer />
    </>
  );
}

function App() {
  return (
    <div className="app">
      <Router>
        <LayoutWrapper />
      </Router>
    </div>
  );
}

export default App;
