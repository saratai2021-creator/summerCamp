import { useEffect, useState } from "react"

//import "../../styles/Profile.css"

export function Profile() {

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

      <h1>Mon Profil</h1>

      <div className="profile-card">

        <div className="profile-item">

          <span className="label">
            Nom :
          </span>

          <span className="value">
            {user?.name || "Non disponible"}
          </span>

        </div>

        <div className="profile-item">

          <span className="label">
            Email :
          </span>

          <span className="value">
            {user?.email || "Non disponible"}
          </span>

        </div>

        <div className="profile-item">

          <span className="label">
            Rôle :
          </span>

          <span className="value">
            {user?.role || "visiteur"}
          </span>

        </div>

      </div>

    </div>
  )
}