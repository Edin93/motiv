module.exports.signUpErrors = (err) => {
  let errors = { email: '', username: '', password: '' };
  
  if (err.message.includes('email')) {
    errors.email = 'Votre email est incorrect';
  }

  if (err.message.includes('username')) {
    errors.username = 'Votre pseudo doit comporter entre 4 et 20 caractères';
  }

  if (err.message.includes('password')) {
    errors.password = 'Votre mot de passe est trop court';
  }

  if (err.message.includes('email') && err.code === 11000) {
    errors.email = 'Cet email est déjà utilisé';
  }

  if (err.message.includes('username') && err.code === 11000) {
    errors.username = 'Ce pseudo est déjà pris';
  }
  
  return errors;
};

module.exports.signInErrors = (err) => {
  const errors = { email: '', password: '', validation: '' };

  if (err.message.includes('email')) {
    errors.email = 'Email inconnue';
  }

  if (err.message.includes('password')) {
    errors.password = 'Mot de passe incorrect';
  }

  if (err.message.includes("validation")) {
    errors.validation = "Veuillez confirmer votre adresse email";
  }

  return errors;
};
