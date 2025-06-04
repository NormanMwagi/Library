// store all books in an array
// create constructor for books
// function that takes arguments, creates a book from arguments and store book in the array
// books have unique id (crypto.randomUUID(). )

function Book(title, author, noOfPages, isRead) {
  // the constructor...
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.noOfPages = noOfPages;
  this.isRead = isRead;
}

Book.prototype.changeReadStatus = function(){
  this.isRead = !this.isRead;
}


let myLibrary = [];

const storedLibraryData = localStorage.getItem("library");
if(storedLibraryData){
  myLibrary = JSON.parse(storedLibraryData).map(bookData => {
  const book = new Book(bookData.title, bookData.author, bookData.noOfPages, bookData.isRead);
  book.id = bookData.id;
  return book;
  });
}
else {
  myLibrary = [
    new Book("Atomic habits", "James Mclear", 300, true),
    new Book("To Kill a Mockingbird", "Harper Lee", 281, true),
    new Book("1984", "George Orwell", 328, false),
    new Book("The Great Gatsby", "F. Scott Fitzgerald", 180, true)
  ];
}

displayBooks();
function saveToLocalStorage(){
  localStorage.setItem("library", JSON.stringify(myLibrary));
}

function addBookToLibrary(title, author, noOfPages, isRead) {
  let book = new Book(title, author, noOfPages, isRead);
  myLibrary.push(book);
    saveToLocalStorage();
}

function removeBook(id){
  const index = myLibrary.findIndex(book => book.id === id);
  if(index !== -1){
    myLibrary.splice(index,1);
      saveToLocalStorage();
  }
  displayBooks();
}

function displayBooks(){
  let books = document.getElementById("books");
  books.innerHTML = myLibrary.map(
    (item) => `<div><h3>Title: ${item.title}</h3>
                       <h4>Author: ${item.author}</h4>
                       <p>No Of Pages: ${item.noOfPages}</p>
                       <p>I've Read: ${item.isRead}</p>
                       <button class="remove" data-id="${item.id}">Remove</button>
                       <button class="read" data-id="${item.id}">Change Read Status</button>
                       </div>
                       `
).join('');

document.querySelectorAll(".remove").forEach(button => {
  button.addEventListener("click", function(){
    const bookId = button.getAttribute("data-id");
    removeBook(bookId);
  });
});

document.querySelectorAll(".read").forEach(button => {
  button.addEventListener("click", () => {
    const bookId = button.getAttribute("data-id");
    const book = myLibrary.find(book => book.id === bookId);
    if(book){
      if(book instanceof Book){
        book.changeReadStatus();
          saveToLocalStorage();
      }
      else{
        this.isRead = !this.isRead;
          saveToLocalStorage();
      }
      displayBooks();
    }
  });
});

}


document.getElementById("addBookBtn").addEventListener("click", function () {
  document.getElementById("add-book").showModal();
});

document.getElementById("close").addEventListener("click", function () {
  document.getElementById("add-book").close();
});

const formInput = document.getElementById("inputForm");

formInput.addEventListener("submit", function (e) {
  e.preventDefault();
  const titleInput = document.getElementById("title").value.trim();
  const authorInput = document.getElementById("author").value.trim();
  const pagesInput = document.getElementById("pages").value.trim();
  const isReadInput = document.getElementById("isRead").checked;
  if (titleInput && authorInput && pagesInput) {
    addBookToLibrary(titleInput, authorInput, pagesInput, isReadInput);
    displayBooks(); 
    //document.getElementById("inputForm").reset();
    e.target.reset();
    document.getElementById("add-book").close(); 
  }
});
