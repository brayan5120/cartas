import "./style.css";

function Original() {
  return (
    <div className="original">
      <h1>Cartas Originales</h1>

      <p>
        En esta sección encontrarás información sobre cartas clásicas
        y representativas del universo Yu-Gi-Oh.
      </p>

      <div className="box">
        <h2>Cartas Legendarias</h2>
        <ul>
          <li>Blue-Eyes White Dragon</li>
          <li>Dark Magician</li>
          <li>Red-Eyes Black Dragon</li>
          <li>Exodia</li>
        </ul>
      </div>

      <div className="box">
        <h2>Historia</h2>
        <p>
          Estas cartas fueron de las más reconocidas en los inicios
          del juego y anime.
        </p>
      </div>
    </div>
  );
}

export default Original;