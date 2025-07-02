const myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary(title, author, pages, read) {
  myLibrary.push(new Book(title, author, pages, read));
}

addBookToLibrary("bird", "JK", 90, true);

console.log(myLibrary);
const dialog = document.querySelector("dialog");
const addBook = document.querySelector(".add-book");
const close = document.querySelector("dialog img");

addBook.addEventListener("click", () => {
    dialog.showModal();
});

close.addEventListener("click", () => {
    dialog.close();
})
