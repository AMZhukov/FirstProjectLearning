'use strict'
let money = 15000,
    income = 'freelance',
    addExpenses = 'Food, Water, Laptop',
    deposit = true,
    mission = 20000,
    period = 12;

console.log('Тип данных money —', typeof money);
console.log('Тип данных income —', typeof income);
console.log('Тип данных deposit —', typeof deposit);
console.log('Длина строки =', income.length);
console.log('Период', period, 'месяцев');
console.log(addExpenses.toLowerCase().split(', ').join(", "));
console.log('Дневной бюджет =', money / 30);
console.log('остаток от деления бюджета =', money % 30);
