const router = require("express").Router();
const CryptoJs = require("crypto-js");
const User = require("../models/User");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
dotenv.config();
router.post("/register", async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: CryptoJs.AES.encrypt(
      req.body.password,
      process.env.PASS_SECRET
    ).toString(),
  });

  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    !user && res.status(401).json("Wrong Credentials1");
    const hashedPassword = CryptoJs.AES.decrypt(
      user.password,
      process.env.PASS_SECRET
    );
    const getPassword = hashedPassword.toString(CryptoJs.enc.Utf8);
    getPassword !== req.body.password &&
      res.status(401).json("Wrong credentials2");
    const accessToken = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_TOKEN,
      { expiresIn: "3d" }
    );
    const { password, ...others } = user._doc;
    res.status(200).json({ ...others, accessToken });
  } catch (error) {
    res.status(500).json(error);
  }
});
module.exports = router;
