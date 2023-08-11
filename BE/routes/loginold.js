const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { db } = require("../server");
const authenticateToken = require("_middleware/token");


const crypto = require("crypto");

// Génère une clé secrète sécurisée de 128 bits (16 octets)
const generateSecretKey = () => {
  return crypto.randomBytes(16).toString("hex");
};

const secretKey = generateSecretKey();
console.log("Clé secrète :", secretKey);

const path = (app) => {

  // Endpoint pour générer un token d'authentification
  app.post("/login", (req, res) => {
    const { email, password } = req.body;

    db.query(
      "SELECT passwordHash FROM users WHERE email = ?",
      [email],
      (err, results) => {
        if (err) throw err;
        if (results.length === 0) {
          // si l'email n'existe pas dans la base de données
          const message = `L'email n'existe pas`;
          return res.status(401).json({ message });
        } else {
          const dbPassword = results[0].passwordHash;
          bcrypt.compare(password, dbPassword, function (err, result) {
            if (err) {
              const message = `problème de comparaison des mots de passe`;
              return res.status(401).json({ message });
            } else if (result) {
              const token = jwt.sign({ email: email }, "secretKey",{ expiresIn: '0.5h' 
                 });
              res.json({ token: token });
            } else {
              const message = `Le mot de passe est incorrect.`;
              return res.status(401).json({ message });
            }
          });

        }
      }
    );
    // Vérifiez les informations d'identification de l'utilisateur dans la base de données
    // ...
  });
};

module.exports = path, authenticateToken;
