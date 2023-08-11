import React, { useState, useEffect } from "react";
import axios from "axios";

function BlogContent() {
  const [articles, setArticles] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image_url, setImageUrl] = useState("");

  useEffect(() => {
    fetchArticles();
  }, []);

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

  return (
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
  );
}

export default BlogContent;
