const number = 266219;
const currentNumber1 = Array.from(String(number), Number);
let multiNumber = 1;

for(let i = 0; i < currentNumber1.length; i++) {
    multiNumber *= currentNumber1[i];
}

const cubingNumber = multiNumber ** 3;
const currentNumber2 = Array.from(String(cubingNumber), Number);
const sumNumber = currentNumber2[0] + currentNumber2[1];

console.log('Сумма первых двух цифр, числа возведённого в куб, состоящего из произведения цифр 2, 6, 6, 2, 1, 9 =', sumNumber);
