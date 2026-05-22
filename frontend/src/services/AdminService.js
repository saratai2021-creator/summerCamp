const API_URL = "http://127.0.0.1:8000/api"

/* ===============================
   TOKEN
================================ */
const getToken = () => localStorage.getItem("token")

/* ===============================
   HANDLE RESPONSE
================================ */
const handleResponse = async (res) => {
  if (res.status === 401) {
    localStorage.removeItem("token")
    window.location.href = "/admin/login"
    return null
  }

  if (!res.ok) {
    const text = await res.text()
    console.error("API ERROR:", text)
    throw new Error(text)
  }

  if (res.status === 204) return null

  return res.json()
}

/* ===============================
   ATELIERS
================================ */

export const getAteliers = async () => {
  try {
    const res = await fetch(`${API_URL}/ateliers`, {
      headers: { Accept: "application/json" }
    })
    return await handleResponse(res)
  } catch (e) {
    console.error(e)
    return []
  }
}

export const getAtelier = async (id) => {
  try {
    const res = await fetch(`${API_URL}/ateliers/${id}`, {
      headers: { Accept: "application/json" }
    })
    return await handleResponse(res)
  } catch (e) {
    console.error(e)
    return null
  }
}

export const createAtelier = async (data) => {
  try {
    const res = await fetch(`${API_URL}/ateliers`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`
      },
      body: JSON.stringify(data)
    })
    return await handleResponse(res)
  } catch (e) {
    console.error(e)
    return null
  }
}

export const updateAtelier = async (id, data) => {
  try {
    const res = await fetch(`${API_URL}/ateliers/${id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`
      },
      body: JSON.stringify(data)
    })
    return await handleResponse(res)
  } catch (e) {
    console.error(e)
    return null
  }
}

export const deleteAtelier = async (id) => {
  try {
    const res = await fetch(`${API_URL}/ateliers/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${getToken()}`
      }
    })
    return await handleResponse(res)
  } catch (e) {
    console.error(e)
    return null
  }
}

/* ===============================
   PLANNINGS (UPLOAD)
================================ */

export const getPlannings = async () => {
  try {
    const res = await fetch(`${API_URL}/plannings`, {
      headers: { Accept: "application/json" }
    })
    return await handleResponse(res)
  } catch (e) {
    console.error(e)
    return []
  }
}

export const savePlanning = async (category, file) => {
  try {
    const formData = new FormData()
    formData.append("category", category)
    formData.append("image", file)

    const res = await fetch(`${API_URL}/plannings`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${getToken()}`
      },
      body: formData
    })

    return await handleResponse(res)
  } catch (e) {
    console.error(e)
    return null
  }
}

/* ===============================
   RESERVATIONS
================================ */

export const getReservations = async () => {
  try {
    const res = await fetch(`${API_URL}/reservations`, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${getToken()}`
      }
    })
    return await handleResponse(res)
  } catch (e) {
    console.error(e)
    return []
  }
}

export const createReservation = async (data) => {
  try {
    const res = await fetch(`${API_URL}/reservations`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
    return await handleResponse(res)
  } catch (e) {
    console.error(e)
    return null
  }
}

export const confirmReservation = async (id) => {
  try {
    const res = await fetch(`${API_URL}/reservations/${id}/confirm`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${getToken()}`
      }
    })
    return await handleResponse(res)
  } catch (e) {
    console.error(e)
    return null
  }
}

export const cancelReservation = async (id) => {
  try {
    const res = await fetch(`${API_URL}/reservations/${id}/cancel`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${getToken()}`
      }
    })
    return await handleResponse(res)
  } catch (e) {
    console.error(e)
    return null
  }
}
export const deletePlanning = async (id) => {
  try {
    const res = await fetch(`${API_URL}/plannings/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${getToken()}`
      }
    })
    return await handleResponse(res)
  } catch (e) {
    console.error(e)
    return null
  }
}