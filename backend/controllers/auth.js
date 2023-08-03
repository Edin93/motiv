const User = require('../models/UserModel');
const { signUpErrors, signInErrors } = require('../utils/error');
const nodemailer = require('nodemailer');
const { generateConfirmationEmailCode } = require('../utils/generateId');

// Sign Up and send a email confirmation
module.exports.signUp = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const user = await User.create({ username, email, password });
    res.status(201).json({ user });
  } catch (error) {
    console.log(error);
    let errors = signUpErrors(error);
    res.status(200).json({errors});
  }
};

// Sign In
module.exports.signIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    res.status(200).json({ user });
  } catch (error) {
    let errors = signInErrors(error);
    res.status(200).json({errors});
  }
}

module.exports.logout = (req, res) => {
  res.redirect('/');
}
