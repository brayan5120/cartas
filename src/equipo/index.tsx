import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function Equipo() {
  const { equipo } = useParams();

  const [data, setData] = useState<any>(null);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (!equipo) return;

    const fetchData = async () => {
      const res = await fetch(
        `https://db.ygoprodeck.com/api/v7/cardinfo.php?id=${equipo}`
      );

      const json = await res.json();
      const carta = json.data[0];
      setData(carta);

      const fav = JSON.parse(localStorage.getItem("favorites") || "[]");

      if (fav.includes(carta.id.toString())) {
        setIsFavorite(true);
      }
    };

    fetchData();
  }, [equipo]);

  const toggleFavorite = () => {
    if (!data) return;

    let fav = JSON.parse(localStorage.getItem("favorites") || "[]");
    const id = data.id.toString();

    if (fav.includes(id)) {
      fav = fav.filter((f: string) => f !== id);
      setIsFavorite(false);
    } else {
      fav.push(id);
      setIsFavorite(true);
    }

    localStorage.setItem("favorites", JSON.stringify(fav));
  };

  if (!data) return <p>Cargando...</p>;

  return (
    <div>
      <h1>
        {data.name}
        <button onClick={toggleFavorite}>
          {isFavorite ? "❤️" : "🤍"}
        </button>
      </h1>

      <img src={data.card_images[0].image_url} width="200" />

      <p>{data.desc}</p>
    </div>
  );
}

export default Equipo;