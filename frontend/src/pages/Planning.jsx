import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getPlannings } from "../services/AdminService"
import "../styles/Planning.css"

export function Planning() {
  const [child, setChild] = useState(null)
  const [adult, setAdult] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    load()
  }, [])

  const load = async () => {
    const data = await getPlannings()
    setChild(data.find(p => p.category === "child"))
    setAdult(data.find(p => p.category === "adult"))
  }

  return (
    <div className="planning-page">
      <h1 className="planning-title">
        Planning <span>Summer Camp</span>
      </h1>

      <div className="planning-grid">

        {child && (
          <div className="planning-card purple">
            <div className="accent-bar"></div>

            <div className="card-body">
              <div className="card-header">
                <div className="card-title">
                  <div className="icon-wrap">👶</div>
                  <h3>Enfant</h3>
                </div>
                <div className="tag">Child</div>
              </div>

              <div className="img-wrap">
                <img
                  src={`http://127.0.0.1:8000/storage/${child.image}`}
                  alt="Child Planning"
                />
              </div>

              <div className="img-label">
                <span className="label-text">Disponible</span>
                <span className="status-dot"></span>
              </div>

              <button
                className="reserve-btn"
                onClick={() => navigate("/reservation")}
              >
                Réserver
              </button>
            </div>
          </div>
        )}

        {adult && (
          <div className="planning-card lime">
            <div className="accent-bar"></div>

            <div className="card-body">
              <div className="card-header">
                <div className="card-title">
                  <div className="icon-wrap">🧑</div>
                  <h3>Adulte</h3>
                </div>
                <div className="tag">Adult</div>
              </div>

              <div className="img-wrap">
                <img
                  src={`http://127.0.0.1:8000/storage/${adult.image}`}
                  alt="Adult Planning"
                />
              </div>

              <div className="img-label">
                <span className="label-text">Disponible</span>
                <span className="status-dot"></span>
              </div>

              <button
                className="reserve-btn"
                onClick={() => navigate("/reservation")}
              >
                Réserver
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}