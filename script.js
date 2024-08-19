const addButton = document.querySelector('#addBook');
const libraryDiv = document.querySelector('.library');
const dialog = document.querySelector('dialog');
const closeButton = document.querySelector('#cancel');
const submitButton = document.querySelector('#submit');
const inputs = Array.from(document.querySelectorAll('form input'));

const library = [];

addButton.addEventListener('click', () => {
    dialog.showModal();
});

closeButton.addEventListener('click', () => {
    dialog.close();
})

dialog.addEventListener('close', () => {
    inputs.forEach(input => {
        input.value = '';
        input.checked = false;
    })
})

dialog.addEventListener('submit', e => {
    e.preventDefault();
    addBookToLibrary(inputs[0].value, inputs[1].value, inputs[2].value, inputs[3].checked);
    displayLibrary();
    dialog.close();
})

function Book(title, author, pages, hasRead){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.hasRead = hasRead;
    this.info = function() {
        return `${this.title} by ${this.author}, ${this.pages} pages, ${hasRead ? 'read it' : 'not read yet'}`
    }
}

function addBookToLibrary(title, author, pages, hasRead){
        const newBook = new Book(title, author, pages, hasRead)
        library.push(newBook);
}

function deleteBook(index){
    library.splice(index, 1);
    displayLibrary();
}

function displayLibrary(){
    libraryDiv.innerHTML = '';
    library.forEach((book, index) => {
        const bookCard = document.createElement('div');
        const bookTitle = document.createElement('p');
        const bookAuthor = document.createElement('p');
        const bookPages = document.createElement('p');
        const bookRead = document.createElement('label');
        const readCheckbox = document.createElement('input');
        const removeBook = document.createElement('button');
        removeBook.textContent = "Remove"
        removeBook.addEventListener('click', () => deleteBook(index));
        readCheckbox.type = 'checkbox';
        readCheckbox.id = `didRead${index}`
        bookRead.htmlFor = `didRead${index}`
        bookTitle.textContent = book.title;
        bookAuthor.textContent = book.author;
        bookPages.textContent = `${book.pages} pages`;
        readCheckbox.checked = book.hasRead ? true : false;
        bookCard.append(bookTitle, bookAuthor, bookPages, readCheckbox, bookRead, removeBook);
        bookCard.className = 'card'
        libraryDiv.appendChild(bookCard);
    })
}

addBookToLibrary('1984', 'George Orwell', 328, true);
addBookToLibrary('Dune', 'Frank Herbert', 632, true);
displayLibrary();