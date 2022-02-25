function returnRundomInteger (min, max) {
  if (!(Number.isInteger(min) && Number.isInteger(max))) {
    return 'Числа должны быть целыми!';
  }
  if ((min < 0) || (max < 0)) {
    return 'Введите положительные числа';
  }

  if (min === max) {
    return 'Введите разные числа';
  }

  if  (min > max) {
    const temporaryVariable = max;
    max = min;
    min = temporaryVariable;
  }

  return Math.floor(Math.random() * (max - min) + min);
}

function returnRundomFloat (min, max, float) {
  if (!(Number.isInteger(min) && Number.isInteger(max))) {
    return 'Числа должны быть целыми!';
  }
  if ((min < 0) || (max < 0)) {
    return 'Введите положительные числа';
  }

  if (min === max) {
    return 'Введите разные числа';
  }

  if  (min > max) {
    const temporaryVariable = max;
    max = min;
    min = temporaryVariable;
  }

  return (Math.random() * (max - min) + min).toFixed(float);
}

returnRundomInteger(10,5);

returnRundomFloat(10, 5, 2);
