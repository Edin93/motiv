module.exports.signUpErrors = (err) => {
  const errors = { username: '', email: '', password: '' };
  
  if (err.message.includes('username')) {
    errors.username = 'Username must be between 4 and 20 characters long';
  }

  if (err.message.includes('email')) {
    errors.email = 'Email incorrect';
  }

  if (err.message.includes('password')) {
    errors.password = 'Password too short';
  }

  if (err.message.includes('username') && err.code === 11000) {
    errors.username = 'Username already taken';
  }

  if (err.message.includes('email') && err.code === 11000) {
    errors.email = 'Email already taken';
  }
  
  return errors;
};

module.exports.signInErrors = (err) => {
  const errors = { email: '', password: '' };

  if (err.message.includes('email')) {
    errors.email = 'Email unknown';
  }

  if (err.message.includes('password')) {
    errors.password = 'Password incorrect';
  }
  return errors;
};
