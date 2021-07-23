const bodyParser = require("body-parser");
const express = require("express")
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/app", (req, res) => {
  res.json({ message: "API-WorkInida" });
});

require("./routes/passwords.routes.js")(app);

app.listen(3000, () => {
  console.log("Server is running on port 3000.");
});
