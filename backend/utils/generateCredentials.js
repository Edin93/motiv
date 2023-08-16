// Generate a code with 4 digits
module.exports.generateConfirmationEmailCode = () => {
  return Math.floor(Math.random() * 9000) + 1000;
}

// Generate a password with at least one uppercase character, one lowercase character, one number and one symbol
module.exports.generateNewPassword = () => {
  const lowercaseLetters = 'abcdefghijklmnopqrstuvwxyz';
  const uppercaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const numbers = '0123456789';
  const symbols = ['&','!','*','$','?','-'];

  const allCharacters = lowercaseLetters + uppercaseLetters + numbers;

  let password = '';

  password += lowercaseLetters[Math.floor(Math.random() * lowercaseLetters.length)];
  password += uppercaseLetters[Math.floor(Math.random() * uppercaseLetters.length)];
  password += numbers[Math.floor(Math.random() * numbers.length)];

  const randomSymbolIndex1 = Math.floor(Math.random() * symbols.length);
  let randomSymbolIndex2 = Math.floor(Math.random() * symbols.length);
  while (randomSymbolIndex2 === randomSymbolIndex1) {
    randomSymbolIndex2 = Math.floor(Math.random() * symbols.length);
  }
  password += symbols[randomSymbolIndex1];
  password += symbols[randomSymbolIndex2];

  for (let i = password.length; i < 10; i++) {
    const randomIndex = Math.floor(Math.random() * allCharacters.length);
    password += allCharacters[randomIndex];
  }

  password = password.split('').sort(() => Math.random() - 0.5).join('');

  return password;
}
