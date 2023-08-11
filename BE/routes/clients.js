const { db } = require("../server");
const authenticateToken = require("_middleware/token");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const path = (app) => {

  app.get("/clients", authenticateToken, (req, res) => {
    const q =
      "SELECT * FROM dsimed.clients";
    db.query(q, (err, data) => {
      if (err) return res.json(err);
      return res.json(data);
    });
  });

  app.post("/clients", (req, res) => {
    const {
      nom,
      prenom,
      email,
      tel,
      entreprise,
      nb_employes,
      service,
      fonction,
      motif,
      message,
    } = req.body;
    
    const sql =
      "INSERT INTO dsimed.clients (nom, prenom, email, tel, entreprise, nb_employes, service, fonction, motif, message) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    
    console.log(sql);
      db.query(
      sql,
      [
        nom,
        prenom,
        email,
        tel,
        entreprise,
        nb_employes,
        service,
        fonction,
        motif,
        message,
      ],
      (err, result) => {
        if (err) {
          console.error("Erreur lors de la création de l'utilisateur:", err);
          res.status(500).send("Erreur lors de la création de l'utilisateur");
        } else {
          res.status(201).send("Utilisateur créé avec succès");
        }
      }
    );
  });

};

module.exports = path;
