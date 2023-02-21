/* eslint-disable linebreak-style */
/* eslint-disable max-classes-per-file */
/* eslint-disable no-unused-vars */

const form = document.querySelector('#form');
const addBtn = document.querySelector('#addBtn');
const bookContainer = document.getElementById('displayBook');
const allBook = JSON.parse(localStorage.getItem('allBook')) || [];
const { title, author } = form.elements;

/*  for showing time and date */
function updateTime() {
  const today = new Date();
  const options = { month: 'short', day: 'numeric', year: 'numeric' };
  const date = today.toLocaleString('en-US', options);
  const time = today.toLocaleTimeString();
  document.getElementById('date-time').innerHTML = `${date} , ${time}`;
}
updateTime();
setInterval(updateTime, 1000);

/*   */
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

  remove(id) {
    const removedBooks = this.books.filter((book) => book.id === id);
    if (removedBooks.length === 1) {
      this.books = this.books.filter((book) => book.id !== id);
      localStorage.setItem('allBook', JSON.stringify(this.books));
    }
    window.location.reload();
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
