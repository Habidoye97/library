let myLibrary = [];

function Book(title, author, pages, status) {
  this.title = title
  this.author = author
  this.pages = pages 
  this.status = status
}

if (localStorage.getItem('books') === null) {
  myLibrary = [];
} else {
  const booksFromStorage = JSON.parse(localStorage.getItem('books'));
  myLibrary = booksFromStorage;
}

function getForminput() {
  const form = document.querySelector('.form');
  const inputTitle = document.querySelector('#book-title');
  const inputAuthor = document.querySelector('#book-name');
  const inputPages = document.querySelector('#book-pages')
  const statusCheck = document.querySelector('.status')
  if(inputTitle.value !== '' & inputAuthor.value !== ' ' & inputPages.value !== '' & inputPages.value !== '' & inputPages.value > 0) {
    if(statusCheck.checked) {
      addBookToLibrary(inputTitle.value, inputAuthor.value, inputPages.value, true)
    } else {
      addBookToLibrary(inputTitle.value, inputAuthor.value, inputPages.value, false)
    }
    form.reset()
  }
  
}

function showBooksinLibrary () {
  localStorage.setItem('books', JSON.stringify(myLibrary));
  showLibraryInfo();
  const addedBooks = document.querySelector('.added-books')
  addedBooks.textContent = '';
  for (let i = 0; i < myLibrary.length; i++) {
    const bookContainer = document.createElement('div')
    bookContainer.classList.add('bookcontainer');
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
    bookPages.textContent = myLibrary[i].pages + " pages";
    bookContainer.appendChild(bookPages);
    const bookStatusbtn = document.createElement('button')
    bookStatusbtn.setAttribute("id", "status-btn")
    if (myLibrary[i].status === true) {
      bookStatusbtn.textContent = "READ";
    } else {
      bookStatusbtn.textContent = "NOT READ"
    }
    bookContainer.appendChild(bookStatusbtn)
    bookStatusbtn.addEventListener('click', changeStatus)
    const bookDelete = document.createElement('button');
    bookDelete.textContent = "DELETE";
    bookContainer.appendChild(bookDelete)
    bookDelete.addEventListener('click', removeBook)
  }
}

function showLibraryInfo () {
  const totalBook = document.getElementById('total-books');
  const bookRead = document.getElementById('book-read');
  const bookUnread = document.getElementById('book-unread');
  let readCount = 0;
  let unreadCount = 0;
  bookRead.textContent = 0;
  bookUnread.textContent = 0;
  totalBook.textContent = myLibrary.length;
  for (let i = 0; i < myLibrary.length; i++) {
    if(myLibrary[i].status === true) {
      readCount += 1;
      bookRead.textContent = readCount;
    }else {
      unreadCount += 1;
      bookUnread.textContent = unreadCount;
    }
  }
}

function addBookToLibrary(title, author, pages, status) {
  const book = new Book(title, author, pages, status);
  myLibrary.push(book)
  showBooksinLibrary()
}

const inputContainer = document.getElementById('col-input-container')
const addBookbtn = document.getElementById('add')
addBookbtn.addEventListener('click', function() {
  inputContainer.style.display = 'flex'
});

const submit = document.querySelector('#submitbtn');
submit.addEventListener('click', function() {
  getForminput()
  inputContainer.style.display = 'none';
});


const removeAll = document.getElementById('remove-all');
removeAll.addEventListener('click', function() {
  let checkRemoveAll = confirm('Are you sure you want to DELETE all books in the Library')
  if (checkRemoveAll === true) {
    localStorage.removeItem('books')
    myLibrary.length = 0;
    showBooksinLibrary()
    showLibraryInfo()
  }else {
    return
  }
})

function removeBook() {
  
  const div = EventTarget.parentNode
  div.style.display = 'none'
}

function changeStatus() {
  if (bookStatusbtn.textContent === "READ") {
    bookStatusbtn.textContent = "NOT READ"
  }
}

showBooksinLibrary();
showLibraryInfo();
