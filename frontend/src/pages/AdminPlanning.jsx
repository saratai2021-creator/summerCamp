import { useEffect, useState } from "react"
import { getPlannings, savePlanning, deletePlanning } from "../services/AdminService"
import "../styles/planning-admin.css"

export function AdminPlannings() {

  const [plannings, setPlannings] = useState([])

  const [childFile, setChildFile] = useState(null)
  const [adultFile, setAdultFile] = useState(null)

  const [childPreview, setChildPreview] = useState(null)
  const [adultPreview, setAdultPreview] = useState(null)

  useEffect(() => {
    load()
  }, [])

  const load = async () => {
    const data = await getPlannings()
    setPlannings(data)

    const child = data.find(p => p.category === "child")
    const adult = data.find(p => p.category === "adult")

    setChildPreview(child ? `http://127.0.0.1:8000/storage/${child.image}` : null)
    setAdultPreview(adult ? `http://127.0.0.1:8000/storage/${adult.image}` : null)
  }

  const handleSave = async (category, file) => {
    if (!file) {
      alert("Please select an image")
      return
    }

    await savePlanning(category, file)
    alert("Saved successfully")
    load()
  }

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this planning?")

    if (!confirmDelete) return

    await deletePlanning(id)
    load()
  }

  const childPlanning = plannings.find(p => p.category === "child")
  const adultPlanning = plannings.find(p => p.category === "adult")

  return (
    <div className="card" style={{ padding: "20px" }}>

      <h2>Planning Management</h2>

      {/* CHILD */}
      <div style={{ marginBottom: "40px" }}>
        <h3>Child Planning</h3>

        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files[0]
            setChildFile(file)
            setChildPreview(URL.createObjectURL(file))
          }}
        />

        {childPreview && (
          <img src={childPreview} width="200" alt="child preview" />
        )}

        <br />

        <button onClick={() => handleSave("child", childFile)}>
          Save Child
        </button>

        {childPlanning && (
          <button
            style={{ marginLeft: "10px", background: "red", color: "white" }}
            onClick={() => handleDelete(childPlanning.id)}
          >
            Delete
          </button>
        )}
      </div>

      {/* ADULT */}
      <div>
        <h3>Adult Planning</h3>

        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files[0]
            setAdultFile(file)
            setAdultPreview(URL.createObjectURL(file))
          }}
        />

        {adultPreview && (
          <img src={adultPreview} width="200" alt="adult preview" />
        )}

        <br />

        <button onClick={() => handleSave("adult", adultFile)}>
          Save Adult
        </button>

        {adultPlanning && (
          <button
            style={{ marginLeft: "10px", background: "red", color: "white" }}
            onClick={() => handleDelete(adultPlanning.id)}
          >
            Delete
          </button>
        )}
      </div>

    </div>
  )
}