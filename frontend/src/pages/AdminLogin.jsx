import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import "../styles/login.css";
export function AdminLogin() {

  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) {
      navigate("/admin")
    }
  }, [navigate])

  const handleLogin = async (e) => {
    e.preventDefault()

    setLoading(true)
    setError("")

    try {

      const response = await fetch("http://127.0.0.1:8000/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          email,
          password
        })
      })

      const data = await response.json()

      if (response.ok && data.token) {

        localStorage.setItem("token", data.token)
        navigate("/admin")

      } else {

        setError(data.message || "Invalid email or password")

      }

    } catch (error) {

      setError("Server error. Please try again.")

    }

    setLoading(false)
  }

  return (

    <div className="admin-login">

      <form onSubmit={handleLogin}>

        <h1>Admin Login</h1>

        {error && <p className="login-error">{error}</p>}

        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>

      </form>

    </div>
  )
}