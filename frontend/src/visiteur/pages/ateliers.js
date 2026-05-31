import React, { useEffect, useState } from "react"
import { Atelier } from "../../shared/components/cardAtelier";

export function Ateliers() {

  const [ateliers, setAteliers] = useState([])

  useEffect(() => {

    fetch("http://127.0.0.1:8000/api/ateliers")

      .then((res) => res.json())

      .then((data) => {

        console.log("Data API Atelier :", data)

        setAteliers(data)
      })

      .catch((error) => {

        console.error("Error :", error)
      })

  }, [])

  return (

    <div className="cards-container">

      {ateliers.map((atelier) => (

        <Atelier
          key={atelier.id}
          atelier={atelier}
        />

      ))}

    </div>
  )
}