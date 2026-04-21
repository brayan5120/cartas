import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import "./style.css";

interface Carta {
  id: number
  name: string
  type: string
  atk?: number
  def?: number
}

function Home() {
  const [cartas, setCartas] = useState<Carta[]>([])
  const [busqueda, setBusqueda] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`https://db.ygoprodeck.com/api/v7/cardinfo.php`)
      const data = await res.json()
      setCartas(data.data)
    }

    fetchData()
  }, [])

  const filtradas = cartas.filter(c =>
    busqueda.length < 3
      ? true
      : c.name.toLowerCase().includes(busqueda.toLowerCase())
  )

  return (
    <>
      <input
        type="text"
        placeholder="Buscar carta..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />

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
          {filtradas.slice(0,50).map((carta, i) => (
            <tr key={carta.id}>
              <td>{i+1}</td>
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
  )
}

export default Home