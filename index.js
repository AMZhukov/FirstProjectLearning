let money = null,
    income = 'freelance',
    addExpenses = null,
    deposit = null,
    mission = 25000,
    period = 12,
    spend = [];
    descrSpend = [],
    budgetMonth = null,
    budgetDay = null;


money = prompt("Ваш месячный доход?");
addExpenses = prompt("Перечислите возможные расходы за рассчитываемый период через запятую");
deposit = confirm("Есть ли у вас депозит в банке?");
descrSpend[0] = prompt("Какие обязательные ежемесячные расходы у вас есть?");
spend[0] = prompt("Во сколько это обойдется?");
descrSpend[1] = prompt("Какие обязательные ежемесячные расходы у вас есть?");
spend[1] = prompt("Во сколько это обойдется?");

budgetMonth = money - (+spend[0]) - (+spend[1]);
period = Math.ceil(mission / budgetMonth);
budgetDay = Math.floor(budgetMonth / 30);

console.log("addExpenses:", addExpenses.split(', '));
console.log('Тип данных money —', typeof money);
console.log('Тип данных income —', typeof income);
console.log('Тип данных deposit —', typeof deposit);
console.log("доход за месяц", budgetMonth);
console.log("Период для накопления", period);
console.log('Дневной бюджет =', budgetDay);

if (budgetDay >= 800) console.log("Высокий уровень дохода");
else if ((budgetDay >= 300) || (budgetDay < 800)) console.log("Средний уровень дохода");
else if ((budgetDay >= 0) || (budgetDay < 300)) console.log("Низкий уровень дохода");
else console.log("Низкий уровень дохода");
