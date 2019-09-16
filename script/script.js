'use strict'
//joining
let start = document.getElementById('start'),
    cancel = document.getElementById('cancel'),
    btnIncAdd = document.getElementsByTagName('button')[0],
    btnExpAdd = document.getElementsByTagName('button')[1],
    checkBox = document.querySelector('#deposit-check'),
    addIncItem = document.querySelectorAll('.additional_income-item'),
    budgetDayValue = document.querySelector('.result-budget_day input'),
    expensesMonthValue = document.querySelector('.result-expenses_month input'),
    addIncomeValue = document.querySelector('.result-additional_income input'),
    addExpValue =  document.querySelector('.result-additional_expenses input'),
    incPeriodValue = document.querySelector('.result-income_period input'),
    targetMonthValue = document.querySelector('.result-target_month input'),
    salaryAmount = document.querySelector('.salary-amount'),
    expensesItems = document.querySelectorAll('.expenses-items'),
    addExpItem = document.querySelector('.additional_expenses-item'),
    targetAmount = document.querySelector('.target-amount'),
    periodSelect = document.querySelector('.period-select'),
    periodAmount = document.querySelector('.period-amount'),
    budgetMonthValue = document.querySelector('.result-budget_month input'),
    incomeItems = document.querySelectorAll('.income-items'),
    depositBank = document.querySelector('.deposit-bank'),
    depositAmount = document.querySelector('.deposit-amount'),
    depositPercent = document.querySelector('.deposit-percent');


const AppData = function () {
    this.budget = 0;
    this.budgetDay = 0;
    this.budgetMonth = 0;
    this.income = {};
    this.incomeMonth = 0;
    this.addIncome = [];
    this.expenses = {};
    this.expensesMonth = 0;
    this.deposit = false;
    this.percentDeposit = 0;
    this.moneyDeposit = 0;
    this.addExpenses = [];


};

AppData.prototype.check = function () {
    if (salaryAmount.value != '') {
        start.removeAttribute('disabled');
    }
};

AppData.prototype.start = function () {
    if (salaryAmount.value === '') {
        start.setAttribute('disabled', 'true');
        return;
    }
    let allInput = document.querySelectorAll('.data input[type = text]');
        allInput.forEach( (item) => {
            item.setAttribute('disabled', 'true');
        });
        btnExpAdd.setAttribute('disabled', 'true');
        btnIncAdd.setAttribute('disabled', 'true');
        start.style.display = 'none';
        cancel.style.display = 'block';

        this.budget = +salaryAmount.value;
        this.getExpenses();
        this.getIncome();
        this.getExpensesMonth();
        // this.getAddExpenses();
        // this.getAddIncome();
        console.log(this.addExpenses);
        this.getAdd(addExpItem);
        this.getAdd(addIncItem);
        this.getInfoDeposit();
        this.getBudget();
        this.getInfoDeposit();
        this.getStatusIncome();
        this.showResult();

};


AppData.prototype.showResult = function () {
    budgetMonthValue.value = this.budgetMonth;
    budgetDayValue.value = this.budgetDay;
    expensesMonthValue.value = this.expensesMonth;
    addExpValue.value = this.addExpenses.join(', ');
    addIncomeValue.value = this.addIncome.join(', ');
    targetMonthValue.value = Math.ceil(this.getTargetMonth());
    incPeriodValue.value = this.calcPeriod();
    periodSelect.addEventListener('change', () => {
        incPeriodValue.value = this.calcPeriod();
    });

};

AppData.prototype.addBlock = function(items, btnAdd, type) {

    let cloneItem = items[0].cloneNode(true);
    items[0].parentNode.insertBefore(cloneItem, btnAdd);
    items = document.querySelectorAll(`.${type}-items`);

    if (items.length === 3) {
        btnAdd.style.display = 'none';
    }
};
AppData.prototype.getExpenses = function () {
    expensesItems.forEach( (item) => {
        let itemExpenses = item.querySelector('.expenses-title').value;
        let cashExpenses = item.querySelector('.expenses-amount').value;
        if (itemExpenses != '' && cashExpenses != '') {
            this.expenses[itemExpenses] = cashExpenses;
        }
    });
};

AppData.prototype.getIncome = function () {
    incomeItems.forEach( (item) => {
        let itemIncome = item.querySelector('.income-title').value;
        let cashIncome = item.querySelector('.income-amount').value;

        if (itemIncome != '' && cashIncome != '') {
            this.income[itemIncome] = cashIncome;
        }
    });
    for (let key in this.income) {
        this.incomeMonth += +this.income[key];
        console.log(this.incomeMonth);
    }
};

