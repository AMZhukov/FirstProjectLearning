'use strict'
let money = prompt("Ваш месячный доход?"),
    income = 'freelance',
    addExpenses = prompt("Перечислите возможные расходы за рассчитываемый период через запятую"),
    deposit = confirm("Есть ли у вас депозит в банке?"),
    mission = 25000,
    descrSpend0 = prompt("Какие обязательные ежемесячные расходы у вас есть?"),
    spend0 = prompt("Во сколько это обойдется?"),    
    descrSpend1 = prompt("Какие обязательные ежемесячные расходы у вас есть?"),
    spend1 = prompt("Во сколько это обойдется?"),
    budgetDay = null;    

let getExpensesMonth = function() {
    return ((+spend0) + (+spend1));
};

let getAccumulatedMonth = function() {
    return ((+money) - getExpensesMonth());
};

let accumulatedMonth = getAccumulatedMonth();
let getTargetMonth = function() {
    return (Math.floor(mission / accumulatedMonth));
};

let showTypeOf = function(data) {
    return (typeof(data));
};
budgetDay = accumulatedMonth / 30;

let getStatusIncome = function () {
    if (budgetDay >= 800) return ("Высокий уровень дохода");
    else if ((budgetDay >= 300) && (budgetDay < 800)) return ("Средний уровень дохода");
    else if ((budgetDay >= 0) && (budgetDay < 300)) return ("Низкий уровень дохода");
    else return ("Низкий уровень дохода");
}


console.log('Тип данных money –', showTypeOf(money));
console.log('Тип данных income –', showTypeOf(income));
console.log('Тип данных deposit –', showTypeOf(deposit));
console.log(getStatusIncome());
console.log('Накопления за период', mission);
console.log('Срок достижения в месяцах', getTargetMonth());