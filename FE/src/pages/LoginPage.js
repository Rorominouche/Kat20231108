import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post("https://localhost:3004/login", { username, password })
      .then((response) => {
        if (response.data.success) {
          localStorage.setItem("token", response.data.token);
          navigate("/admin");
        } else {
          setError(response.data.message);
        }
      })
      .catch((error) => {
        console.error("Erreur lors de la connexion:", error);
        setError("Une erreur s'est produite lors de la connexion");
      });
  };

  return (
    <div className="login-page">
      <form className="login" onSubmit={handleSubmit}>
        <div>
          <h2>Connexion</h2>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <label>Nom d'utilisateur:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Mot de passe:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className="connexion" type="submit">
          Se connecter
        </button>
      token: {localStorage.getItem("token")}
      </form>
    </div>
  );
};

export default LoginPage;
