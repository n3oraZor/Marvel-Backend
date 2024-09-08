const express = require("express");
const router = express.Router();
const User = require("../models/User");

//crypting datas package
const uid2 = require("uid2");
const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-Base64");

//Création d'un compte avec les paramètres en body
router.post("/signup", async (req, res) => {
  try {
    //destructuring (on stock req.body directement dans username)
    const { username, email, password } = req.body;

    const salt = uid2(16);
    const hash = SHA256(password + salt).toString(encBase64);
    const token = uid2(64);

    const findEmailInDB = await User.findOne({ email: email });

    if (!username) {
      return res.status(412).json({ message: "username is empty" });
    }
    if (!password) {
      return res.status(412).json({ message: "password is empty" });
    }

    if (!email) {
      return res.status(412).json({ message: "email is empty" });
    }
    if (findEmailInDB) {
      return res.status(412).json({ message: "email already exists" });
    }

    //Pour créer l'utilisateur en base
    const newUser = new User({
      username,
      email: email,
      salt: salt,
      hash: hash,
      token: token,
    });

    await newUser.save();

    res.status(201).json({
      message: "New user created",
      _id: newUser._id,
      token: token,
      username,
    });
    console.log("New user created");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
