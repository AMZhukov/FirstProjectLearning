const number = 266219; 
let multiNumber = null,
  cutCubingNumber = null;
  
  multiNumber = String(number).split("").reduce(function(result, multiplier) {
  return result * multiplier;
})
cutCubingNumber = String(multiNumber ** 3).slice(0,2);

console.log('Произведение цифр числа 266219 =', multiNumber);
console.log('Первые две цифры, числа возведённого в куб, состоящего из произведения цифр 2, 6, 6, 2, 1, 9 =', cutCubingNumber);
