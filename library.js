let myLibrary = [];

function Book(title, author, pages, status) {
  this.id = JSON.parse(localStorage.getItem('books')).length + 1;
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
  const checkBooks = JSON.parse(localStorage.getItem('books'));
  for (i=0; i<checkBooks.length; i++){
    console.log(checkBooks[i].title);
    if (checkBooks[i].title === inputTitle.value && checkBooks[i].author === inputAuthor.value) {
      alert("The Book Already Exist in the Library")
      form.reset()
      return
    }
  }
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
      bookStatusbtn.style.backgroundColor = "pink"
    } else {
      bookStatusbtn.textContent = "NOT READ"
      bookStatusbtn.style.backgroundColor = "red"
    }
    bookContainer.appendChild(bookStatusbtn)
    bookStatusbtn.addEventListener('click', function() { changeStatus(myLibrary[i].id) })
    const bookDelete = document.createElement('button');
    bookDelete.textContent = "DELETE";
    bookDelete.setAttribute("id", "delete-btn");
    bookDelete.style.backgroundColor = 'red'
    bookContainer.appendChild(bookDelete)
    bookDelete.addEventListener('click', function() {deleteBook(myLibrary[i].id)});
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

const submit = document.getElementById('submitbtn');
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

function changeStatus(bookId) {
  console.log(bookId);
  const storedBooks = JSON.parse(localStorage.getItem('books'));
  // find the affected book
  const selectedBook = storedBooks.find(item => item.id === bookId);
  console.log(selectedBook);
  // update the status or any other property
  selectedBook.status = selectedBook.status === true ? false : true;
  // effect changes on local storage    
  console.log(selectedBook);
  myLibrary = storedBooks.map(function(book) {
    if (book.id === bookId) { return selectedBook; } else { return book; }
  });
  localStorage.setItem('books', JSON.stringify(myLibrary));
  showBooksinLibrary();
}

function deleteBook(bookId) {
  const storedBooks = JSON.parse(localStorage.getItem('books'));
  const selectedBook = storedBooks.find(item => item.id === bookId);
  const index = storedBooks.indexOf(selectedBook)
  if (index > -1) {
     const removedBook = storedBooks.splice(index, 1)
     myLibrary = storedBooks;
  }
  localStorage.setItem('books', JSON.stringify(myLibrary));
  showBooksinLibrary();
}

const closeForm = document.getElementById('form-close')
closeForm.addEventListener('click', function(){
  inputContainer.style.display = 'none';
})

showBooksinLibrary();
showLibraryInfo();
