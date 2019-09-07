'use strict';
let body = document.querySelector('body'),
    books = document.querySelector('.books'), //Create selector to collection, for transport elements.
    bookOne = books.querySelector('.book'), //bookOne = books.querySelector('.book');// Create selector to elements, for transport
    chapBook = bookOne.querySelectorAll('li'), // Create selector to inside elements, tor transport inside li elements
    elemH2 = document.querySelectorAll('h2'),
    adv = document.querySelector('.adv'), // Create selector to advertising
    elemUl = document.querySelectorAll('ul'); // Create selector to UL, tor transport inside il elements



//Восстановить порядок книг.
//books.insertBefore(book[0], book[2]); // transport null and first elements.
/*books.insertBefore(book[2], book[6]); // transport second and last elements.
books.insertBefore(book[3], book[5]); // transport third and fourth elements.

//change background image.
body.setAttribute('style', 'background-image: url(./image/you-dont-know-js.jpg)'); 

//Замена пропопипов на прототипов
document.querySelectorAll('h2')[2].innerHTML = '<a href="https://github.com/azat-io/you-dont-know-js-ru/blob/master/this%20%26%20object%20prototypes/README.md#you-dont-know-js-this--object-prototypes"\
target="_blank">Книга 3. this и Прототипы Объектов</a>'; //chage h2.

body.removeChild(adv); // This is a function to remove advertising.

//Сортировка глав, внутри книги
/*
document.querySelectorAll('ul')[1].insertBefore(elemLi[2], elemLi[10]);
document.querySelectorAll('ul')[1].insertBefore(elemLi[6], elemLi[4]); //sort elements of li
document.querySelectorAll('ul')[1].insertBefore(elemLi[8], elemLi[4]);
document.querySelectorAll('ul')[4].insertBefore(elemLi[55], elemLi[48]); //sort elements of li
document.querySelectorAll('ul')[4].insertBefore(elemLi[48], elemLi[51]);
document.querySelectorAll('ul')[4].insertBefore(elemLi[51], elemLi[54]);*/
//console.log(document.querySelectorAll('ul')[4]);
//console.log(document.querySelectorAll('li'));
/*
chapBook[1].insertBefore(elemLi[2], elemLi[10]);
chapBook[1].insertBefore(elemLi[6], elemLi[4]); //sort elements of li
chapBook[1].insertBefore(elemLi[8], elemLi[4]);
*/bookOne.insertBefore(chapBook[0], chapBook[3]);/* //sort elements of li
//chapBook[4].insertBefore(elemLi[48], elemLi[51]);
//chapBook[4].insertBefore(elemLi[51], elemLi[54]);

*/