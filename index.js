'use strict'
let money = null,
    income = 'freelance',
    addExpenses = prompt("Перечислите возможные расходы за рассчитываемый период через запятую"),
    deposit = confirm("Есть ли у вас депозит в банке?"),
    mission = 50000,
    pediod = 3,
    expenses1,
    expenses2,
    expensesAmount = null;

let start = function() {
    do {
        money = +prompt('Ваш месячный доход', 50000);
    } while(isNaN(money) || money === '' || money === null);
    return money;
};

start();

let showTypeOf = function(item){
    console.log(item, typeof item);
};

let getExpensesMonth = function(){
    let sum = 0;
    
    for (let i = 0, ask = null; i < 2; i++){
        if (i === 0){
            expenses1 = prompt('Введите обязательную статью расходов?', 'Кварплата');
        }
        if (i === 1){
            expenses2 = prompt('Введите обязательную статью расходов?', 'Бензин');
        }
        do{
            ask = prompt('Во сколько это обойдется?', 2500)
        } while (isNaN(ask) || ask === '' || ask === null);
        sum += +ask;
    }
    return sum;
};

expensesAmount = getExpensesMonth();

let getAccumulatedMonth = function(){
    return (money - expensesAmount);
};

let getTargetMonth = function (){
    return mission / expensesAmount;
};

let budgetDay = getAccumulatedMonth() / 30,

    checkTargetMonth = function () {
    if (getAccumulatedMonth() >= 0){
        return ("Цель будет достигнута за " + Math.ceil(getTargetMonth()) + ' месяца');
    }
    return ("Цель не будет достигнута");
}



let getStatusIncome = function () {
    if (budgetDay >= 800) return ("Высокий уровень дохода");
    else if ((budgetDay >= 300) && (budgetDay < 800)) return ("Средний уровень дохода");
    else if ((budgetDay >= 0) && (budgetDay < 300)) return ("Низкий уровень дохода");
    else return ("Что то пошло не так");
}

showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);

console.log(checkTargetMonth());
console.log(getStatusIncome());
console.log(addExpenses.toLowerCase().split(','));
console.log ('Расходы за месяц: ' + expensesAmount);