import React, { useState, useEffect  } from "react";
import axios from "axios";

function AdminArticle() {
  const [articles, setArticles] = useState([]);
  const [newArticle, setNewArticle] = useState({
    titre: "",
    content: "",
    date_publication: new Date().toISOString().split("T")[0], // Date actuelle par défaut
    auteur: "",
    id_users: 1, // Remplacez par l'ID de l'utilisateur connecté
    id_medias: 1, // Remplacez par l'ID du média associé
  });

  const [successMessage, setSuccessMessage] = useState("");


  const fetchArticles = () => {
    axios
      .get("https://localhost:3004/articles")
      .then((response) => {
        setArticles(response.data);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des articles:", error);
      });
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewArticle((prevArticle) => ({
      ...prevArticle,
      [name]: value,
    }));
  };

  const handleArticleCreation = (event) => {
    event.preventDefault();
    axios
      .post("https://localhost:3004/articles", newArticle, {
        headers: { Authorization: localStorage.getItem("token") },
      })
      .then((response) => {
        console.log(response.data.message);
        setSuccessMessage("Article créé");
        fetchArticles();
      })
      .catch((error) => {
        console.error("Erreur lors de la création de l'article :", error);
      });
  };

  return (
    <div>
      <h2>Créer un article</h2>
      <form onSubmit={handleArticleCreation}>
        {successMessage && (
          <div style={{ color: "green", marginBottom: "10px" }}>
            {successMessage}
          </div>
        )}
        <label>Titre:</label>
        <input
          type="text"
          name="titre"
          value={newArticle.titre}
          onChange={handleInputChange}
          required
        />
        <label>Contenu:</label>
        <textarea
          name="content"
          value={newArticle.content}
          onChange={handleInputChange}
          required
        />
        <label>Date de publication:</label>
        <input
          type="date"
          name="date_publication"
          value={newArticle.date_publication}
          onChange={handleInputChange}
          required
        />
        <label>Auteur:</label>
        <input
          type="text"
          name="auteur"
          value={newArticle.auteur}
          onChange={handleInputChange}
          required
        />
        <button type="submit">Créer Article</button>
      </form>
      <h2>Liste des articles</h2>
          <div className="blog">
            {articles.map((article) => (
              <div key={article.id_articles} className="blogContent">
                <h2>{article.titre}</h2>
                <h5>{article.date_publication}</h5>
                <h6>{article.auteur}</h6>
                <div className="blogBox">
                  <p>{article.content}</p>
                  <img
                    src={`http://localhost:3000/upload/${article.url}`}
                    alt={article.titre}
                  />
                </div>
              </div>
            ))}
          </div>
    </div>
  );
}

export default AdminArticle;
