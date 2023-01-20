class Book {
    constructor(title, author, isbn) {
        this.title = title
        this.author = author
        this.isbn = isbn
    }
}

class UI {
    constructor() {}

}

class Store {
    static getBooks() {
        let books
        if(localStorage.getItem('books') === null) {
            books = []
        } else {
            books = JSON.parse(localStorage.getItem('books'))
        }
        return books
    }
    static displayBooks() {
        const books = this.getBooks()

        books.forEach(function(book) {
            const ui = new UI
            ui.addBookToList(book)
        })
    }
    static addBook(book) {
        const books = Store.getBooks()
        books.push(book)
        localStorage.setItem('books', JSON.stringify(books))
    }
    static removeBook(book) {}
}

UI.prototype.addBookToList = function(book) {
   const list = document.getElementById('book-list')
    const tr = document.createElement('tr')
    tr.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="delete">X</a></td>`

    list.append(tr)
}

UI.prototype.clearFields = function() {
     document.getElementById('title').value = ''
     document.getElementById('author').value = ''
     document.getElementById('isbn').value = ''
}

UI.prototype.showAlert = function(message, className) {
    const div = document.createElement('div')
    div.className = `alert ${className}`
    div.appendChild(document.createTextNode(message))

    const container = document.querySelector('.container')
    const form = document.querySelector('#book-form')
    container.insertBefore(div, form)

setTimeout(function() {
        document.querySelector('.alert').remove()
    }, 2000)

}

UI.prototype.deleteBook = function(target) {
    if(target.className === 'delete') {
       target.parentElement.parentElement.remove()
    }
}

document.getElementById('book-form').addEventListener('submit', function(e) {

    const title = document.getElementById('title').value,
          author = document.getElementById('author').value,
          isbn = document.getElementById('isbn').value

    const book = new Book(title, author, isbn)

    const ui = new UI()

    if(title === '' || author === '' || isbn === ''){
        ui.showAlert('Please fill in all required fields', 'error')
    } else {
        ui.addBookToList(book)
        Store.addBook(book)
        ui.showAlert('Book added successfully', 'success')
        ui.clearFields()
    }

    e.preventDefault()
})

document.getElementById('book-list').addEventListener('click', function(e) {
    const ui = new UI()
    ui.deleteBook(e.target)
    e.preventDefault()
})

document.addEventListener('DOMContentLoaded', Store.displayBooks)



