const express = require("express");
const router = express.Router();
const axios = require("axios");

//Listing de tous les CHARACTERS
router.get("/characters", async (req, res) => {
  try {
    console.log(req.query);
    //Destrcturing {limit, skip, name} = req.query
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/characters`,
      {
        params: {
          apiKey: process.env.PERSONNAL_APIKEY,
          limit: req.query.limit || 100,
          skip: req.query.skip || 0,
          name: req.query.name || "",
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Recherche d'un charactere unique (Get a the infos of a specific character)
router.get("/character/:characterId", async (req, res) => {
  try {
    let getCharacterId = req.params.characterId;
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/character/${getCharacterId}`,
      {
        params: {
          apiKey: process.env.PERSONNAL_APIKEY,
          name: req.query.name || "",
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
