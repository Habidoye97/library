let myLibrary = [];

function Book(title, author, pages, status) {
  this.title = title
  this.author = author
  this.pages = pages 
  this.status = status
}

function addBookToLibrary(title, author, pages, status) {
  const book = new Book(title, author, pages, status);
  myLibrary.push(book)
  
}

function getForminput() {
  const form = document.querySelector('form');
  const inputTitle = document.querySelector('#book-title');
  const inputAuthor = document.querySelector('#book-name');
  const inputPages = document.querySelector('#book-pages')
  const statusCheck = document.querySelector('status')
  if(inputTitle.value !== '' & inputAuthor.value !== ' ' & inputPages.value !== '' & inputPages.value !== '' & inputPages.value >0) {
    if(statusCheck.checked) {
      addBookToLibrary(inputTitle.value, inputAuthor.value, inputPages.value, true)
    } else {
      addBookToLibrary(inputTitle.value, inputAuthor.value, inputPages.value, true)
    }
    form.reset()
  }
}

function showBooksinLibrary () {
  const addedBooks = document.querySelector('.added-books')
  addedBooks.textContent = '';
  for (let i = 0; i < myLibrary.length; i++) {
    const bookContainer = document.createElement('div')
    bookContainer.classList.add('bookconatiner');
    addedBooks.appendChild(bookContainer);
    const bookTitle = document.createElement('h2');
    bookTitle.textContent = myLibrary[i].title
    bookContainer.appendChild(bookTitle);
    const bookby = document.createElement('p');
    bookby.textContent = "by";
    bookContainer.appendChild(bookby);
    const bookAuthor = document.createElement('h3')
    bookAuthor.textContent = myLibrary[i].author;
    bookContainer.appendChild(bookAuthor);
    const bookPages = document.createElement('h4')
    bookPages.textContent = myLibrary[i].pages
    bookContainer.appendChild(bookPages);
    const bookStatusbtn = document.createElement('button')
    if (myLibrary[i].status === true) {
      bookStatusbtn.textContent = "READ";
    } else {
      bookStatusbtn.textContent = "NOT READ"
    }
    bookContainer.appendChild(bookStatusbtn)
    const bookDelete = document.createElement('button');
    bookDelete.textContent = "DELETE";
    bookContainer.appendChild(bookDelete)
  }
}

const inputContainer = document.querySelector('.col-input-container')
const addBookbtn = document.getElementById('add')
addBookbtn.addEventListener('click', function() {
  inputContainer.style.display = 'flex'
});

inputContainer.addEventListener('click', function(){
  inputContainer.style.dispay = 'none'
})