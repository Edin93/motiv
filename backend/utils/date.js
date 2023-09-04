module.exports.dateReduction = (date, reduction) => {
  switch (reduction) {
    case '10m':
      date.setMinutes(date.getMinutes() - 10);
      return date;
    case '30m':
      date.setMinutes(date.getMinutes() - 30);
      return date;
    case '1h':
      date.setHours(date.getHours() - 1);
      return date;
    case '3h':
      date.setHours(date.getHours() - 3);
      return date;
    case '6h':
      date.setHours(date.getHours() - 6);
      return date;
    case '1d':
      date.setDay(date.getDay() - 1);
      return date;
    case '7d':
      date.setDay(date.getDay() - 7);
      return date;
    default:
      return 'erreur';
  }
}
