/* eslint-disable linebreak-style */
/* eslint-disable indent */
/* eslint-disable prefer-const */
/* eslint-disable no-undef */
/* eslint-disable no-console */
/* eslint-disable no-alert */
/* eslint-disable quotes */
/* eslint-disable no-unused-vars */
/* eslint-disable one-var */
// eslint-disable-next-line one-var
// eslint-disable-next-line prefer-const
let money = 15000,
    income = 'freelance',
    addExpenses = 'Food, Water, Laptop',
    deposit = true,
    mission = 20000,
    period = 12;

const currentAddExpenses = (addExpenses.toLowerCase());
const budgetDay = money / 30;
const balanceBudgetDay = money % 30;

console.log('Тип данных money —', typeof money);
console.log('Тип данных income —', typeof income);
console.log('Тип данных deposit —', typeof deposit);
console.log('Длина строки =', income.length);
console.log('Период', period, 'месяцев');
console.log('Цель заработать', mission, 'рублей/долларов/гравен/юани');
console.log(currentAddExpenses.split(', '));
console.log('Дневной бюджет =', budgetDay);
console.log('остаток от деления бюджета =', balanceBudgetDay);
