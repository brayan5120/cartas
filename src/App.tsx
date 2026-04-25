import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useEffect, useState } from "react";

import Informativa from "./informativa";
import Original from "./original";
import Usuario from "./usuario";
import Home from "./home";
import Favoritos from "./favoritos";
import Cartas from "./cartas";

import "./App.css";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  if (loading) {
    return (
      <div className="splash">
        <h1>Yu-Gi-Oh App</h1>
        <p>Cargando...</p>
      </div>
    );
  }

  return (
    <Router>
      <nav className="c-menu">
        <Link to="/">Home</Link>
        <Link to="/favoritos">Favoritos</Link>
        <Link to="/original">Original</Link>
        <Link to="/informativa">Informativa</Link>
        <Link to="/usuario">Usuario</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/favoritos" element={<Favoritos />} />
        <Route path="/original" element={<Original />} />
        <Route path="/informativa" element={<Informativa />} />
        <Route path="/usuario" element={<Usuario />} />
        <Route path="/equipo/:equipo" element={<Cartas />} />
      </Routes>
    </Router>
  );
}

export default App;