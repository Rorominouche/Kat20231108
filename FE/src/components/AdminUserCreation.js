// components/AdminUserCreation.js

import React, { useState } from "react";
import axios from "axios";

function UserCreationForm({ fetchUser }) {
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");

  const handleCreateUser = () => {
    axios
      .post("https://localhost:3004/users", {
        nom,
        prenom,
        email,
        role,
        password,
      },
      { headers: { Authorization: localStorage.getItem('token') } })
      .then(() => {
        fetchUser(); // Actualiser la liste des utilisateurs après la création
        setNom("");
        setPrenom("");
        setEmail("");
        setRole("");
        setPassword("");
      })
      .catch((error) => {
        console.error("Erreur lors de la création de l'utilisateur:", error);
      });
  };

  return (
    <div className="user-creation-form">
      <h2>Création d'un nouvel utilisateur</h2>
      <form>
        <label>Nom:</label>
        <input type="text" value={nom} onChange={(e) => setNom(e.target.value)} />

        <label>Prénom:</label>
        <input type="text" value={prenom} onChange={(e) => setPrenom(e.target.value)} />

        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />

        <label>Role:</label>
        <input type="int" value={role} onChange={(e) => setRole(e.target.value)} />
        {/* <select name="role" onChange={(e) => setRole(e.target.value)}>
          <option value="1">admin</option>
          <option value="2">créateur</option>
        </select> */}

        <label>Mot de passe:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

        <button type="button" onClick={handleCreateUser}>Créer Utilisateur</button>
      </form>
    </div>
  );
}

export default UserCreationForm;
