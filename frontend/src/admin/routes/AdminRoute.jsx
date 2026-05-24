import { Navigate } from "react-router-dom"

export function AdminRoute({ children }) {

  const token = localStorage.getItem("token")

  // redirect to login if no token
  if (!token) {

    return (
      <Navigate
        to="/login"
        replace
      />
    )
  }

  // show protected page
  return children
}