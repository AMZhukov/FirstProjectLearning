'use strict'
let money = null, income = 'freelance', expenses1 = null, expenses2 = null,
    start = function() {
        do {
            money = +prompt('Ваш месячный доход', 50000);
        } while(isNaN(money) || money == '' || money == null);
        return money;
    };

start();

let appData = {
    budget: money,
    budgetDay: null,
    budgetMonth: null,
    income: {},
    addIncome: [],
    expenses: {},
    addExpenses: [],
    expensesMonth: null,
    deposit: false,
    percentDeposit: null,
    moneyDeposit: null,
    mission: 50000,
    period: 3,
    asking: function (){
        
        if(confirm('Есть ли у вас дополнительный источник заработка?')){
            let itemIncome = appData.getCheckText('Какой у вас дополнительный заработок?', 'Таксую');
            let cashIncome = appData.getCheckDigit('Сколько в месяц вы на этом зарабоатываете?', 10000);
            appData.income[itemIncome] = cashIncome;
        }

        let addExpenses = prompt("Перечислите возможные расходы за рассчитываемый период через запятую", "Еда, вода");
        appData.addExpenses = addExpenses.toLowerCase().split(', ')
        appData.deposit = confirm("Есть ли у вас депозит в банке?");
        for (let i = 0; i < 2; i++){
            
            let itemExpenses = appData.getCheckText('Введите обязательную статью расходов', 'Кварплата'),
                cashExpenses = appData.getCheckDigit('Во сколько это обойдется?', 2500);
            
            appData.expenses[itemExpenses] = cashExpenses;

        }
    },
    getExpensesMonth: function() { //Вычисление суммарных расходов в месяц
        for (let key in appData.expenses){
            appData.expensesMonth += +appData.expenses[key];
        }
    },
    getBudget: function() { //вычисление бюджета на месяц и день
        appData.budgetMonth = appData.budget - appData.expensesMonth;
        appData.budgetDay = Math.floor(appData.budgetMonth / 30);
    },
    getTargetMonth: function () { //вычисление за сколько накопятся деньги
        return appData.mission / appData.expensesMonth;
    },
    getStatusIncome: function (){ //вычисление уровня дохода
        if (appData.budgetDay >= 800) return ("Высокий уровень дохода");
        else if ((appData.budgetDay >= 300)) return ("Средний уровень дохода");
        else if ((appData.budgetDay >= 0)) return ("Низкий уровень дохода");
        else return ("Что то пошло не так");
    },
    getInfoDeposit: function() {
        if(appData.deposit){
            appData.percentDeposit = appData.getCheckDigit('Какой годовой процент?', '10');
            appData.moneyDeposit = appData.getCheckDigit('Какая сумма заложена?', 10000);
        }
    },
    calcSavedMoney: function(){
        return (appData.budgetMonth * appData.period);
    },
    getCheckDigit: function(ask, digit){
        let checkDigit;
        do {
            checkDigit = prompt(ask, digit);
        } 
        while (isNaN(checkDigit) || checkDigit == '' || checkDigit == null);
        return checkDigit;
    },
    getCheckText: function(ask, text){
        let checkText;
        do {
            checkText = prompt(ask, text);
        }
        while (!isNaN(checkText) || checkText == '' || checkText == null);
        return checkText;
    },
    getUpperLetter: function(arr){
        let arrCur = arr.join(', ');
        let arrCur1 = '';
        for (let i = 0; i < arrCur.length; i++){
            if (i == 0) arrCur1 += arrCur[i].toUpperCase();
            else if (arrCur[i-1] === ' ') arrCur1 += arrCur[i].toUpperCase();
            else {
                arrCur1 += arrCur[i];
            }
        }
        return arrCur1;
    }
};

appData.asking();
appData.getExpensesMonth();
appData.getBudget();

console.log('Расходы за месяц: ' + appData.expensesMonth);

if (appData.budgetMonth  >= 0){
    console.log("Цель будет достигнута за " + Math.ceil(appData.getTargetMonth()) + ' месяца');
} else {
    console.log("Цель не будет достигнута");
}

console.log(appData.getStatusIncome());

/*for (let key in appData){
    (console.log('Наша программа включает в себя данные ' + key + ' - ' + appData[key]));
}*/
appData.getInfoDeposit();
console.log(appData.percentDeposit, appData.moneyDeposit, appData.calcSavedMoney());
console.log(appData.getUpperLetter(appData.addExpenses));