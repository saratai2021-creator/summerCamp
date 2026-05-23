import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";

import { Navbar } from "./components/navbar";
import { Hero } from "./components/hero";
import { Ateliers } from "./pages/ateliers";
import { Footer } from "./components/footer";
import { Reservation } from "./pages/reservation";
import { WhyUs } from "./components/whyUs";
import { Programs } from "./components/programms";
import { Planning } from "./pages/Planning";

import { AdminAtelierForm } from "./pages/AdminAtelierForm";
import { AdminAteliers } from "./pages/adminAtelier";
import { AdminLayout } from "./pages/AdminLayout";
import { AdminReservations } from "./pages/AdminReservations";
import { AdminLogin } from "./pages/AdminLogin";
import { AdminPlannings } from "./pages/AdminPlanning"; // ✅ FIXED NAME

import { AdminRoute } from "./pages/AdminRoute";

// importation de formateur
import FormateurAteliers from "./pages/formateur/Ateliers";
import Students from "./pages/formateur/Students";

function LayoutWrapper() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <>
      {!isAdminRoute && <Navbar />}

      <Routes>
        {/* PUBLIC */}
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

        <Route path="/ateliers" element={<Ateliers />} />
        <Route path="/planning" element={<Planning />} />
        <Route path="/reservation" element={<Reservation />} />

        <Route path="/login" element={<Navigate to="/admin/login" replace />} />

        {/* ADMIN LOGIN */}
        <Route path="/admin/login" element={<AdminLogin />} />

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

          {/* ✅ PLANNINGS */}
          <Route path="plannings" element={<AdminPlannings />} />

          <Route path="reservations" element={<AdminReservations />} />
        </Route>

        {/* <Route path="*" element={<Navigate to="/" replace />} /> */}

        {/* route formateur */}
        <Route path="/formateur" element={<FormateurAteliers />} />

        <Route path="/formateur/ateliers/:id/students" element={<Students />} />

        {/*-----------------------------------------------  */}
        {/* j'ai remplacée ça ici parce que ne marche pas */}
        {/* always LAST */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {!isAdminRoute && <Footer />}
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
