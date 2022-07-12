const User = require("../models/User");
const bcrypt = require("bcryptjs");
const auth = require("../helpers/jwt.js");

async function login({ username, password }) {
  const user = await User.findOne({ username });

  // synchronously compare user entered password with hashed password
  if (bcrypt.compareSync(password, user.password)) {
    const token = auth.generateAccessToken(username);

    // call toJSON method applied during model instantiation
    return { ...user.toJSON(), token };
  }
}

async function register(params) {
  // instantiate a user model and save to mongoDB
  const user = new User(params);
  await user.save();
}

async function getById(id) {
  const user = await User.findById(id);
  // call toJSON method applied during model instantiation
  return user.toJSON();
}

async function updateUser(id) {
  const user = await User.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  return user.toJSON();
}

module.exports = {
  login,
  register,
  getById,
  updateUser,
};
