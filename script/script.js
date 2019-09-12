'use strict'
//joining
let start = document.getElementById('start'),
    btnPlus = document.getElementsByTagName('button'),
    incomePlus = btnPlus[0],
    expensesPlus = btnPlus[1],
    additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
    depositCheck = document.querySelector('#deposit-check'),
    budgetDayValue = document.getElementsByClassName('budget_day-value')[0],
    budgetMonthValue = document.getElementsByClassName('budget_month-value')[0],
    expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0],
    accumulatedMonthValue = document.getElementsByClassName('accumulated_month-value')[0],
    additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0],
    additionalExpensesValue =  document.getElementsByClassName('additional_expenses-value')[0],
    incomePeriodValue = document.getElementsByClassName('income_period-value')[0],
    targetMonthValue = document.getElementsByClassName('target_month-value')[0],
    salaryAmount = document.querySelector('.salary-amount'),
    incomeTitle = document.querySelectorAll('.income-title'),   //Если убрать All, не будет блокироваться запись. Т.к. у родителя такой класс есть
    expensesTitle = document.querySelectorAll('.expenses-title'), //Если убрать All, клон не создается
    expensesItems = document.querySelectorAll('.expenses-items'),
    additionalExpenses = document.querySelector('.additional_expenses'),
    periodSelect = document.querySelector('.period-select'),
    additionalExpensesItem = document.querySelector('.additional_expenses-item'),
    targetAmount = document.querySelector('.target-amount'),
    incomeItem = document.querySelectorAll('.income-items'), //Если убрать All, клон не создается
    periodAmount = document.querySelector('.period-amount'),
    expensesAmount = document.querySelectorAll('.expenses-amount'), //Если убрать All, клон не создается
    incomeAmount = document.querySelectorAll('.income-amount'); //Если убрать All, клон не создается


