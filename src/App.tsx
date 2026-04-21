import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Informativa from "./informativa";
import Original from "./original";
import Usuario from "./usuario";
import Home from "./home";
import Favoritos from "./favoritos";
import Equipo from "./equipo";

import "./App.css";

function App() {
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
        <Route path="/equipo/:equipo" element={<Equipo />} />
      </Routes>
    </Router>
  );
}

export default App;