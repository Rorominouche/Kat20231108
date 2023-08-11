const { app, port } = require("./server");
const path = require("./routes");
const cors = require("cors");

app.use(cors());

path.articlesPath(app);
path.mediasPath(app);
path.loginPath(app);
path.clientsPath(app);
path.usersPath(app);

// app.listen(port, () => {
//   console.log("Server listening on port " + port);
// });
