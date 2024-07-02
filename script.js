const addButton = document.querySelector('dialog + button');
const libraryDiv = document.querySelector('.library');
const dialog = document.querySelector('dialog');
const closeButton = document.querySelector('#cancel');
const submitButton = document.querySelector('#submit');
const inputs = Array.from(document.querySelectorAll('form input'));

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