let appData = {
    budget: 0,
    budgetDay: 0,
    budgetMonth: null,
    income: {},
    incomeMonth: 0,
    addIncome: [],
    expenses: {},
    expensesMonth: null,
    addExpenses: [],
    deposit: false,
    percentDeposit: null,
    moneyDeposit: null,
    start: function () {

        if (salaryAmount.value === '') {
            alert('Ошибка, поле "Месячный доход" должно быть заполнено!');
            return;
        }
        appData.budget = +salaryAmount.value;

        appData.getExpenses();
        appData.getIncome();
        appData.getExpensesMonth();
        appData.getAddExpenses();
        appData.getAddIncome();
        appData.getIncomeMonth();
        appData.getBudget();

        appData.showResult();
    },
    showResult: function(){
        budgetMonthValue.value = appData.budgetMonth;
        budgetDayValue.value = appData.budgetDay;
        expensesMonthValue.value = appData.expensesMonth;
        additionalExpensesValue.value = appData.addExpenses.join(', ');
        additionalIncomeValue.value = appData.addIncome.join(', ');
        targetMonthValue.value = Math.ceil(appData.getTargetMonth());

        appData.updateCalcPeriod();
        periodSelect.addEventListener('change', appData.updateCalcPeriod);
        appData.delAttribute();
        appData.hideVisibleButton();

    },

    updateCalcPeriod: function (){
        incomePeriodValue.value = appData.calcPeriod();
    },
    delAttribute: function () {
        appData.delAttributeForEach(incomeAmount);
        appData.delAttributeForEach(incomeAmount);
        salaryAmount.setAttribute("readonly", "");
        appData.delAttributeForEach(incomeTitle); //Здесь иначе никак не получается. Т.к. тут ещё у родителя такой же класс. Из-за этого только родитель блокировку получает
        incomeAmount.setAttribute("readonly", "");
        appData.delAttributeForEach(expensesTitle);
        appData.delAttributeForEach(additionalIncomeItem);
        appData.delAttributeForEach(expensesTitle);
        appData.delAttributeForEach(expensesAmount);
        additionalExpensesItem.setAttribute("readonly", "");
        targetAmount.setAttribute("readonly", "");

    },
    delAttributeForEach: function (a) {
        a.forEach(function (item) {
            item = item.setAttribute("readonly", "");
        })
    },
    hideVisibleButton: function () {
        document.querySelector('#start').style.display='none';
        document.querySelector('#cancel').style.display='block';
    },
    addExpensesBlock: function () {

        let cloneExpensesItem = expensesItems[0].cloneNode(true);
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
        expensesItems = document.querySelectorAll('.expenses-items');
        if (expensesItems.length == 3) {
            expensesPlus.style.display = 'none';
        }
    },
    addIncomeBlock: function () {

        let cloneIncomeItem = incomeItem[0].cloneNode(true);
        incomeItem[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
        incomeItem = document.querySelectorAll('.income-items');
        if (incomeItem.length == 3) {
            incomePlus.style.display = 'none';
        }
    },
    getExpenses: function(){
        expensesItems.forEach(function(item) {
            let itemExpenses = item.querySelector('.expenses-title').value;
            let cashExpenses = item.querySelector('.expenses-amount').value;
            if(itemExpenses !== '' && cashExpenses !== ''){
                appData.expenses[itemExpenses] = cashExpenses;
            }
        });
    },
    getAddExpenses: function() {
        let getExpenses = additionalExpensesItem.value.split(',');
        getExpenses.forEach(function (item) {
            item = item.trim();
            if (item !==''){
                appData.addExpenses.push(item);
            }
        })
    },
    getIncome: function(){
        incomeItem.forEach(function (item) {
            let itemIncome = item.querySelector('.income-title').value;
            let cashIncome = item.querySelector('.income-amount').value;
            if(itemIncome !== '' && cashIncome !== ''){
                appData.income[itemIncome] = cashIncome;
            }
        })
    },
    getAddIncome: function(){
        additionalIncomeItem.forEach(function(item){
            let itemValue = item.value.trim();
            if (itemValue !== ''){
                appData.addIncome.push(itemValue);
            }
        })
    },
    getInfoDeposit: function () {
        appData.deposit = confirm("Есть ли у вас депозит в банке?");
        if (appData.deposit) {
            appData.percentDeposit = appData.getCheckDigit('Какой годовой процент?', '10');
            appData.moneyDeposit = appData.getCheckDigit('Какая сумма заложена?', 100000);
        }
    },
    getExpensesMonth: function () { //Вычисление суммарных расходов в месяц

        for (let key in appData.expenses) {
            appData.expensesMonth += +appData.expenses[key];
        }

    },
    getIncomeMonth: function () { //calculated sum income, additional salary
        for (let key in appData.income) {
            appData.incomeMonth += +appData.income[key];
        }

    } ,
    getBudget: function () { //вычисление бюджета на месяц и день
        appData.budgetMonth = appData.budget + appData.incomeMonth - appData.expensesMonth;
        appData.budgetDay = Math.floor(appData.budgetMonth / 30);
    },
    getTargetMonth: function () { //вычисление за сколько накопятся деньги
        return (targetAmount.value / appData.budgetMonth);
    },
    getStatusIncome: function () { //вычисление уровня дохода
        if (appData.budgetDay >= 800) return ("Высокий уровень дохода");


        else if ((appData.budgetDay >= 300)) return ("Средний уровень дохода");

        else if ((appData.budgetDay >= 0)) return ("Низкий уровень дохода");

        else return ("Что то пошло не так");

    },
    refreshPeriod: function () {
        appData.periodAmount = periodSelect.value;
        let temp = '<div class="title period-amount">' + appData.periodAmount + '</div>';

        periodAmount.innerHTML = temp;
    },
    calcPeriod: function () {
        return (appData.budgetMonth * periodSelect.value);
    },
    getCheckDigit: function (ask, digit) {
        let checkDigit;
        do {
            checkDigit = prompt(ask, digit);
        }
        while (isNaN(checkDigit) || checkDigit == '' || checkDigit == null);
        return checkDigit;
    },
    getCheckText: function (ask, text) {
        let checkText;
        do {
            checkText = prompt(ask, text);
        }
        while (!isNaN(checkText) || checkText == '' || checkText == null);
        return checkText;
    },
};
start.addEventListener('click', appData.start);
incomePlus.addEventListener('click', appData.addIncomeBlock);
expensesPlus.addEventListener('click', appData.addExpensesBlock);
periodSelect.addEventListener('change', appData.refreshPeriod);


let eventFunc = function(event){
    console.log(event.type);
    console.log(event.target.value);
    //periodAmount.value = (event.target.value)
};
appData.refreshPeriod();


//document.querySelector('.period-select').addEventListener('change', refreshPeriod);


// if (appData.budgetMonth  >= 0){
//     console.log("Цель будет достигнута за " + Math.ceil(appData.getTargetMonth()) + ' месяца');
// } else {
//     console.log("Цель не будет достигнута");
// }

