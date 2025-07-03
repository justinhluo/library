let myLibrary = [];

function Book(title, author, pages, read, id) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.id = id;
}

function addBookToLibrary(title, author, pages, read, id) {
  myLibrary.push(new Book(title, author, pages, read, id));
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
const books = document.querySelector(".books");
const form = document.querySelector("form");
form.addEventListener("submit", submit);

addBookToLibrary("test", "Jusitn", 82, true, "id2");

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
  authorDiv.textContent = bookObject.author;
  bookInfo.appendChild(authorDiv);
  const pagesDiv = document.createElement("div");
  pagesDiv.textContent = bookObject.pages;
  bookInfo.appendChild(pagesDiv);
  book.appendChild(bookInfo);
  const readDiv = document.createElement("div");
  // const readLabel = document.createElement("label");
  // const readBox = document.createElement("input");
  // readBox.type = "checkbox";
  // readLabel.textContent = "Read?";
  // readLabel.setAttribute("for", "readBox");
  // readBox.checked = bookObject.read;
  bookObject.read ? readDiv.textContent = "Finished!" : readDiv.textContent = "Still reading..."
  

  
  book.appendChild(readDiv);


  
  // edit.addEventListener("click", editBook);
  books.appendChild(book);
}



function submit(event) { //creates a new book using the input from form
  
  const title = document.querySelector("#title").value;
  const author = document.querySelector("#author").value;
  const pages = document.querySelector("#pages").value;
  const read = document.querySelector("#read").checked;
  const id = self.crypto.randomUUID();
  addBookToLibrary(title, author, pages, read, id); //Adds to array
  console.log(myLibrary);
  createBook(myLibrary[myLibrary.length - 1]);
  dialog.close();
  const form = document.querySelector("form");
  form.reset();
  event.preventDefault();
}



addBook.addEventListener("click", () => {
    dialog.showModal();
});

close.addEventListener("click", () => {
    dialog.close();
})


