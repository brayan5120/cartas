import { useState } from "react";
import { useAuth } from "./AuthContext";

const Registro = () => {
  const { register } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = () => {
    const success = register(email, password);

    if (success) {
      alert("Usuario registrado");
    } else {
      alert("El usuario ya existe");
    }
  };

  return (
    <div>
      <h2>Registro</h2>

      <input
        type="email"
        placeholder="Correo"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <br />
      <br />

      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <br />
      <br />

      <button onClick={handleRegister}>Registrarse</button>
    </div>
  );
};

export default Registro;