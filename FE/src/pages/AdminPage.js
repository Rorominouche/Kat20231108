import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import AdminArticle from "../components/AdminArticle";
import AdminClients from "../components/AdminClients";
import AdminUser from "../components/AdminUser";

function AdminPage() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); //Destruction du token
    navigate("/login"); // Redirection vers la page de connexion
  };

  return (
    <div className="admin-page">
      
      <div className="header">
        <h1>Espace d'administration</h1>
        <button onClick={handleLogout}>Se déconnecter</button>
      </div>

      <Tabs>
        <TabList>
          <Tab>Articles</Tab>
          <Tab>Utilisateurs</Tab>
          <Tab>Contact</Tab>
        </TabList>

        <TabPanel>
          <AdminArticle />
        </TabPanel>

        <TabPanel>
          <AdminUser />
        </TabPanel>

        <TabPanel>
          <AdminClients />
        </TabPanel>
      </Tabs>

      token: {localStorage.getItem("token")}
    </div>
  );
}

export default AdminPage;
