const form = document.querySelector('#form');
const title = document.querySelector('#title');
const author = document.querySelector('#author')
const addBtn = document.querySelector('#addBtn');
const bookLocal = JSON.parse(localStorage.getItem('bookStr'));
const bookContainer = document.getElementById('displayBook')


const newBooks = [{
  title: title.value,
  author: author.value
}]

addBtn.addEventListener('click',(event)=>{
    newBooks.forEach((newBook) =>{
        bookContainer.innerHTML = `
      <p class = "title">${newBook.title}</p>  
      <p class = "author">${newBook.author}</p>
      <button type = "button" class = "remove" onClick = "remove()">remove</button>
  `
  console.log(newBook)
  console.log(newBooks)
    })
    event.preventDefault()
    
})