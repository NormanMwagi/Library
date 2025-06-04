// store all books in an array
// create constructor for books
// function that takes arguments, creates a book from arguments and store book in the array
// books have unique id (crypto.randomUUID(). )

const myLibrary = [
    {id: 1, title:"Atomic habits", author:"James Mclear", noOfPages: 300, isRead: true},
    { id: 2, title: "To Kill a Mockingbird", author: "Harper Lee", noOfPages: 281, isRead: true },
  { id: 3, title: "1984", author: "George Orwell", noOfPages: 328, isRead: false },
  { id: 4, title: "The Great Gatsby", author: "F. Scott Fitzgerald", noOfPages: 180, isRead: true },
];

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
function addBookToLibrary(title, author, noOfPages, isRead) {
  let book = new Book(title, author, noOfPages, isRead);
  myLibrary.push(book);
  
}

function removeBook(id){
  const index = myLibrary.findIndex(book => book.id === id);
  if(index !== -1){
    myLibrary.splice(index,1);
  }
  displayBooks();
}

function displayBooks(){
  let books = document.getElementById("books");
  books.innerHTML = myLibrary.map(
    (item) => `<div key="${item.id}"><h3>Title: ${item.title}</h3>
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
      }
      else{
        this.isRead = !this.isRead;
      }
      displayBooks();
    }
  });
});

}


displayBooks();


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
  if (titleInput && authorInput && pagesInput && isReadInput) {
    addBookToLibrary(titleInput, authorInput, pagesInput, isReadInput);
    displayBooks(); 
    //document.getElementById("inputForm").reset();
    e.target.reset();
    document.getElementById("add-book").close(); 
  }
});




