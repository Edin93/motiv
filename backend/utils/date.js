module.exports.dateReduction = (date, reduction) => {
  const newDate = new Date(date);
  switch (reduction) {
    case '10m':
      newDate.setMinutes(newDate.getMinutes() - 10);
      return newDate;
    case '30m':
      newDate.setMinutes(newDate.getMinutes() - 30);
      return newDate;
    case '1h':
      newDate.setHours(newDate.getHours() - 1);
      return newDate;
    case '3h':
      newDate.setHours(newDate.getHours() - 3);
      return newDate;
    case '6h':
      newDate.setHours(newDate.getHours() - 6);
      return newDate;
    case '1d':
      newDate.setDay(newDate.getDay() - 1);
      return newDate;
    case '7d':
      newDate.setDay(newDate.getDay() - 7);
      return newDate;
    default:
      return 'erreur';
  }
}
