'use strict';
let money = null,
    income = 'freelance',
    expenses1 = null,
    expenses2 = null,

    start = function() {
        do {
            money = +prompt('Ваш месячный доход', 50000);
        } while(isNaN(money) || money === '' || money === null);
        return money;
    };

start();

let appData = {
    income: {},
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: false,
    mission: 50000,
    period: 3,
    budget: money,
    budgetDay: null,
    budgetMonth: null,
    expensesMonth: null,
    asking: function (){
            appData.addExpenses = prompt("Перечислите возможные расходы за рассчитываемый период через запятую", "Еда, вода");
            appData.addExpenses.toLowerCase().split(',');
            appData.deposit = confirm("Есть ли у вас депозит в банке?");
            let sum = 0;
            for (let i = 0, ask = null; i < 2; i++){
                if (i === 0){
                    expenses1 = prompt('Введите цель накоплений?', 'Автомобиль');
                    do{
                        appData.expenses[expenses1] = prompt('Сколько в месяц откладывать?', 2500);
                    } while (isNaN(appData.expenses[expenses1]) || appData.expenses[expenses1] === '' || appData.expenses[expenses1] === null);
                }
                if (i === 1){
                    expenses2 = prompt('Введите цель накоплений?', 'Самолёт');
                    do{
                        appData.expenses[expenses2] = prompt('Сколько в месяц отклаывать?', 2500);
                    } while (isNaN(appData.expenses[expenses2]) || appData.expenses[expenses2] === '' || appData.expenses[expenses2] === null);
            }
        }
        appData.getExpensesMonth();
    },

    getExpensesMonth: function(){ //Вычисление суммарных расходов в месяц
        for (let key in appData.expenses){
            appData.expensesMonth += +appData.expenses[key];
        }
        appData.getBudget();
    },

    getBudget: function(){ //вычисление бюджета на месяц и день
        appData.budgetMonth = money - appData.expensesMonth;
        appData.budgetDay = appData.budgetMonth / 30;
        appData.getTargetMonth();
    },

    getTargetMonth: function (){ //вычисление за сколько накопятся деньги
        appData.period = appData.mission / appData.expensesMonth;
    },

    getStatusIncome: function (){ //вычисление уровня дохода
        if (appData.budgetDay > 800) return ("Высокий уровень дохода");
        else if (appData.budgetDay > 300) return ("Средний уровень дохода");
        else if (appData.budgetDay > 0) return ("Низкий уровень дохода");
        else return ("Что то пошло не так");
    },
    
    checkTargetMonth: function (){
        if (appData.budgetMonth  >= 0){
            return ("Цель будет достигнута за " + Math.ceil(appData.period) + ' месяца');
        }
        else return ("Цель не будет достигнута");
    }
};


appData.asking();
console.log('Расходы за месяц', appData.expensesMonth);
console.log(appData.checkTargetMonth());
console.log(appData.getStatusIncome());
console.log('Наша программа включает в себя следующие данные: ');
for (let key in appData){
    (console.log('Наша программа включает в себя следующие данные: ' + key + ' - ' + appData[key]));
}