AppData.prototype.getAdd = function (addItem) {
    let temp = null;
    if (Object.keys(addItem).length < 2) {
        temp = addItem.value.split(',');
        temp.forEach((item) => {
            let itemValue = item.trim();
            if (itemValue != '') {
                this.addExpenses.push(itemValue);
            }
        });
    }
    else {
        temp = addItem;
        temp.forEach((item) => {
            let itemValue = item.value.trim();
            if (itemValue != '') {
                this.addIncome.push(itemValue);
            }
        });
    }
};

AppData.prototype.getExpensesMonth = function () {
    for (let key in this.expenses) {
        this.expensesMonth += +this.expenses[key];
    }
};

AppData.prototype.getBudget = function () {
    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth + (this.moneyDeposit * this.percentDeposit)/12;
    this.budgetDay = Math.floor(this.budgetMonth / 30);

};

AppData.prototype.getTargetMonth = function () {
    return targetAmount.value / this.budgetMonth;

};

AppData.prototype.getStatusIncome = function () {
    if (this.budgetDay >= 800) {
        return ('Высокий уровень дохода');
    } else if (this.budgetDay >= 300) {
        return ('Средний уровень дохода');
    } else if (this.budgetDay >= 0) {
        return ('Низкий уровень дохода');
    } else if (this.budgetDay < 0) {
        return ('Что то пошло не так');
    }
};

AppData.prototype.getInfoDeposit = function () {
    if (this.deposit) {
        this.percentDeposit = depositPercent.value;
        this.moneyDeposit = depositAmount.value;
    }
};

AppData.prototype.calcPeriod = function () {
    return this.budgetMonth * periodSelect.value;

};
AppData.prototype.reset = function () {

    const inputTextData = document.querySelectorAll('.data input[type = text]'),
        resultInputAll = document.querySelectorAll('.result input[type = text');

    inputTextData.forEach( (elem) => {
        elem.value = '';
        elem.removeAttribute('disabled');
        periodSelect.value = '0';
        periodAmount.innerHTML = periodSelect.value;
    });
    resultInputAll.forEach( (elem) => {
        elem.value = '';
    });

    for (let i = 1; i < incomeItems.length; i++) {
        incomeItems[i].parentNode.removeChild(incomeItems[i]);
        btnIncAdd.style.display = 'block';
    }
    for (let i = 1; i < expensesItems.length; i++) {
        expensesItems[i].parentNode.removeChild(expensesItems[i]);
        btnExpAdd.style.display = 'block';
    }

    this.budget = 0;
    this.budgetDay = 0;
    this.budgetMonth = 0;
    this.income = {};
    this.addIncome = [];
    this.expenses = [];
    this.expensesMonth = 0;
    this.deposit = false;
    this.percentDeposit = 0;
    this.moneyDeposit = 0;
    this.addExpenses = [];

    cancel.style.display = 'none';
    start.style.display = 'block';
    btnExpAdd.removeAttribute('disabled');
    btnIncAdd.removeAttribute('disabled');
    checkBox.checked = false;
};

AppData.prototype.checkBox = function () {
    if(checkBox.checked){
        depositBank.style.display = 'inline-block';
        depositAmount.style.display = 'inline-block';
        appData.deposit = 'true';
        depositBank.addEventListener('change', function() {
            let selectIndex = this.options[this.selectedIndex].value;
            if(selectIndex === 'other'){
                depositPercent.style.display = 'inline-block';
                depositPercent.value = '';
                depositPercent.disabled = false;
            } else {
                depositPercent.style.display = 'none';
                depositPercent.value = selectIndex;
            }
        })
    } else {
        depositBank.style.display = 'none';
        depositAmount.style.display = 'none';
        depositAmount.value = ''; // also maybe used value none
        appData.deposit = 'false';
    }
};

AppData.prototype.eventListeners = function () {
    start.addEventListener('click', this.start.bind(this));
    btnExpAdd.addEventListener('click', () => {
        this.addBlock(expensesItems, btnExpAdd, `expenses`);
    });
    btnIncAdd.addEventListener('click', () => {
        this.addBlock(incomeItems, btnIncAdd, `income`);
    });
    salaryAmount.addEventListener('keyup', this.check);
    cancel.addEventListener('click', this.reset.bind(this));
    checkBox.addEventListener('change', this.checkBox.bind(this));


    periodSelect.addEventListener('change', function () {
        periodAmount.innerHTML = periodSelect.value;
    });

    const addExp = [];
    for (let i = 0; i < appData.addExpenses.length; i++) {
        let element = appData.addExpenses[i].tirm();
        element = element.charAt(0).toUpperCase() + element.substring(1).toLowerCase();
        addExp.push(element);
    }

};




const appData = new AppData();
appData.eventListeners();


