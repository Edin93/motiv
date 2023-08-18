module.exports.signUpErrors = (err) => {
  let errors = { email: '', username: '', password: '' };
  
  if (err.message.includes('email')) {
    errors.email = 'Votre email est incorrect';
  }

  if (err.message.includes('username')) {
    errors.username = 'Votre pseudo doit comporter entre 4 et 20 caractères';
  }

  if (err.message.includes('password')) {
    errors.password = "Le mot de passe doit contenir entre 6 et 20 caractères " +
    "comprenant au minimum une lettre minuscule, une lettre majuscule, un chiffre et un symbole";
  }

  if (err.message.includes('email') && err.code === 11000) {
    errors.email = 'Email déjà utilisé';
  }

  if (err.message.includes('username') && err.code === 11000) {
    errors.username = 'Pseudo déjà pris';
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

module.exports.createActivityErrors = (err) => {
  const errors = { name: '', rules: '', icon: ''};

  if (err.message.includes('name')) {
    errors.name = "Nom de l'activité obligatoire";
  }

  if (err.message.includes('rules')) {
    errors.rules = "Règles de l'activité obligatoires";
  }

  if (err.message.includes('name') && err.code === 11000) {
    errors.name = 'Cette activité existe déjà';
  }

  return errors;
}
