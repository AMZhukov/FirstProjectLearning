
let lang = prompt("Выберите язык, ru или en. Choose language, ru or en"),
  daysRu = "Понедельник, Вторник, Среда, Четверг, Пятница, Суббота, Воскресенье",
  daysEn = "Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday",
  arr = new Map([
    ['ru', daysRu],
    ['en', daysEn]
  ]),
  namePerson = prompt("Введите Ваше имя");

if (lang == "ru") console.log(daysRu);
else if (lang == "en") console.log(daysRu);

switch(lang) {
  case "ru":
    console.log(daysRu)
    break;
  case "en":
    console.log(daysEn)
    break; 
  }
 
console.log(arr.get(lang));
console.log(namePerson == 'Артём' ? "директор" : (namePerson == 'Максим' ? "преподаватель" : "студент"));