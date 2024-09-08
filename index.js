//framework pour les applications web + json
const express = require("express");
const app = express();
const mongoose = require("mongoose");
app.use(express.json());
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/marvel");

//pour sécuriser les données de Github
require("dotenv").config();

//pour authoriser les requetes externes
const cors = require("cors");
app.use(cors());

//pour faire les requetes en http
const axios = require("axios");

//import de mes routes
const userRoutes = require("./routes/user");
const loginRoutes = require("./routes/login");
const getCharacterRoutes = require("./routes/getCharacter");
const getComicRoutes = require("./routes/getComic");

//utilisation de mes routes
app.use(userRoutes); //on ajoute /user pour raccourcir l'url, on a plus besoin de l'ajouter sur chaque route
app.use(loginRoutes);
app.use(getCharacterRoutes);
app.use(getComicRoutes);

//Routage des routes non existantes
app.all("*", (req, res) => {
  res.status(404).json({ message: "This route does not exist" });
});

app.listen(process.env.PORT || 3000, () => {
  console.log("serveur started on port 3000");
});
