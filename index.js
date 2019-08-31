'use strict'
let money =  start('Ваш месячный доход?', 50000),
    income = 'freelance',
    addExpenses = prompt("Перечислите возможные расходы за рассчитываемый период через запятую"),
    deposit = confirm("Есть ли у вас депозит в банке?"),
    mission = 25000,
    descrSpend0 = prompt("Какие обязательные ежемесячные расходы у вас есть?"),
    spend0 = start ('Во сколько это обойдется?', 300),
    descrSpend1 = prompt("Какие обязательные ежемесячные расходы у вас есть?"),
    spend1 = start ('Во сколько это обойдется?', 300),
    budgetDay = null,
    accumulatedMonth = null;

function start (temp0, temp1) {
    let ask = null;
    do {
        ask = prompt(temp0, temp1);
    } while(isNaN(ask) || ask === '' || ask === null);
    return +ask;
}

let getExpensesMonth = function() {
    return ((spend0) + (spend1));
};

let getAccumulatedMonth = function() {
    return ((money) - getExpensesMonth());
};

let getTargetMonth = function() {
    return (Math.floor(mission / accumulatedMonth));
};

accumulatedMonth = getAccumulatedMonth();
let targetMonth = getTargetMonth();

let showTypeOf = function(data) {
    return (typeof(data));
};

budgetDay = accumulatedMonth / 30;

let getStatusIncome = function () {
    if (budgetDay >= 800) return ("Высокий уровень дохода");
    else if ((budgetDay >= 300) && (budgetDay < 800)) return ("Средний уровень дохода");
    else if ((budgetDay >= 0) && (budgetDay < 300)) return ("Низкий уровень дохода");
    else return ("Что то пошло не так");
}

console.log('money:', money);
console.log('Тип данных money –', showTypeOf(money));
console.log('Тип данных income –', showTypeOf(income));
console.log('Тип данных deposit –', showTypeOf(deposit));
console.log(getStatusIncome());
console.log('Накопления за период', accumulatedMonth);
console.log('Срок достижения в месяцах', targetMonth);
console.log((targetMonth >= 0 ? 'Цель будет достигрута' : 'Цель не будет достигнута')) ;