require("dotenv").config();
const User = require('../models/UserModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { signUpErrors, signInErrors } = require('../utils/error');
const { sendConfirmationMail } = require('../utils/generateMail');
const { JWT_TOKEN_KEY } = process.env;

const generateToken = (id) => {
  return jwt.sign({ id }, JWT_TOKEN_KEY, {expiresIn: "30d"})
}

// Sign Up and send a email confirmation
module.exports.signUp = async (req, res) => {
  const { password } = req.body;
  try {
    if (password.length < 12 ||
      !/[a-z]/.test(password) ||
      !/[A-Z]/.test(password) ||
      !/\d/.test(password) ||
      !/[^a-zA-Z0-9]/.test(password))
    {
      throw Error("password");
    }
    const user = await User.create({ ...req.body });
    const token = generateToken(user._id);
    sendConfirmationMail(subject = 'creation', user);
    res.status(201).json({ user: user._id, token });
  } catch (error) {
    let errors = signUpErrors(error);
    res.status(200).json({errors});
  }
};

// Sign In
module.exports.signIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    const token = generateToken(user._id);
    delete user.password;
    res.status(200).json({ user: user._id, token });
  } catch (error) {
    console.log(error);
    let errors = signInErrors(error);
    res.status(200).json({errors});
  }
}

// Send a email with a 4 digits code
module.exports.sendConfirmationCode = async (req, res) => {
  const user = await User.findOne({_id: req.params.id});
  if (user) {
    try {
      sendConfirmationMail(subject = 'resend', user);
      res.status(200).json('Envoi du nouveau code!');
    } catch (error) {
      res.status(200).json(error);
    }
  } else {
    return res.status(200).json({ error: 'Utilisateur introuvable'});
  }
}

// Confirm the email of the user
module.exports.confirmEmail = async (req, res) => {
  const { tmp_code } = req.body;
  const user = await User.findOne({ _id: req.params.id});
  const errors = {message: ''}
  if (user) {
    try {
      const currentTime = new Date();
      if (currentTime > user.tmp_code_expiration) {
        errors.message = 'Code de confirmation expiré';
      } else if (user.tmp_code != tmp_code) {
        errors.message = 'Code de confirmation incorrect';
      } else {
        await User.updateOne(
          { _id: req.params.id },
          { emailConfirm: true, tmp_code: null, tmp_code_expiration: null },
          { new: true }
        );
      }
    } catch (error) {
      res.status(200).json({ error });
    }
  } else {
    errors.message = 'Email inconnu';
  }
  res.status(200).json({errors});
}

// Send an email with a new password generated randomly and
// pass hasToUpdatePasdword to true
module.exports.sendResetPassword = async (req, res) => {
  const email = req.body.email;
  const user = await User.findOne({ email });
  if (user) {
    try {
      sendConfirmationMail(subject = 'password', user);
      res.status(201).json({ user: user._id });
    } catch (error) {
      res.status(200).json({ error });
    }
  } else {
    res.status(200).json({ errors: "Email inconnu" });
  }
};

// Reset the password and pass hasToUpdatePasdword to false
module.exports.resetPassword = async (req, res) => {
  const { password, confirmPassword } = req.body;
  const user = await User.findOne({ _id: req.params.id });
  if (user) {
    try {
        if (password.length < 12 ||
          !/[a-z]/.test(password) ||
          !/[A-Z]/.test(password) ||
          !/\d/.test(password) ||
          !/[^a-zA-Z0-9]/.test(password))
        {
          res.status(200).json({errors: "Le mot de passe doit contenir entre 12 et 20 caractères " +
          "comprenant au minimum une lettre minuscule, une lettre majuscule, un chiffre et un symbole"});
        } else if (password == confirmPassword) {
          const newPassword = await bcrypt.hash(password, 10);
          await User.updateOne(
            { _id: req.params.id },
            { password: newPassword, hasToUpdatePassword: false },
            { new: true }
            );
            res.status(200).json('Réinitialisation du mot passe réussie');
        }
        else {
          res.status(200).json({errors: "Les deux mots de passe ne correspondent pas"});
        }
    } catch (error) {
      res.status(200).json({ error });
    }
  } else {
    res.status(200).json({ errors: "Email inconnu" });
  }
};

// Check if the email already exists and if password is secure
module.exports.checkEmailPassword = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  const errors = { message: ''};
  if (user)
    errors.message = 'Email déjà utilisé';
  else {
    if (password.length < 12 ||
      !/[a-z]/.test(password) ||
      !/[A-Z]/.test(password) ||
      !/\d/.test(password) ||
      !/[^a-zA-Z0-9]/.test(password))
    {
      errors.message = "Le mot de passe doit contenir entre 12 et 20 caractères " +
      "comprenant au minimum une lettre minuscule, une lettre majuscule, un chiffre et un symbole";
    }
  }
  res.status(200).json({ errors });
};

// Check if username already exists
module.exports.checkUsername = async (req, res) => {
  const { username } = req.body;
  const user = await User.findOne({ username });
  const errors = { message: ''};

  if (user)
    errors.message = 'Nom d\'utilisateur déjà utilisé';
  res.status(200).json({ errors });
};

// Change email
module.exports.changeEmail = async (req, res) => {
  const { email, newEmail } = req.body;
  User.findOneAndUpdate({email: email}, {email: newEmail}, {new: true})
    .then((user) => {
      sendConfirmationMail(subject = 'creation', user);
      res.status(200).json(user);
    });
};

// Check if the token is ok
module.exports.checkToken = (req, res) => {
  const authHeader = req.header('authorization')
  const token = authHeader && authHeader.split(' ')[1];
  if (token === null) return res.sendStatus(401)
  jwt.verify(token, JWT_TOKEN_KEY, (err, userId) => {
      if (err) return res.sendStatus(403)
      User.findById(userId.id)
        .then((user) => {
            res.status(200).json(user._id);
        })
        .catch(err => res.status(500).send(err));
  });
};

// Log out function
module.exports.logout = (req, res) => {
  res.redirect('/');
};
