import axios from "axios";
import { useState, useEffect } from "react";
import "./book.css";
import { Button, TextField, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import UpgradeIcon from "@mui/icons-material/Upgrade";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

const initialBook = {
  name: "",
  publicationYear: 0,
  stock: 0,
  author: {},
  publisher: {},
  categories: [{}],
};

function Book() {
  const [newBook, setNewBook] = useState(initialBook);
  const [updateBook, setUpdateBook] = useState(initialBook);
  const [books, setBooks] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [publishers, setPublishers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [update, setUpdate] = useState(false);
  const [alert, setAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const [bookRes, authorRes, publisherRes, categoryRes] = await Promise.all(
        [
          axios.get(import.meta.env.VITE_BASE_URL + "/api/v1/books"),
          axios.get(import.meta.env.VITE_BASE_URL + "/api/v1/authors"),
          axios.get(import.meta.env.VITE_BASE_URL + "/api/v1/publishers"),
          axios.get(import.meta.env.VITE_BASE_URL + "/api/v1/categories"),
        ]
      );
      setBooks(bookRes.data);
      setAuthors(authorRes.data);
      setPublishers(publisherRes.data);
      setCategories(categoryRes.data);
      setUpdate(true);
    };
    fetchData();
  }, [update]);

  const handleBooksPost = async () => {
    try {
      await axios.post(import.meta.env.VITE_BASE_URL + "/api/v1/books", newBook);
      setUpdate(false);
      setNewBook(initialBook);
      handleAlert("Book Added");
    } catch (error) {
      console.error("Post hatası:", error);
    }
  };

  const handleBooksDelete = async (id) => {
    try {
      await axios.delete(import.meta.env.VITE_BASE_URL + `/api/v1/books/${id}`);
      handleAlert("Book Deleted");
      setUpdate(false);
    } catch (error) {
      console.error("Delete hatası:", error);
    }
  };

  const handleUpdateBook = async () => {
    try {
      await axios.put(
        import.meta.env.VITE_BASE_URL + `/api/v1/books/${updateBook.id}`,
        updateBook
      );
      setUpdateBook(initialBook);
      handleAlert("Book Updated");
      setUpdate(false);
    } catch (error) {
      console.error("Update hatası:", error);
    }
  };

  const handleAlert = (alertM) => {
    setAlertMessage(alertM);
    setAlert(true);
    setTimeout(() => {
      setAlert(false);
    }, 3000);
  };

  return (
    <>
      <section className="bg-gray-300 h-[calc(100vh-100px)] flex py-10">
        <div className="container w-full max-w-5xl mx-auto flex flex-col gap-6">
          {alert && <h1>{alertMessage}</h1>}

          {/* Yeni Kitap Ekleme */}
          <div className="w-full grid grid-cols-7 gap-4">
            <TextField
              label="Book Name"
              variant="standard"
              value={newBook.name}
              onChange={(e) => setNewBook({ ...newBook, name: e.target.value })}
            />
            <TextField
              label="Publication Year"
              variant="standard"
              type="number"
              value={newBook.publicationYear}
              onChange={(e) =>
                setNewBook({ ...newBook, publicationYear: e.target.value })
              }
            />
            <TextField
              label="Stock"
              variant="standard"
              type="number"
              value={newBook.stock}
              onChange={(e) =>
                setNewBook({ ...newBook, stock: e.target.value })
              }
            />

            {/* Author Select */}
            <FormControl>
              <InputLabel>Author</InputLabel>
              <Select
                value={newBook.author.id}
                onChange={(e) =>
                  setNewBook({ ...newBook, author: { id: e.target.value } })
                }
              >
                {authors.map((author) => (
                  <MenuItem key={author.id} value={author.id}>
                    {author.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Publisher Select */}
            <FormControl>
              <InputLabel>Publisher</InputLabel>
              <Select
                value={newBook.publisher.id}
                onChange={(e) =>
                  setNewBook({ ...newBook, publisher: { id: e.target.value } })
                }
              >
                {publishers.map((publisher) => (
                  <MenuItem key={publisher.id} value={publisher.id}>
                    {publisher.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Category Select */}
            <FormControl>
              <InputLabel>Category</InputLabel>
              <Select
                value={newBook.categories.id}
                onChange={(e) =>
                  setNewBook({ ...newBook, categories: e.target.value })
                }
              >
                {categories.map((category) => (
                  <MenuItem key={category.id} value={category.id}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Button variant="contained" onClick={handleBooksPost}>
              Add New Book
            </Button>
          </div>

          {/* Kitap Güncelleme */}
          <div className="w-full grid grid-cols-7 gap-4">
            <TextField
              label="Book Name"
              variant="standard"
              value={updateBook.name}
              onChange={(e) =>
                setUpdateBook({ ...updateBook, name: e.target.value })
              }
            />
            <TextField
              label="Publication Year"
              variant="standard"
              type="number"
              value={updateBook.publicationYear}
              onChange={(e) =>
                setUpdateBook({
                  ...updateBook,
                  publicationYear: e.target.value,
                })
              }
            />
            <TextField
              label="Stock"
              variant="standard"
              type="number"
              value={updateBook.stock}
              onChange={(e) =>
                setUpdateBook({ ...updateBook, stock: e.target.value })
              }
            />

            {/* Author Select */}
            <FormControl>
              <InputLabel>Author</InputLabel>
              <Select
                value={newBook.author.id}
                onChange={(e) =>
                  setUpdateBook({
                    ...updateBook,
                    author: { id: e.target.value },
                  })
                }
              >
                {authors.map((author) => (
                  <MenuItem key={author.id} value={author.id}>
                    {author.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Publisher Select */}
            <FormControl>
              <InputLabel>Publisher</InputLabel>
              <Select
                value={newBook.publisher.id}
                onChange={(e) =>
                  setUpdateBook({
                    ...updateBook,
                    publisher: { id: e.target.value },
                  })
                }
              >
                {publishers.map((publisher) => (
                  <MenuItem key={publisher.id} value={publisher.id}>
                    {publisher.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Category Select */}
            <FormControl>
              <InputLabel>Category</InputLabel>
              <Select
                value={newBook.categories.id}
                onChange={(e) =>
                  setUpdateBook({ ...updateBook, categories: {id: e.target.value} })
                }
              >
                {categories.map((category) => (
                  <MenuItem key={category.id} value={category.id}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Button variant="contained" onClick={handleUpdateBook}>
              Update Book
            </Button>
          </div>

          {/* Kitap Listesi */}
          <Typography variant="h3" className="text-center text-shadow">
            Books
          </Typography>
          <table className="min-w-full table-auto border-collapse">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 border-b text-center">Book Name</th>
                <th className="px-4 py-2 border-b text-center">
                  Publication Year
                </th>
                <th className="px-4 py-2 border-b text-center">Stock</th>
                <th className="px-4 py-2 border-b text-center">Author</th>
                <th className="px-4 py-2 border-b text-center">Publisher</th>
                <th className="px-4 py-2 border-b text-center">Category</th>
                <th className="px-4 py-2 border-b text-center">Delete</th>
                <th className="px-4 py-2 border-b text-center">Update</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book) => (
                <tr key={book.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border-b text-center">
                    {book.name}
                  </td>
                  <td className="px-4 py-2 border-b text-center">
                    {book.publicationYear}
                  </td>
                  <td className="px-4 py-2 border-b text-center">
                    {book.stock}
                  </td>
                  <td className="px-4 py-2 border-b text-center">
                    {book.author.name}
                  </td>
                  <td className="px-4 py-2 border-b text-center">
                    {book.publisher.name}
                  </td>
                  <td className="px-4 py-2 border-b text-center">
                    {book.categories.name}
                  </td>
                  <td className="px-4 py-2 border-b text-center">
                    <DeleteIcon
                      style={{
                        color: "red",
                        fontSize: "25px",
                        cursor: "pointer",
                      }}
                      onClick={() => handleBooksDelete(book.id)}
                    />
                  </td>
                  <td className="px-4 py-2 border-b text-center">
                    <UpgradeIcon
                      style={{
                        fontSize: "25px",
                        cursor: "pointer",
                      }}
                      onClick={() => setUpdateBook(book)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}

export default Book;
