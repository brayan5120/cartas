import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import "./style.css";

interface Carta {
  id: number;
  name: string;
  type: string;
  atk?: number;
  def?: number;
}

function Home() {
  const [cartas, setCartas] = useState<Carta[]>([]);
  const [busqueda, setBusqueda] = useState("");
  const [tipoFiltro, setTipoFiltro] = useState("Todos");

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`https://db.ygoprodeck.com/api/v7/cardinfo.php`);
      const data = await res.json();
      setCartas(data.data);
    };

    fetchData();
  }, []);

  const tiposUnicos = ["Todos", ...new Set(cartas.map(c => c.type))];

  const filtradas = cartas.filter((carta) => {
    const coincideNombre = carta.name
      .toLowerCase()
      .includes(busqueda.toLowerCase());

    const coincideTipo =
      tipoFiltro === "Todos" || carta.type === tipoFiltro;

    return coincideNombre && coincideTipo;
  });

  return (
    <>
      <div className="filtros">
        <input
          type="text"
          placeholder="Buscar carta..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />

        <select
          value={tipoFiltro}
          onChange={(e) => setTipoFiltro(e.target.value)}
        >
          {tiposUnicos.map((tipo, i) => (
            <option key={i} value={tipo}>
              {tipo}
            </option>
          ))}
        </select>
      </div>

      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Carta</th>
            <th>Tipo</th>
            <th>ATK</th>
            <th>DEF</th>
          </tr>
        </thead>

        <tbody>
          {filtradas.slice(0, 50).map((carta, i) => (
            <tr key={carta.id}>
              <td>{i + 1}</td>

              <td>
                <Link to={`/equipo/${carta.id}`}>
                  {carta.name}
                </Link>
              </td>

              <td>{carta.type}</td>
              <td>{carta.atk || "-"}</td>
              <td>{carta.def || "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default Home;