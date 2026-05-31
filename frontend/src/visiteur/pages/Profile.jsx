import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import "../../styles/Profile.css"

export function Profile() {

  const navigate = useNavigate()

  const [user, setUser] = useState(null)

  /* ===============================
     LOAD USER
  =============================== */
  useEffect(() => {

    const storedUser = JSON.parse(
      localStorage.getItem("user")
    )

    setUser(storedUser)

  }, [])

  return (

    <div className="profile-container">

      {/* TOPBAR */}

      <div className="profile-topbar">

        <div>

          <h2 className="profile-logo">
            Summer Camp
          </h2>

          <p className="profile-subtitle">
            Visitor Profile
          </p>

        </div>

        <button
          className="back-btn"
          onClick={() => navigate("/parent")}
        >
          Dashboard
        </button>

      </div>

      {/* PROFILE CARD */}

      <div className="profile-card">

        <div className="profile-avatar">
          👤
        </div>

        <h1>
          {user?.name || "parent"}
        </h1>

        <p className="profile-role">
          {user?.role || "parent"}
        </p>

        <div className="profile-info">

          <div className="profile-item">

            <span className="label">
              Full Name
            </span>

            <span className="value">
              {user?.name || "Non disponible"}
            </span>

          </div>

          <div className="profile-item">

            <span className="label">
              Email
            </span>

            <span className="value">
              {user?.email || "Non disponible"}
            </span>

          </div>

          <div className="profile-item">

            <span className="label">
              Role
            </span>

            <span className="value">
              {user?.role || "visiteur"}
            </span>

          </div>

        </div>

      </div>

    </div>
  )
}