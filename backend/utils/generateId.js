module.exports.generateConfirmationEmailCode = () => {
  return Math.floor(Math.random() * 9000) + 1000;
}
