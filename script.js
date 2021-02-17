
//Variables
let myLibrary = [] //Stores Book Objects
let id = 0

//DOM References
const input = {
    title: document.getElementById("title"),
    author: document.getElementById("author"),
    pages: document.getElementById("pages"),
    status: document.getElementById("status"),
}
const button = {
    submit: document.getElementById("submit"),
}
const shelf = document.getElementById("shelf")




//Adding Events
button.submit.addEventListener("click", function() {
    const book = new Book(input.title.value, input.author.value, input.pages.value, input.status.value);
    addBookToLibrary(book);
});


function Book(title, author, pages, status=false) {
    this.id = id
    this.title = title
    this.author = author
    this.pages = pages
    this.status = status
    id++
}

function addBookToLibrary(book) {
    myLibrary.push(book)
    addBookToDOM(book)
    console.table(myLibrary)
}

function addBookToDOM(book) {
    const row = document.createElement("div")
    row.classList.add("Row")
    row.classList.add("Book"+book.id)
    for (const key in book) {
        if(key != "status" && key != "id") {
            const cell = document.createElement("div");
            cell.classList.add("Cell")
            cell.classList.add("Book"+book.id)
            cell.textContent = book[key]
            row.appendChild(cell);
        }
    }
    //Create Status button
    const cellStatus = document.createElement("div")
    cellStatus.classList.add("Cell")
    cellStatus.classList.add("Book"+book.id)
    const buttonStatus = document.createElement("button")
    buttonStatus.classList.add("status")
    buttonStatus.id = book.id+"Status"
    buttonStatus.textContent = (book.status) ? "Read" : "Not Read"
    buttonStatus.addEventListener("click", function() {
        toggleStatus(book)
    });
    cellStatus.appendChild(buttonStatus)
    row.appendChild(cellStatus)

    //Create Delete button
    const cellDelete = document.createElement("div")
    cellDelete.classList.add("Cell")
    cellDelete.classList.add("Book"+book.id)
    const buttonDelete = document.createElement("button")
    buttonDelete.classList.add("delete")
    buttonDelete.id = book.id+"Delete"
    buttonDelete.textContent = "DELETE"
    buttonDelete.addEventListener("click", function() {
        deleteBook(book)
    });
    cellDelete.appendChild(buttonDelete)
    row.appendChild(cellDelete)

    shelf.appendChild(row);
}

function toggleStatus(book) {
    book.status = book.status ? false : true
    document.getElementById(book.id+"Status").textContent = book.status ? "Read" : "Not Read"
}

function deleteBook(book) {
    let bookTable = document.getElementsByClassName("Book"+book.id)
    while(bookTable.length > 0){
        bookTable[0].parentNode.removeChild(bookTable[0]);
    }
    myLibrary = myLibrary.filter(function(element) {
        return element.id != book.id
    });
    delete book
    console.table(myLibrary)
}