// store all books in an array
// create constructor for books
// function that takes arguments, creates a book from arguments and store book in the array
// books have unique id (crypto.randomUUID(). )

const myLibrary = [
    {id: 1, title:"Atomic habits", author:"James Mclear", noOfPages: 300},
    { id: 2, title: "To Kill a Mockingbird", author: "Harper Lee", noOfPages: 281 },
  { id: 3, title: "1984", author: "George Orwell", noOfPages: 328 },
  { id: 4, title: "The Great Gatsby", author: "F. Scott Fitzgerald", noOfPages: 180 },
];

function Book(title, author, noOfPages) {
  // the constructor...
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.noOfPages = noOfPages;
}

function addBookToLibrary(title, author, noOfPages) {
  let book = new Book(title, author, noOfPages);
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
                       <button class="remove" data-id="${item.id}">Remove</button>
                       </div>
                       `
).join('');

document.querySelectorAll(".remove").forEach(button => {
  button.addEventListener("click", function(){
    const bookId = button.getAttribute("data-id");
    removeBook(bookId);
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

  if (titleInput && authorInput && pagesInput) {
    addBookToLibrary(titleInput, authorInput, pagesInput);
    displayBooks(); 
    //document.getElementById("inputForm").reset();
    e.target.reset();
    document.getElementById("add-book").close(); 
  }
});




