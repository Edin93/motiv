// Generate a code with 4 digits
module.exports.generateConfirmationEmailCode = () => {
  return Math.floor(Math.random() * 9000) + 1000;
}

module.exports.generateNewPassword = () => {
  return "test";
}
