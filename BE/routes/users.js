const { db } = require("../server");
const authenticateToken = require("_middleware/token");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const path = (app) => {

  app.get("/users", authenticateToken, (req, res) => {
    const q =
      "SELECT * FROM dsimed.users";
    db.query(q, (err, data) => {
      if (err) return res.json(err);
      return res.json(data);
    });
  });

  
  app.post("/users", authenticateToken, async (req, res) => {
    // app.post("/users", async (req, res) => {
    const {
      nom,
      prenom,
      email,
      role,
      password,
    } = req.body;
  console.log(req.body);
    try {
      const passwordHash = await bcrypt.hash(password, 10); // 10 est le nombre de tours de hachage
      const sql =
        "INSERT INTO dsimed.users (nom, prenom, email, role, passwordHash) VALUES (?, ?, ?, ?, ?)";
      
      db.query(
        sql,
        [
          nom,
          prenom,
          email,
          role,
          passwordHash,
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
    } catch (error) {
      console.error("Erreur lors de la génération du hash de mot de passe:", error);
      res.status(500).send("Erreur lors de la création de l'utilisateur");
    }
  });
  

};

module.exports = path;
