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

function LayoutWrapper() {
  const location = useLocation();

  const isAdminRoute =
    location.pathname.startsWith("/admin");

  return (
    <>
      {!isAdminRoute && <Navbar />}

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
        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        {/* VISITEUR */}
        <Route
          path="/ateliers"
          element={<Ateliers />}
        />

        <Route
          path="/reservation"
          element={<Reservation />}
        />

        <Route
          path="/visiteur"
          element={<Dashboard />}
        />

        <Route
          path="/visiteur/profile"
          element={<Profile />}
        />

        <Route
          path="/visiteur/reservations"
          element={<MesReservations />}
        />

        {/* ADMIN */}
        <Route
          path="/admin/*"
          element={
            <AdminRoute>
              <AdminLayout />
            </AdminRoute>
          }
        >
          <Route
            index
            element={<AdminAteliers />}
          />

          <Route
            path="ateliers"
            element={<AdminAteliers />}
          />

          <Route
            path="ateliers/create"
            element={<AdminAtelierForm />}
          />

          <Route
            path="ateliers/edit/:id"
            element={<AdminAtelierForm />}
          />

          <Route
            path="reservations"
            element={<AdminReservations />}
          />
        </Route>

        {/* FORMATEUR */}
        <Route
          path="/formateur"
          element={<FormateurAteliers />}
        />

        <Route
          path="/formateur/ateliers/:id/students"
          element={<Students />}
        />

        {/* FALLBACK */}
        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />
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