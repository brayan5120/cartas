import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface Carta {
  id: number;
  name: string;
  type: string;
  card_images: { image_url: string }[];
}

function Favoritos() {
  const [cartas, setCartas] = useState<Carta[]>([]);

  const cargarFavoritos = async () => {
    const favoritos = JSON.parse(localStorage.getItem("favorites") || "[]");

    if (favoritos.length === 0) {
      setCartas([]);
      return;
    }

    const resultados = await Promise.all(
      favoritos.map(async (id: string) => {
        const res = await fetch(
          `https://db.ygoprodeck.com/api/v7/cardinfo.php?id=${id}`
        );
        const data = await res.json();
        return data.data[0];
      })
    );

    setCartas(resultados);
  };

  useEffect(() => {
    cargarFavoritos();

    // 🔥 clave: se actualiza cuando vuelves a la pestaña
    window.addEventListener("focus", cargarFavoritos);

    return () => {
      window.removeEventListener("focus", cargarFavoritos);
    };
  }, []);

  if (cartas.length === 0) return <p>No tienes cartas favoritas</p>;

  return (
    <div>
      <h1>Mis Cartas Favoritas ❤️</h1>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {cartas.map((carta) => (
          <div key={carta.id}>
            <Link to={`/equipo/${carta.id}`}>
              <h3>{carta.name}</h3>
              <img src={carta.card_images[0].image_url} width="150" />
            </Link>
            <p>{carta.type}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Favoritos;