const form = document.querySelector('#form');
const title = document.querySelector('#title');
const author = document.querySelector('#author');
const addBtn = document.querySelector('#addBtn');
const bookLocal = JSON.parse(localStorage.getItem('bookStr'));


addBtn.addEventListener('click',add);