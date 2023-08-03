const User = require('../models/UserModel');
const { signUpErrors, signInErrors } = require('../utils/error');
const { sendConfirmationMail } = require('../utils/generateMail');

// Sign Up and send a email confirmation
module.exports.signUp = async (req, res) => {
  const { email, username, password } = req.body;
  try {
    const user = await User.create({ email, username, password });
    sendConfirmationMail(first = true, user);
    res.status(201).json({ user: user._id });
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
    res.status(200).json({ user: user._id });
  } catch (error) {
    let errors = signInErrors(error);
    res.status(200).json({errors});
  }
}

module.exports.sendEmailConfirmation = async (req, res) => {
  try {
    const user = await User.findOne({_id: req.params.id});
    sendConfirmationMail(first = false, user);
    res.status(200).json('Envoi du nouveau code!');
  } catch (error) {
    res.status(200).json(error);
  }
}

module.exports.confirmEmail = async (req, res) => {
  const { tmp_code } = req.body;
  try {
    const user = await User.findOne({ _id: req.params.id});
    if (user) {
      const currentTime = new Date();
      if (currentTime > user.tmp_code_expiration) {
        res.status(200).json('Code de confirmation expiré');
      } else if (user.tmp_code != tmp_code) {
        res.status(200).json('Code de confirmation incorrect')
      } else {
        res.status(200).json('Email confirmé');
      }
    }
  } catch (error) {
    console.error('Erreur lors de la vérification du code de confirmation :', error);
    return false;
  }
}

module.exports.logout = (req, res) => {
  res.redirect('/');
}
