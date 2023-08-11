import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Contact from "./pages/Contact";
import Accueil from "./pages/Accueil";
import LoginPage from "./pages/LoginPage";
import Blog from "./pages/Blog";
import AdminPage from "./pages/AdminPage";

//définition du composant principal de l'application
const App = () => {
  // Utilisation du hook useState pour gérer l'état de connexion de l'utilisateur
  const [loggedIn, setLoggedIn] = useState(false);

  // Utilisation du hook useEffect pour vérifier si un token est présent dans le localStorage (pour déterminer si l'utilisateur est connecté)
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false); // Assurez-vous que loggedIn est à false si le token est absent
    }
  }, []);
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Accueil />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="*" element={<Accueil />} />
        {/* {!loggedIn ? (
          // Si l'utilisateur n'est pas connecté, redirigez-le vers la page de connexion
          <Route path="/admin" element={<Navigate to="/login" />} />
        ) : (
          // Si l'utilisateur est connecté, il peut accéder à la page AdminPage
          <Route path="/admin" element={<AdminPage />} />
        )} */}
        <Route path="/admin" element={<AdminPage />} />
        <Route
          path="/login"
          element={<LoginPage onLogin={() => setLoggedIn(true)} />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
