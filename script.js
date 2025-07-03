let myLibrary = [];

const editDialog = document.querySelector(".edit");
const dialog = document.querySelector("dialog");
const addBook = document.querySelector(".add-book");
const close = document.querySelector("dialog img");
const closeEdit = document.querySelector(".edit img");
const books = document.querySelector(".books");
const form = document.querySelector("form");
form.addEventListener("submit", submit);
const editForm = document.querySelector("#edit-form");
const editTitle = document.querySelector("#edit-title");
const editAuthor = document.querySelector("#edit-author");
const editPages = document.querySelector("#edit-pages");
const editFinishDate = document.querySelector("#edit-finish-date");
editForm.addEventListener("submit", saveChanges);
let bookBeingEdited = null;

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

function saveLibrary() {
  localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
}

function loadLibrary() {
  const data = localStorage.getItem("myLibrary");

  if (data) {
    const parsed = JSON.parse(data);
    
    // Only use saved data if it's not an empty array
    if (parsed.length > 0) {
      myLibrary = parsed.map(book => new Book(
        book.title,
        book.author,
        book.pages,
        book.finishDate,
        book.id
      ));
    } else {
      addSampleBooks();
    }
  } else {
    addSampleBooks();
  }
}

function addSampleBooks() {
  addBookToLibrary("The Hunger Games", "Suzanne Collins", 374, "2021-01-24", "id-1");
  addBookToLibrary("Pride and Prejudice", "Jane Austen", 432, "2020-12-04", "id-2");
  addBookToLibrary("Brave New World", "Aldous Huxley", 288, "2019-04-21", "id-3");
  saveLibrary();
}

loadLibrary();
renderLibrary();

function renderLibrary() {
  books.innerHTML = ""; // Clear existing books

  for (const book of myLibrary) {
    createBook(book);
  }
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
    myLibrary = myLibrary.filter(book => book.id !== bookObject.id);
    renderLibrary();
    saveLibrary();

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
  if (bookObject.finishDate !== "") {
    const [year, month, day] = bookObject.finishDate.split("-");
    const formattedDate = new Date(Number(year), Number(month) - 1, Number(day)).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric"
    });
    readDiv.textContent = "Finished on " + formattedDate;
  } else {
    readDiv.textContent = "Still reading...";
  }
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
  saveLibrary();
  createBook(myLibrary[myLibrary.length - 1]);
  dialog.close();
  const form = document.querySelector("form");
  form.reset();
  event.preventDefault();
}
function saveChanges(event) {
  event.preventDefault();
  bookBeingEdited.title =  editTitle.value;
  bookBeingEdited.author = editAuthor.value;
  bookBeingEdited.pages = editPages.value;
  bookBeingEdited.finishDate = editFinishDate.value;
  renderLibrary();
  editDialog.close();
  saveLibrary();
}
function editBook (book) {
  bookBeingEdited = book;
  editTitle.value = book.title;
  editAuthor.value = book.author;
  editPages.value = book.pages;
  editFinishDate.value = book.finishDate;
  editDialog.showModal();
}

addBook.addEventListener("click", () => {
    dialog.showModal();
});

close.addEventListener("click", () => {
    dialog.close();
});

closeEdit.addEventListener("click", () => {
    editDialog.close();
})


