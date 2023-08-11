import React, { useState, useEffect  } from "react";
import axios from "axios";
import AdminUserCreation from "../components/AdminUserCreation";

function AdminUser() {
  const [user, setUser] = useState([]);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = () => {
    axios
      // .get("https://localhost:3004/users")
      .get('https://localhost:3004/users', { headers: { Authorization: localStorage.getItem('token') } })
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des users", error);
      });
  };


  return (
    <div className="adminUser">
      <h2>Liste des Utilisateurs</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nom</th>
            <th>Prénom</th>
            <th>Email</th>
            <th>Role</th>
            <th>Date de creation</th>
          </tr>
        </thead>
        <tbody>
          {user.map((users) => (
            <tr key={users.id_users}>
              <td>{users.id_users}</td>
              <td>{users.nom}</td>
              <td>{users.prenom}</td>
              <td>{users.email}</td>
              <td>{users.role}</td>
              <td>{users.date_creation}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <AdminUserCreation fetchUser={fetchUser} />
    </div>
  );
}

export default AdminUser;
