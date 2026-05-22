import "../styles/sections.css"

export function Programs(){
  return(
    <section className="programs">

      {/* section title */}
      <h2>Nos Programmes</h2>

      <div className="program-grid">

        {/* program card 1 */}
        <div className="program-card">
          <h3>Programmation Scratch</h3>
          <p>Parfait pour les débutants âgés de 7 à 10 ans.</p>
        </div>

        {/* program card 2 */}
        <div className="program-card">
          <h3>Programmation Python</h3>
          <p>Apprenez la programmation réelle avec Python.</p>
        </div>

        {/* program card 3 */}
        <div className="program-card">
          <h3>Développement de Jeux</h3>
          <p>Créez vos propres jeux.</p>
        </div>

      </div>

    </section>
  )
}