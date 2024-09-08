const express = require("express");
const router = express.Router();
const User = require("../models/User");

//crypting datas package
const uid2 = require("uid2");
const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");

//Connexion à un compte utilisateur
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body; //destructuring

    const findUserFromEmail = await User.findOne({ email: email });

    const hash = SHA256(password + findUserFromEmail.salt).toString(encBase64);
    if (hash === findUserFromEmail.hash) {
      res.status(202).json({
        message: "User is authenticated",
        _id: findUserFromEmail._id,
        token: findUserFromEmail.token,
      });
      console.log("User is authenticated");
    } else {
      return res.status(401).json({ message: "Password is incorrect" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
