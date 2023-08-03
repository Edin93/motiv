const nodemailer = require('nodemailer');
const User = require('../models/UserModel');
const { generateConfirmationEmailCode } = require('./generateId');

// Send a email with a 4 digits code for confirm user's email
module.exports.sendConfirmationMail = async (subject, user) => {
  const email = user.email;
  const tmp_code = generateConfirmationEmailCode();
  const tmp_code_expiration = new Date(Date.now() + 5 * 60 * 1000);
  await User.findOneAndUpdate({ email }, { tmp_code, tmp_code_expiration}, { new: true });
  var transporter = nodemailer.createTransport({
    service: 'hotmail',
    auth: {
      user: process.env.EMAIL_MOTIV,
      pass: process.env.EMAIL_MOTIVPASSWORD,
    },
  });
  let mailOptions = {};
  if (subject === 'creation') {
    mailOptions = {
      from: "Motiv <maxence0@hotmail.fr>",
      to: user.email,
      subject: "Bienvenue sur Motiv",
      html: `Salut ${user.username} !
      Avant de pouvoir transpirer, confirme ton adresse email avec ce code: <b>${tmp_code}</b> !`,
    };
  } else if (subject === 'resend') {
    mailOptions = {
      from: "Motiv <maxence0@hotmail.fr>",
      to: user.email,
      subject: "Renvoi du code de confirmation",
      html: `Alors ${user.username}, tu n'as pas rentrer le code à temps ?
      Vu qu'on est gentils en voilà un autre: <b>${tmp_code}</b> !`,
    };
  }

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}
