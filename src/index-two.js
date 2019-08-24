const number = 266219; 
let currentNumber1 = null,
  multiNumber = 1,
  cubingNumber = null,
  currentNumber2 = null,
  sumNumber = null;

currentNumber1 = Array.from(String(number), Number); // convert numbers to array
for (let i = 0; i < currentNumber1.length; i += 1) {
  multiNumber *= currentNumber1[i]; // digitals multiplied by each other
}
cubingNumber = multiNumber ** 3; // cubing a number
currentNumber2 = Array.from(String(cubingNumber), Number); // cut first and second digital
sumNumber = currentNumber2[0] + currentNumber2[1]; // the sum of two numbers

console.log('Сумма первых двух цифр, числа возведённого в куб, состоящего из произведения цифр 2, 6, 6, 2, 1, 9 =', sumNumber);
