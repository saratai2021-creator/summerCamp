import { useNavigate } from "react-router-dom"

import "../../styles/Dashboard.css"

export function Dashboard() {

  const navigate = useNavigate()

  const user = JSON.parse(
    localStorage.getItem("user")
  )

  const handleLogout = () => {

    localStorage.removeItem("token")

    localStorage.removeItem("user")

    navigate("/login")
  }

  return (

    <div className="dashboard-container">

      {/* TOP BAR */}

      <div className="dashboard-topbar">

        <div>

          <h2 className="dashboard-logo">
            Summer Camp
          </h2>

          <p className="dashboard-subtitle">
            Visitor Space
          </p>

        </div>

        <button
          className="logout-btn"
          onClick={handleLogout}
        >
          Logout
        </button>

      </div>

      {/* HERO */}

      <div className="dashboard-hero">

        <div>

          <h1>
            Welcome back,
            {" "}
            {user?.name || "Visitor"} 👋
          </h1>

          <p>
            Manage your workshops and reservations easily.
          </p>

        </div>

      </div>

      {/* CARDS */}

      <div className="dashboard-cards">

        {/* profile */}

        <div className="dashboard-card">

          <div className="card-icon">
            👤
          </div>

          <h2>My Profile</h2>

          <p>
            View your personal information.
          </p>

          <button
            onClick={() =>
              navigate("/parent/profile")
            }
          >
            Open
          </button>

        </div>

        {/* reservations */}

        <div className="dashboard-card">

          <div className="card-icon">
            📅
          </div>

          <h2>Reservations</h2>

          <p>
            Check your reservation history.
          </p>

          <button
            onClick={() =>
              navigate("/parent/reservations")
            }
          >
            Open
          </button>

        </div>

        {/* reserve */}

        <div className="dashboard-card">

          <div className="card-icon">
            🚀
          </div>

          <h2>New Reservation</h2>

          <p>
            Reserve a new workshop quickly.
          </p>

          <button
            onClick={() =>
              navigate("/reservation")
            }
          >
            Reserve
          </button>

        </div>

        {/* reports */}

        <div className="dashboard-card">

          <div className="card-icon">
            📄
          </div>

          <h2>Reports</h2>

          <p>
            View your educational reports.
          </p>

          <button
            onClick={() =>
              navigate("/parent/rapports")
            }
          >
            Open
          </button>

        </div>

      </div>

    </div>
  )
}