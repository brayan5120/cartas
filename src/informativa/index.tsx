import "./style.css";

function Informativa() {
  return (
    <div className="info">
      <h1>Información del Proyecto</h1>

      <p>
        Esta aplicación permite consultar cartas de Yu-Gi-Oh,
        ver detalles, guardar favoritas y navegar entre pestañas.
      </p>

      <div className="card">
        <h2>Funciones</h2>
        <ul>
          <li>Buscar cartas</li>
          <li>Filtrar cartas</li>
          <li>Guardar favoritas</li>
          <li>Ver detalles</li>
        </ul>
      </div>

      <div className="card">
        <h2>Tecnologías</h2>
        <p>React + TypeScript + API pública</p>
      </div>
    </div>
  );
}

export default Informativa;