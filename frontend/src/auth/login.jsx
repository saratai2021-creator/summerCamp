import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import "../styles/login.css";

export function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    const user = JSON.parse(localStorage.getItem("user"));

    if (token && user) {
      redirectByRole(user.role);
    }
  }, []);

  const redirectByRole = (role) => {
    if (role === "admin") {
      navigate("/admin");
    } else if (role === "formateur") {
      navigate("/formateur");
    } else {
      navigate("/parent");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    setLoading(true);

    setError("");

    try {
      const response = await fetch("http://127.0.0.1:8000/api/login", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },

        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok && data.token) {
        // sauvegarde dans localStorage
        localStorage.setItem("token", data.token);

        localStorage.setItem("user", JSON.stringify(data.user));

        redirectByRole(data.user.role);
      } else {
        setError(data.message || "Email ou mot de passe incorrect");
      }
    } catch (error) {
      console.error(error);

      setError("Erreur serveur");
    }

    setLoading(false);
  };

  return (
    <div className="login-page">
      <form onSubmit={handleLogin}>
        <h1>Connexion</h1>

        {error && <p className="login-error">{error}</p>}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Connexion..." : "Se connecter"}
        </button>
      </form>
    </div>
  );
}
