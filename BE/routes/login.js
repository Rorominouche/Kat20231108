const { db } = require("../server");
const authenticateToken = require("_middleware/token");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const path = (app) => {
  app.post("/login", (req, res) => {
    const { username, password } = req.body;

    const sql = "SELECT * FROM dsimed.users WHERE email = ?";
    db.query(sql, [username], async (err, result) => {
      // //pour avoir mot de passe hashed a stocker en bdd
      const hashed = await bcrypt.hash("admin", 10);
      console.log(`Hachage du mot de passe :\n${hashed}`);

      if (err) throw err;

      if (result.length === 0) {
        return res.json({
          success: false,
          message: "Nom d'utilisateur incorrect",
        });
      }
      const user = result[0];

      //comparaison du hash di password fournit avec celui en bdd
      const passwordMatch = await bcrypt.compare(password, user.passwordHash);

      if (passwordMatch) {
        const token = jwt.sign(
          { id: user.id_users, username: user.email },
          "secretKey",
          { expiresIn: "1h" }
        );
        res.json({ success: true, message: "Connexion réussie", token });
      } else {
        res.json({ success: false, message: "Mot de passe incorrect" });
      }
    });
  });
};

module.exports = path;
