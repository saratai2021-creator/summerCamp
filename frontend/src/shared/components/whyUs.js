import "../../styles/sections.css"

export function WhyUs(){
  return(
    <section className="why-us">

      {/* section title */}
      <h2>Pourquoi choisir Elite Coders ?</h2>

      <div className="why-grid">

        {/* robotics card */}
        <div className="why-card">
          <h3>🤖 Robotique</h3>
          <p>Les enfants apprennent la robotique en construisant et programmant de vrais robots.</p>
        </div>

        {/* coding card */}
        <div className="why-card">
          <h3>💻 Programmation</h3>
          <p>Apprendre à programmer à travers des projets amusants et des jeux.</p>
        </div>

        {/* problem solving card */}
        <div className="why-card">
          <h3>🧠 Résolution de problèmes</h3>
          <p>Développer la logique et l’esprit critique.</p>
        </div>

        {/* innovation card */}
        <div className="why-card">
          <h3>🚀 Innovation</h3>
          <p>Encourager la créativité et l’innovation grâce à la technologie.</p>
        </div>

      </div>

    </section>
  )
}