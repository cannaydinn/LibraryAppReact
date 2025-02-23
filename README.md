# Book Management System

This project is a Book Management System built with React, Axios, and a backend API. It allows users to manage books, authors, publishers, and categories in a library-like system. The system provides functionalities to add, update, delete, and view books, authors, and other relevant information.

## NETLIFY
https://scintillating-granita-ee2d4c.netlify.app/

## Features

- **Book Management**: Add, update, delete books, and view the list of books in the library.
- **Author Management**: Add, update, delete authors and view the list of authors.
- **Publisher Management**: Add, update, delete publishers and view their details.
- **Category Management**: Add, update, delete categories and assign them to books.
- **Responsive Design**: The project is responsive and works well on both desktop and mobile devices.

## Tech Stack

- **Frontend**: React, Axios, Material-UI, TailwindCSS
- **Backend**: Java (Spring Boot) - RESTful API
- **Database**: Postgre (Used for storing book, author, publisher, and category data)


## Usage

- **Adding Books**: You can add a new book by filling out the book details such as name, publication year, stock, author, publisher, and category.
- **Updating Books**: You can update the details of any existing book in the system.
- **Deleting Books**: You can delete a book from the system with a single click.
- **Managing Authors, Publishers, and Categories**: You can manage authors, publishers, and categories, allowing you to link them to books.

## API Endpoints

### Books
- `GET /api/v1/books`: Fetch all books.
- `POST /api/v1/books`: Add a new book.
- `PUT /api/v1/books/{id}`: Update a book's information.
- `DELETE /api/v1/books/{id}`: Delete a book.

### Authors
- `GET /api/v1/authors`: Fetch all authors.
- `POST /api/v1/authors`: Add a new author.
- `PUT /api/v1/authors/{id}`: Update an author's details.
- `DELETE /api/v1/authors/{id}`: Delete an author.

### Publishers
- `GET /api/v1/publishers`: Fetch all publishers.
- `POST /api/v1/publishers`: Add a new publisher.
- `PUT /api/v1/publishers/{id}`: Update a publisher's details.
- `DELETE /api/v1/publishers/{id}`: Delete a publisher.

### Categories
- `GET /api/v1/categories`: Fetch all categories.
- `POST /api/v1/categories`: Add a new category.
- `PUT /api/v1/categories/{id}`: Update a category.
- `DELETE /api/v1/categories/{id}`: Delete a category.

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

