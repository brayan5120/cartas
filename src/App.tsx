import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useEffect, useState } from "react";

import Informativa from "./informativa/index";
import Original from "./original/index";
import Usuario from "./usuario/index";
import Home from "./home/index";
import Favoritos from "./favoritos/index";
import Cartas from "./cartas/index";

import Login from "./login";
import Registro from "./registro";

import { useAuth } from "./AuthContext";

import "./App.css";

function App() {
  const [loading, setLoading] = useState(true);

  const { user, logout } = useAuth();

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

        <span style={{ marginLeft: "20px" }}>
          {user ? "🟢 Conectado" : "🔴 Desconectado"}
        </span>

        {user && (
          <button
            onClick={logout}
            style={{
              marginLeft: "10px",
              padding: "5px 10px",
              cursor: "pointer",
            }}
          >
            Logout
          </button>
        )}
      </nav>

      {!user && (
        <div style={{ padding: "20px" }}>
          <Login />
          <br />
          <Registro />
        </div>
      )}

      {user && (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favoritos" element={<Favoritos />} />
          <Route path="/original" element={<Original />} />
          <Route path="/informativa" element={<Informativa />} />
          <Route path="/usuario" element={<Usuario />} />
          <Route path="/equipo/:equipo" element={<Cartas />} />
        </Routes>
      )}
    </Router>
  );
}

export default App;