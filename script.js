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
    const newBook = new Book(inputs[0].value, inputs[1].value, inputs[2].value, inputs[3].checked)
    Book.addBookToLibrary(newBook);
    displayLibrary();
    dialog.close();
})

const checkText = (e) => {
    const text = e.target;
    text.validity.patternMismatch ? text.setCustomValidity("Text should be longer than two letters and not contain any invalid characters") : text.setCustomValidity("");
}

const getInput = (type) => inputs.filter(input => input.type === type);

const textInputs = getInput("text");
textInputs.forEach(textInput => textInput.addEventListener("focusout", checkText));

class Book {
    constructor(title, author, pages, hasRead) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.hasRead = hasRead;
    }

    info() {
        return `${this.title} by ${this.author}, ${this.pages} pages, ${this.hasRead ? 'read it' : 'not read yet'}`
    }

    static addBookToLibrary(newBook){
        library.push(newBook);
    }

    static deleteBook(index){
        library.splice(index, 1);
        displayLibrary();
    }
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
        removeBook.addEventListener('click', () => Book.deleteBook(index));
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
const book1984 = new Book('1984', 'George Orwell', 328, true)
Book.addBookToLibrary(book1984);
const dune = new Book('Dune', 'Frank Herbert', 632, true)
Book.addBookToLibrary(dune);
displayLibrary();