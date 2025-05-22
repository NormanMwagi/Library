// store all books in an array
// create constructor for books
// function that takes arguments, creates a book from arguments and store book in the array
// books have unique id (crypto.randomUUID(). )

const myLibrary = [
    {id: 1, title:"Atomic habits", author:"James Mclear", noOfPages: 300},
    { id: 2, title: "To Kill a Mockingbird", author: "Harper Lee", noOfPages: 281 },
  { id: 3, title: "1984", author: "George Orwell", noOfPages: 328 },
  { id: 4, title: "The Great Gatsby", author: "F. Scott Fitzgerald", noOfPages: 180 },
  { id: 5, title: "The Hobbit", author: "J.R.R. Tolkien", noOfPages: 310 },
  { id: 6, title: "Harry Potter and the Sorcerer's Stone", author: "J.K. Rowling", noOfPages: 309 },
  { id: 7, title: "Sapiens: A Brief History of Humankind", author: "Yuval Noah Harari", noOfPages: 443 },
  { id: 8, title: "Pride and Prejudice", author: "Jane Austen", noOfPages: 279 },
  { id: 9, title: "The Catcher in the Rye", author: "J.D. Salinger", noOfPages: 277 },
  { id: 10, title: "Dune", author: "Frank Herbert", noOfPages: 412 },

];

function Book(title, author, noOfPages) {
  // the constructor...
  this.title = title;
  this.author = author;
  this.noOfPages = noOfPages;
}

function addBookToLibrary(title, author, noOfPages) {
  // take params, create a book then store it in the array  
    myLibrary.push({id: crypto.randomUUID(), title, author, noOfPages});
}

addBookToLibrary("John Wick", "Me", 400);
console.log(myLibrary);

function displayBooks(){
  let books = document.getElementById("books");
  books.innerHTML = myLibrary.map((item) => `<div key="${item.id}"><h3>Title: ${item.title}</h3>
                       <h4>Author: ${item.author}</h4>
                       <p>No Of Pages: ${item.noOfPages}</p></div>`
).join('');

}

displayBooks();

