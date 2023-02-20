const form = document.querySelector('#form');
const title = document.querySelector('#title');
const author = document.querySelector('#author');
const addBtn = document.querySelector('#addBtn');
const bookContainer = document.getElementById('displayBook');
let allBooks;

const displayBooks = () => {
  if (localStorage.getItem('allBooks') == null) {
    allBooks = [];
  } else {
    allBooks = JSON.parse(localStorage.getItem('allBooks'));
  }

  allBooks.forEach((book) => {
    bookContainer.innerHTML += `
        <div>
        <p>${book.title}</p>
        <p>${book.author}</p>
        <button onclick="remove(${book.id})">Remove</button>
        <hr />
        </div>`;
  });
};

const add = (Title, Author) => {
  const idRandom = Math.floor(Math.random() * 100000);
  allBooks.push({ id: idRandom, title: Title, author: Author });
  localStorage.setItem('allBooks', JSON.stringify(allBooks));
  displayBooks();
};

window.addEventListener('DOMContentLoaded', () => {
  displayBooks();
});

form.addEventListener('submit', () => {
  const titleValue = title.value;
  const authorValue = author.value;
  add(titleValue, authorValue);
});

const remove = (id) => {
  const removedBooks = allBooks.filter((book) => book.id === id);
  if (removedBooks.length === 1) {
    allBooks = allBooks.filter((book) => book.id !== id);
    localStorage.setItem('allBooks', JSON.stringify(allBooks));
  }
  window.location.reload();
};

addBtn.addEventListener('click', displayBooks);
