'use strict'
let money = null, income = 'freelance', expenses1 = null, expenses2 = null,
    start = function() {
        do {
            money = +prompt('Ваш месячный доход', 50000);
        } while(isNaN(money) || money === '' || money === null);
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
    mission: 50000,
    period: 3,
    asking: function (){
        let addExpenses = prompt("Перечислите возможные расходы за рассчитываемый период через запятую", "Еда, вода");
        appData.addExpenses = addExpenses.toLowerCase().split(',');
        appData.deposit = confirm("Есть ли у вас депозит в банке?");
        for (let i = 0; i < 2; i++){
            
            let itemExpenses = prompt('Введите цель накоплений?', 'Автомобиль');
            let cashExpenses;
            do{
                cashExpenses = prompt('Сколько в месяц откладывать?', 2500);
            } 
            while (isNaN(cashExpenses) || cashExpenses === '' || cashExpenses === null);
            
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
        appData.period = appData.mission / appData.expensesMonth;
        },
    getStatusIncome: function (){ //вычисление уровня дохода
        if (appData.budgetDay > 800) {
            return ("Высокий уровень дохода");

        } else if ((appData.budgetDay > 300)) {
            return ("Средний уровень дохода");
        } else if ((appData.budgetDay > 0)) {
            return ("Низкий уровень дохода");

        } else {
            ("Что то пошло не так");
        }
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

for (let key in appData){
    (console.log('Наша программа включает в себя данные ' + key + ' - ' + appData[key]));
}

