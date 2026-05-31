const User = require("../models/auth");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req,res) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "user alrady registerd" });
    }
    const hash = await bcrypt.hash(password, 10);
    const newuser = new User({
      name,
      email,
      password: hash,
    });
    await newuser.save();
    res.status(200).json({ message: "user saved sucessfully" });
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "server error in register", error });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }
    const ismatch = await bcrypt.compare(password, user.password);
    if (!ismatch) {
      return res.status(400).json({ message: "invalid email or password" });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.status(200).json({
      message: "user seved sucessfully",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "server error in login", error });
  }
};

module.exports = {register,login}