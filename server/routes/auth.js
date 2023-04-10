const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const pool = require("../db");
const validInfo = require("../middlewares/validate");
const jwtGenerator = require("../utils/jwtGenerator.js");
const {authorize} = require("../middlewares/auth");

router.post("/register", validInfo, async (req, res) => {
  const { email, name, password, isSupplier } = req.body;
  let userType = isSupplier?"supplier":"customer";

  try {
    const user = await pool.query(`SELECT * FROM ${userType} WHERE email = $1`, [
      email
    ]);

    if (user.rows.length > 0) {
      return res.status(409).json("User already exist!");
    }

    const salt = await bcrypt.genSalt(10);
    const bcryptPassword = await bcrypt.hash(password, salt);

    let newUser = await pool.query(
      `INSERT INTO ${userType} (name, email, password) VALUES ($1, $2, $3) RETURNING *`,
      [name, email, bcryptPassword]
    );

    const jwtToken = jwtGenerator(newUser.rows[0].id, userType);

    // res.cookie("jwt", jwtToken);
    res.status(200).json(jwtToken);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.post("/login", validInfo, async (req, res) => {
  const { email, password, isSupplier } = req.body;
  let userType = isSupplier?"supplier":"customer";

  try {
    const user = await pool.query(`SELECT * FROM ${userType} WHERE email = $1`, [
      email
    ]);

    if (user.rows.length === 0) {
      return res.status(401).json("Invalid Credential");
    }

    const validPassword = await bcrypt.compare(
      password,
      user.rows[0].password
    );

    if (!validPassword) {
      return res.status(401).json("Invalid Credential");
    }
    const jwtToken = jwtGenerator(user.rows[0].id, userType);
    // res.cookie("jwt", jwtToken);
    res.status(200).json(jwtToken);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.post("/verify", authorize, (req, res) => {
  try {
    res.json(true);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;