'use strict'
//joining
let start = document.getElementById('start'),
    cancel = document.getElementById('cancel'),
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
        this.budget = +salaryAmount.value;

        this.getExpenses();
        this.getIncome();
        this.getExpensesMonth();
        this.getAddExpenses();
        this.getAddIncome();
        this.getIncomeMonth();
        this.getBudget();

        this.showResult();
    },
    cancel: function() {
        let inputText = document.querySelectorAll('input[type="text"]');

        inputText.forEach(function (item) {
            item.removeAttribute('readonly');
            item.value = '';
        });
        document.querySelector('#start').style.display='block';
        document.querySelector('#cancel').style.display='none';
    },
    showResult: function(){
        budgetMonthValue.value = this.budgetMonth;
        budgetDayValue.value = this.budgetDay;
        expensesMonthValue.value = this.expensesMonth;
        additionalExpensesValue.value = this.addExpenses.join(', ');
        additionalIncomeValue.value = this.addIncome.join(', ');
        targetMonthValue.value = Math.ceil(this.getTargetMonth());

        this.updateCalcPeriod();
        periodSelect.addEventListener('change', this.updateCalcPeriod.bind(appData));
        this.delAttribute();
        this.hideVisibleButton();

    },

    updateCalcPeriod: function (){
        incomePeriodValue.value = this.calcPeriod();
    },
    delAttribute: function () {
        salaryAmount.setAttribute("readonly", "");
        this.delAttributeForEach(incomeTitle); //Здесь иначе никак не получается. Т.к. тут ещё у родителя такой же класс. Из-за этого только родитель блокировку всё остальное
        this.delAttributeForEach(incomeAmount);
        this.delAttributeForEach(expensesTitle);
        this.delAttributeForEach(additionalIncomeItem);
        this.delAttributeForEach(expensesTitle);
        this.delAttributeForEach(expensesAmount);
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
                this.expenses[itemExpenses] = cashExpenses;
            }
        }, this);
    },
    getAddExpenses: function() {
        let getExpenses = additionalExpensesItem.value.split(',');
        getExpenses.forEach(function (item) {
            item = item.trim();
            if (item !==''){
                this.addExpenses.push(item);
            }
        }, this );
    },
    getIncome: function(){
        incomeItem.forEach(function (item) {
            let itemIncome = item.querySelector('.income-title').value;
            let cashIncome = item.querySelector('.income-amount').value;
            if(itemIncome !== '' && cashIncome !== ''){
                this.income[itemIncome] = cashIncome;
            }
        }, this );
    },
    getAddIncome: function(){
        additionalIncomeItem.forEach(function(item){
            let itemValue = item.value.trim();
            if (itemValue !== ''){
                this.addIncome.push(itemValue);
            }
        }, this );
    },
    getInfoDeposit: function () {
        this.deposit = confirm("Есть ли у вас депозит в банке?");
        if (this.deposit) {
            this.percentDeposit = this.getCheckDigit('Какой годовой процент?', '10');
            this.moneyDeposit = this.getCheckDigit('Какая сумма заложена?', 100000);
        }
    },
    getExpensesMonth: function () { //Вычисление суммарных расходов в месяц

        for (let key in this.expenses) {
            this.expensesMonth += +this.expenses[key];
        }

    },
    getIncomeMonth: function () { //calculated sum income, additional salary
        for (let key in this.income) {
            this.incomeMonth += +this.income[key];
        }

    } ,
    getBudget: function () { //вычисление бюджета на месяц и день
        this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
        this.budgetDay = Math.floor(this.budgetMonth / 30);
    },
    getTargetMonth: function () { //вычисление за сколько накопятся деньги
        return (targetAmount.value / this.budgetMonth);
    },
    getStatusIncome: function () { //вычисление уровня дохода
        if (this.budgetDay >= 800) return ("Высокий уровень дохода");


        else if ((this.budgetDay >= 300)) return ("Средний уровень дохода");

        else if ((this.budgetDay >= 0)) return ("Низкий уровень дохода");

        else return ("Что то пошло не так");

    },
    refreshPeriod: function () {

        this.periodAmount = periodSelect.value;
        let temp = '<div class="title period-amount">' + this.periodAmount + '</div>';

        periodAmount.innerHTML = temp;
    },
    calcPeriod: function () {
        return (this.budgetMonth * periodSelect.value);
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
start.addEventListener('click', appData.start.bind(appData));
cancel.addEventListener('click', appData.cancel.bind(appData));
incomePlus.addEventListener('click', appData.addIncomeBlock.bind(appData));
expensesPlus.addEventListener('click', appData.addExpensesBlock.bind(appData));
periodSelect.addEventListener('change', appData.refreshPeriod.bind(appData));


let eventFunc = function(event){
    console.log(event.type);
    console.log(event.target.value);
    //periodAmount.value = (event.target.value)
};
appData.refreshPeriod.bind(appData);


//document.querySelector('.period-select').addEventListener('change', refreshPeriod);


// if (appData.budgetMonth  >= 0){
//     console.log("Цель будет достигнута за " + Math.ceil(appData.getTargetMonth()) + ' месяца');
// } else {
//     console.log("Цель не будет достигнута");
// }

