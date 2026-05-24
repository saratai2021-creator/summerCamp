import { Link, Outlet, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { getAteliers, getReservations } from "../../shared/services/AdminService"
import "../../styles/admin.css"

export function AdminLayout() {

  const navigate = useNavigate()

  const [atelierCount, setAtelierCount] = useState(0)
  const [reservationCount, setReservationCount] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {

    const checkAuth = async () => {

      const token = localStorage.getItem("token")

      // No token → redirect
      if (!token) {
        navigate("/admin/login", { replace: true })
        return
      }

      try {

        const response = await fetch("http://127.0.0.1:8000/api/reservations", {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json"
          }
        })

        // Invalid token → logout
        if (response.status === 401) {
          localStorage.removeItem("token")
          navigate("/admin/login", { replace: true })
          return
        }

        // Token valid → load dashboard data
        await loadCounts()

      } catch (error) {

        console.error("Auth check failed:", error)
        localStorage.removeItem("token")
        navigate("/admin/login", { replace: true })

      } finally {

        setLoading(false)

      }

    }

    checkAuth()

  }, [navigate])

  const loadCounts = async () => {

    const ateliers = await getAteliers()
    const reservations = await getReservations()

    setAtelierCount(ateliers?.length || 0)
    setReservationCount(reservations?.length || 0)

  }

  const logout = () => {
    localStorage.removeItem("token")
    navigate("/admin/login", { replace: true })
  }

  if (loading) {
    return <div className="admin-loading">Loading...</div>
  }

  return (

    <div className="admin-container">

      <aside className="admin-sidebar">

        <h2>Tableau de bord</h2>

        <ul>

          <li>
            <Link to="/admin/ateliers">
              Ateliers ({atelierCount})
            </Link>
          </li>

          <li>
            <Link to="/admin/reservations">
              Réservations ({reservationCount})
            </Link>
          </li>
         

          <li>
            <button onClick={logout}>
              Logout
            </button>
          </li>

        </ul>

      </aside>

      <main className="admin-main">
        <Outlet />
      </main>

    </div>

  )
}