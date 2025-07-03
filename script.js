let myLibrary = [];

function Book(title, author, pages, finishDate, id) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.finishDate = finishDate;
  this.id = id;
}

function addBookToLibrary(title, author, pages, finishDate, id) {
  myLibrary.push(new Book(title, author, pages, finishDate, id));
}

function renderLibrary() {
  books.innerHTML = ""; // Clear existing books

  for (const book of myLibrary) {
    createBook(book);
  }
}

const dialog = document.querySelector("dialog");
const addBook = document.querySelector(".add-book");
const close = document.querySelector("dialog img");
const closeEdit = document.querySelector(".edit img");
const books = document.querySelector(".books");
const form = document.querySelector("form");
form.addEventListener("submit", submit);

addBookToLibrary("The Hunger Games", "Suzanne Collins", 374, "10-3-21", "id");


for(const book of myLibrary) {
    createBook(book);
}

function createBook(bookObject) {
  const book = document.createElement("div");
  book.classList.add("book");
  const bookHeader = document.createElement("div");
  
  bookHeader.classList.add("book-header");

  const bookBtns = document.createElement("div");

  bookBtns.classList.add("book-btns");
  
  const edit = document.createElement("button");
  edit.textContent = "Edit";
  edit.classList.add("edit-btn");
  bookBtns.appendChild(edit);
  
  const deleteBtn = new Image(15, 15);
  deleteBtn.src = "icons/close.svg";
  deleteBtn.classList.add("delete-btn");
  bookBtns.appendChild(deleteBtn);
  
  deleteBtn.addEventListener("click", () => {
    // books.removeChild(book);
    myLibrary = myLibrary.filter(book => book.id !== bookObject.id);
    renderLibrary();
    console.log(myLibrary);
  });
  bookHeader.appendChild(bookBtns);
  const titleDiv = document.createElement("div");
  titleDiv.textContent = bookObject.title;
  titleDiv.classList.add("title");
  bookHeader.appendChild(titleDiv);
  book.appendChild(bookHeader);
  const bookInfo = document.createElement("div");
  const authorDiv = document.createElement("div");
  authorDiv.innerHTML = "Author:<br><strong>" + bookObject.author + "</strong>";
  bookInfo.appendChild(authorDiv);
  const pagesDiv = document.createElement("div");
  pagesDiv.innerHTML = "Pages:<br><strong>" + bookObject.pages + "</strong>";
  bookInfo.style.display = "flex";
  bookInfo.style.flexDirection = "column"
  bookInfo.style.gap = "10px";
  bookInfo.appendChild(pagesDiv);
  book.appendChild(bookInfo);
  const readDiv = document.createElement("div");
  bookObject.finishDate !== "" ? readDiv.textContent = "Finished on " + bookObject.finishDate : readDiv.textContent = "Still reading..."
  book.appendChild(readDiv);

  edit.addEventListener("click", () => editBook(bookObject));
  books.appendChild(book);
}



function submit(event) { //creates a new book using the input from form
  
  const title = document.querySelector("#title").value;
  const author = document.querySelector("#author").value;
  const pages = document.querySelector("#pages").value;
  const finishDate = document.querySelector("#finish-date").value;
  const id = self.crypto.randomUUID();
  addBookToLibrary(title, author, pages, finishDate, id); //Adds to array
  console.log(myLibrary);
  createBook(myLibrary[myLibrary.length - 1]);
  dialog.close();
  const form = document.querySelector("form");
  form.reset();
  event.preventDefault();
}
const edit = document.querySelector(".edit");
function editBook (book) {
  
  const editTitle = document.querySelector("#edit-title");
  const editAuthor = document.querySelector("#edit-author");
  const editPages = document.querySelector("#edit-pages");
  const editFinishDate = document.querySelector("#edit-finish-date");
  editTitle.value = book.title;
  editAuthor.value = book.author;
  editPages.value = book.pages;
  editFinishDate.value = book.finishDate;


  edit.showModal();
}

addBook.addEventListener("click", () => {
    dialog.showModal();
});

close.addEventListener("click", () => {
    dialog.close();
});

closeEdit.addEventListener("click", () => {
    edit.close();
})


