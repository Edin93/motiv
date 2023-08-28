require("dotenv").config();
const nodemailer = require('nodemailer');
const User = require('../models/UserModel');
const { generateConfirmationEmailCode, generateNewPassword } = require('./generateCredentials');
const bcrypt = require('bcrypt');

const EMAIL_SERVICE = process.env.EMAIL_SERVICE;
const EMAIL_MOTIV = process.env.EMAIL_MOTIV;
const EMAIL_MOTIV_PASSWORD = process.env.EMAIL_MOTIVPASSWORD;

// Send a email with a 4 digits code for confirm user's email
module.exports.sendConfirmationMail = async (subject, user) => {
  const email = user.email;
  let tmp_code, tmp_code_expiration;
  if (subject != 'password') {
    tmp_code = generateConfirmationEmailCode();
    tmp_code_expiration = new Date(Date.now() + 5 * 60 * 1000);
    await User.findOneAndUpdate({ email }, { tmp_code, tmp_code_expiration}, { new: true });
  }
  var transporter = nodemailer.createTransport({
    service: EMAIL_SERVICE,
    auth: {
      user: EMAIL_MOTIV,
      pass: EMAIL_MOTIV_PASSWORD,
    },
  });
  let mailOptions = {};
  if (subject === 'creation') {
    mailOptions = {
      from: `Motiv <${EMAIL_MOTIV}>`,
      to: user.email,
      subject: "Bienvenue sur Motiv !",
      html: `<!DOCTYPE html>
            <html lang="en">
            <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Message de Bienvenue</title>
            </head>
            <body style="margin: 0; padding: 0; background-color: #ffffff; color: #000000; font-family: Arial, sans-serif; text-align: center;">
            
            <div>
              <div style="background-color: #f26619; color: #ffffff; padding: 20px;">
                <h1 style="margin: 0; font-size: 24px;">Bienvenue sur Motiv ${user.username} !</h1>
              </div>
            
              <div style="padding: 30px;">
                <h2 style="font-size: 20px;">Vérifie ton adresse email</h2>
                <p>Merci d'avoir rejoint Motiv. Avant de commencer, renseigne ce code à 4 chiffres afin de valider ton adresse mail:</p>
                <p style="font-size: 28px;font-weight: bold;color: #f26619;border: 2px solid #000000;padding: 10px;width: fit-content;margin: 40px auto;">${tmp_code}</p>
              </div>
            
              <footer style="background-color: #f26619; color: #ffffff; padding: 10px;">
                &copy; 2023 Motiv. Tous droits réservés.
              </footer>
            </div>
            
            </body>
            </html>
            `
    };
  } else if (subject === 'resend') {
    mailOptions = {
      from: `Motiv <${EMAIL_MOTIV}>`,
      to: user.email,
      subject: "Renvoi du code de confirmation",
      html: `<!DOCTYPE html>
            <html lang="en">
            <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Envoi d'un nouveau code de vérification</title>
            </head>
            <body style="margin: 0; padding: 0; background-color: #ffffff; color: #000000; font-family: Arial, sans-serif; text-align: center;">
            
            <div>
              <div style="background-color: #f26619; color: #ffffff; padding: 20px;">
                <h1 style="margin: 0; font-size: 24px;">Besoin d'un nouveau code ?</h1>
              </div>
            
              <div style="padding: 30px;">
                <h2 style="font-size: 20px;">Voici ton nouveau code:</h2>
                <p>(Attention, il n'est valable que pour une durée de 5 minutes, alors ne tardes pas ;)</p>
                <p style="font-size: 28px;font-weight: bold;color: #f26619;border: 2px solid #000000;padding: 10px;width: fit-content;margin: 40px auto;">${tmp_code}</p>
              </div>
            
              <footer style="background-color: #f26619; color: #ffffff; padding: 10px;">
                &copy; 2023 Motiv. Tous droits réservés.
              </footer>
            </div>
            
            </body>
            </html>
            `
    };
  } else if (subject === 'password') {
    const newPassword = generateNewPassword();
    const hashPassword = await bcrypt.hash(newPassword, 10);
    await User.findOneAndUpdate(
      { email },
      {hasToUpdatePassword: true, password: hashPassword},
      {new: true}
    )
    mailOptions = {
      from: `Motiv <${EMAIL_MOTIV}>`,
      to: user.email,
      subject: "Réinitialisation du mot de passe",
      html: `<!DOCTYPE html>
            <html lang="en">
            <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Nouveau mot de passe</title>
            </head>
            <body style="margin: 0; padding: 0; background-color: #ffffff; color: #000000; font-family: Arial, sans-serif; text-align: center;">

            <div>
              <div style="background-color: #f26619; color: #ffffff; padding: 20px;">
                <h1 style="margin: 0; font-size: 22px;">Petit trou de mémoire ${user.username} ?</h1>
              </div>

              <div style="padding: 30px;">
                <h2 style="font-size: 20px;">Pas de panique ! En voilà un tout neuf :)</h2>
                <p>Ceci est un mot de passe temporaire. Utilise-le lors de ta prochaine connexion et tu pourras ensuite en définir un nouveau !</p>
                <p style="font-size: 28px;font-weight: bold;color: #f26619;border: 2px solid #000000;padding: 10px;width: fit-content;margin: 40px auto;">${newPassword}</p>
              </div>

              <footer style="background-color: #f26619; color: #ffffff; padding: 10px;">
                &copy; 2023 Motiv. Tous droits réservés.
              </footer>
            </div>

            </body>
            </html>
            `
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
