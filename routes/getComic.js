const express = require("express");
const router = express.Router();
const axios = require("axios");

//Listing de tous les COMICS (Get a list of comics)
router.get("/comics", async (req, res) => {
  try {
    //console.log(req.query)
    //Destrcturing {limit, skip, title} = req.query
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics`,
      {
        params: {
          apiKey: process.env.PERSONNAL_APIKEY,
          limit: req.query.limit || 100,
          skip: req.query.skip || 0,
          title: req.query.title || "",
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Listing des comics contenant un charactère specifique (Get a list of comics containing a specific character)
router.get("/comics/:characterid", async (req, res) => {
  try {
    // on récupère les paramètres de la query
    //req.params.characterid / 5fce248d78edeb0017c96d29
    let getCharacterid = req.params.characterid;
    console.log(getCharacterid);

    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics/${getCharacterid}`,
      {
        params: {
          apiKey: process.env.PERSONNAL_APIKEY,
          limit: req.query.limit || 100,
          skip: req.query.skip || 0,
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Recherche d'un comic unique (Get all informations of specific comic)
router.get("/comic/:comicId", async (req, res) => {
  try {
    // on récupère les paramètres de la query
    //req.params.characterid / 5fce248d78edeb0017c96d29
    let getComicId = req.params.comicId;
    console.log(getComicId);

    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comic/${getComicId}`,
      {
        params: {
          apiKey: process.env.PERSONNAL_APIKEY,
          title: req.query.title || "",
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
