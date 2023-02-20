/* eslint-disable linebreak-style */
/* eslint-disable max-classes-per-file */
/* eslint-disable no-unused-vars */

const form = document.querySelector('#form');
const addBtn = document.querySelector('#addBtn');
const bookContainer = document.getElementById('displayBook');
const allBook = JSON.parse(localStorage.getItem('allBook')) || [];
const { title, author } = form.elements;

class Book {
  constructor(id, title, author) {
    this.id = id;
    this.title = title;
    this.author = author;
  }
}

class Library {
  constructor() {
    this.books = allBook;
  }

  add(title, author) {
    const idRandom = Math.floor(Math.random() * 100000);
    const bookInfo = new Book(idRandom, title.value, author.value);
    this.books.push(bookInfo);
    localStorage.setItem('allBook', JSON.stringify(this.books));
  }
}

const library = new Library();
form.addEventListener('submit', () => {
  library.add(title, author);
});

const displayBook = (books) => {
  books.forEach((book) => {
    const title = book.title[0].toUpperCase() + book.title.slice(1);
    const author = book.author[0].toUpperCase() + book.author.slice(1);
    const div = document.createElement('div');
    div.classList.add('items');
    div.innerHTML = `
        <p> "${title}" by <strong>${author}</strong></p>
        <button onclick="library.remove(${book.id})" type="button" >Remove</button>
        `;
    bookContainer.appendChild(div);
  });
};

addBtn.addEventListener('click', displayBook(allBook));