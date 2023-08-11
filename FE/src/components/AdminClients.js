import React, { useState, useEffect  } from "react";
import axios from "axios";

function AdminClients() {
  const [clients, setClients] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = () => {
    axios
      .get("https://localhost:3004/clients",  { headers: { Authorization: localStorage.getItem('token') } })
      .then((response) => {
        setClients(response.data);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des clients:", error);
      });
  };


  return (
    <div className="adminClients">
      <h2>Liste des clients</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nom</th>
            <th>Prénom</th>
            <th>Email</th>
            <th>Téléphone</th>
            <th>Entreprise</th>
            <th>Nombre d'employés</th>
            <th>Service</th>
            <th>Fonction</th>
            <th>Motif</th>
            <th>Message</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client) => (
            <tr key={client.id_clients}>
              <td>{client.id_clients}</td>
              <td>{client.nom}</td>
              <td>{client.prenom}</td>
              <td>{client.email}</td>
              <td>{client.tel}</td>
              <td>{client.entreprise}</td>
              <td>{client.nb_employes}</td>
              <td>{client.service}</td>
              <td>{client.fonction}</td>
              <td>{client.motif}</td>
              <td>{client.message}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminClients;
