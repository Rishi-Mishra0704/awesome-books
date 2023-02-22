/* eslint-disable linebreak-style */
/* eslint-disable max-classes-per-file */
/* eslint-disable no-unused-vars */
const form = document.querySelector('#form');
const addBtn = document.querySelector('#addBtn');
const bookContainer = document.getElementById('displayBook');
const allBook = JSON.parse(localStorage.getItem('allBook')) || [];
const titleHead = document.querySelector('.title');
const contact = document.querySelector('.contact-info');
const contactBtn = document.getElementById('contact-btn');
const { title, author } = form.elements;
const listBtn = document.getElementById('list-btn');
const addNewBtn = document.getElementById('add-new-btn');
const addBookSection = document.getElementById('addBookSection');

/* For Navigation */

function navigation() {
  contactBtn.addEventListener('click', () => {
    contact.style.display = 'flex';
    bookContainer.style.display = 'none';
    addBookSection.style.display = 'none';
    titleHead.style.display = 'none';
  });
  listBtn.addEventListener('click', () => {
    bookContainer.style.display = 'block';
    addBookSection.style.display = 'none';
    contact.style.display = 'none';
  });
  addNewBtn.addEventListener('click', () => {
    addBookSection.style.display = 'flex';
    bookContainer.style.display = 'none';
    contact.style.display = 'none';
    titleHead.style.display = 'none';
  });
}
navigation();

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

/* for adding and removing books  */

const displayBook = (books) => {
  // clear the container
  bookContainer.innerHTML = '';
  books.forEach((book) => {
    const div = document.createElement('div');
    div.classList.add('items');
    div.innerHTML = `
        <p> "${book.title}" by <strong>${book.author}</strong></p>
        <button onclick="library.remove(${book.id})" type="button" >Remove</button>
        `;
    bookContainer.appendChild(div);
  });
};

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
    // update the UI
    displayBook(this.books);
  }

  remove(id) {
    const removedBooks = this.books.filter((book) => book.id === id);
    if (removedBooks.length === 1) {
      this.books = this.books.filter((book) => book.id !== id);
      localStorage.setItem('allBook', JSON.stringify(this.books));
      // update the UI

      displayBook(this.books);
    }
  }
}

const library = new Library();

// update the UI on page load

displayBook(allBook);

form.addEventListener('submit', (event) => {
  event.preventDefault();
  library.add(title, author);
  form.reset();
});
