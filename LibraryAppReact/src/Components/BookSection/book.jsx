import { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  OutlinedInput,
  Chip,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import UpgradeIcon from "@mui/icons-material/Upgrade";
import "./Book.css";

const initialBook = {
  name: "",
  stock: "",
  publicationYear: "",
  categories: [],
  authors: [],
  publishers: [],
};

const Book = () => {
  const [newBook, setNewBook] = useState(initialBook);
  const [books, setBooks] = useState(null);
  const [categories, setCategories] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [publishers, setPublishers] = useState([]);
  const [update, setUpdate] = useState(false);
  const [updateBook, setUpdateBook] = useState(initialBook);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const bookRes = await axios.get(
          import.meta.env.VITE_BASE_URL + "/api/v1/books"
        );
        setBooks(bookRes.data);
        const categoryRes = await axios.get(
          import.meta.env.VITE_BASE_URL + "/api/v1/categories"
        );
        setCategories(categoryRes.data);

        const authorRes = await axios.get(
          import.meta.env.VITE_BASE_URL + "/api/v1/authors"
        );
        setAuthors(authorRes.data);

        const publisherRes = await axios.get(
          import.meta.env.VITE_BASE_URL + "/api/v1/publishers"
        );
        setPublishers(publisherRes.data);

        setUpdate(true);
      } catch (error) {
        console.error("API Fetch Error:", error);
      }
    };
    fetchData();
  }, [update]);

  const handleBookPost = async () => {
    const formattedBook = {
      ...newBook,
      categories: newBook.categories.map((categoryId) => ({ id: categoryId })),
      authors: newBook.authors.map((authorName) => ({ name: authorName })),
      publishers: newBook.publishers.map((publisherId) => ({
        id: publisherId,
      })),
    };
    await axios.post(
      import.meta.env.VITE_BASE_URL + "/api/v1/books",
      formattedBook
    );
    setNewBook(initialBook);
    setUpdate(false);
  };

  const handleBookDelete = async (id) => {
    await axios.delete(import.meta.env.VITE_BASE_URL + `/api/v1/books/${id}`);
    setUpdate(false);
  };

  const handleUpdateForm = (book) => {
    setUpdateBook({
      ...book,
      categories: book.categories ? book.categories.map((cat) => cat.id) : [],
      publishers: book.publishers ? book.publishers.map((pub) => pub.id) : [],
      authors: book.authors ? book.authors.map((auth) => auth.name) : [],
    });
  };

  const handleBookUpdate = async () => {
    const formattedBook = {
      ...updateBook,
      categories: updateBook.categories.map((categoryId) => ({
        id: categoryId,
      })),
      publishers: updateBook.publishers.map((publisherId) => ({
        id: publisherId,
      })),
      authors: updateBook.authors.map((authorName) => ({ name: authorName })),
    };
    await axios.put(
      import.meta.env.VITE_BASE_URL + `/api/v1/books/${updateBook.id}`,
      formattedBook
    );

    setUpdateBook(initialBook);
    setUpdate(false);
  };

  return (
    <section className="bg-gray-300 h-[calc(100vh-100px)] flex py-10">
      <div className="container w-full max-w-5xl mx-auto flex flex-col gap-6">
      <div className="w-full grid grid-cols-7 gap-4">
        {/* NEW BOOK */}
          {["name", "stock", "publicationYear"].map((key) => (
            <TextField
              key={key}
              label={key}
              variant="standard"
              value={newBook[key]}
              onChange={(e) =>
                setNewBook((prev) => ({ ...prev, [key]: e.target.value }))
              }
            />
          ))}

          <FormControl variant="standard" style={{ minWidth: 130 }}>
            <InputLabel>Categories</InputLabel>
            <Select
              multiple
              value={newBook.categories}
              onChange={(e) =>
                setNewBook((prev) => ({ ...prev, categories: e.target.value }))
              }
              input={<OutlinedInput label="Categories" />}
              renderValue={(selected) =>
                selected
                  .map((id) => categories.find((cat) => cat.id === id)?.name)
                  .join(", ")
              }
            >
              {categories.map((category) => (
                <MenuItem key={category.id} value={category.id}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl variant="standard" style={{ minWidth: 130 }}>
            <InputLabel>Authors</InputLabel>
            <Select
              multiple
              value={newBook.authors}
              onChange={(e) =>
                setNewBook((prev) => ({ ...prev, authors: e.target.value }))
              }
              input={<OutlinedInput label="Yazarlar" />}
              renderValue={(selected) =>
                selected
                  .map((id) => authors.find((auth) => auth.name === id)?.name)
                  .join(", ")
              }
            >
              {authors.map((author) => (
                <MenuItem key={author.id} value={author.name}>
                  {author.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl variant="standard" style={{ minWidth: 130 }}>
            <InputLabel>Publishers</InputLabel>
            <Select
              multiple
              value={newBook.publishers}
              onChange={(e) =>
                setNewBook((prev) => ({ ...prev, publishers: e.target.value }))
              }
              input={<OutlinedInput label="Kategoriler" />}
              renderValue={(selected) =>
                selected
                  .map((id) => publishers.find((pub) => pub.id === id)?.name)
                  .join(", ")
              }
            >
              {publishers.map((publisher) => (
                <MenuItem key={publisher.id} value={publisher.id}>
                  {publisher.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Button
            variant="contained"
            onClick={handleBookPost}
          >
            Add New Book
          </Button>
      </div>

      {/* UPDATE BOOK */}
      <div className="w-full grid grid-cols-7 gap-4">
          {["name", "stock", "publicationYear"].map((key) => (
            <TextField
              key={key}
              label={key}
              variant="standard"
              value={updateBook[key]}
              onChange={(e) =>
                setUpdateBook((prev) => ({ ...prev, [key]: e.target.value }))
              }
            />
          ))}

          <FormControl variant="standard" style={{ minWidth: 130 }}>
            <InputLabel>Categories</InputLabel>
            <Select
              multiple
              value={updateBook.categories}
              onChange={(e) =>
                setUpdateBook((prev) => ({
                  ...prev,
                  categories: e.target.value,
                }))
              }
              input={<OutlinedInput label="Kategoriler" />}
              renderValue={(selected) =>
                selected
                  .map((id) => categories.find((cat) => cat.id === id)?.name)
                  .join(", ")
              }
            >
              {categories.map((category) => (
                <MenuItem key={category.id} value={category.id}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl variant="outlined" style={{ minWidth: 130 }}>
            <InputLabel>Authors</InputLabel>
            <Select
              multiple
              value={updateBook.authors}
              onChange={(e) =>
                setUpdateBook((prev) => ({ ...prev, authors: e.target.value }))
              }
              input={<OutlinedInput label="Yazarlar" />}
              renderValue={(selected) =>
                selected
                  .map((id) => authors.find((auth) => auth.name === id)?.name)
                  .join(", ")
              }
            >
              {authors.map((author) => (
                <MenuItem key={author.id} value={author.name}>
                  {author.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl variant="outlined" style={{ minWidth: 130 }}>
            <InputLabel>Publishers</InputLabel>
            <Select
              multiple
              value={updateBook.publishers}
              onChange={(e) =>
                setUpdateBook((prev) => ({
                  ...prev,
                  publishers: e.target.value,
                }))
              }
              input={<OutlinedInput label="Kategoriler" />}
              renderValue={(selected) =>
                selected
                  .map((id) => publishers.find((pub) => pub.id === id)?.name)
                  .join(", ")
              }
            >
              {publishers.map((publisher) => (
                <MenuItem key={publisher.id} value={publisher.id}>
                  {publisher.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Button
            variant="contained"
            onClick={handleBookUpdate}
          >
            Update Book
          </Button>
      </div>
      <Typography variant="h3" className="text-center text-shadow">
            Books
          </Typography>
      {/* TABLE */}
        <Table className="min-w-full table-auto border-collapse">
          <TableHead className="bg-gray-100">
            <TableRow >
              <TableCell align="center">Book Name</TableCell>
              <TableCell align="center">Stock</TableCell>
              <TableCell align="center">Publication Year</TableCell>
              <TableCell align="center">Categories</TableCell>
              <TableCell align="center">Authors</TableCell>
              <TableCell align="center">Publisher</TableCell>
              <TableCell align="center">Delete</TableCell>
              <TableCell align="center">Update</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {books && books.length > 0 ? (
              books.map((book, index) => {
                return (
                  <TableRow
                    key={index}
                    className={index % 2 === 0 ? "even-row" : "odd-row"}
                  >
                    <TableCell align="center">{book.name}</TableCell>
                    <TableCell align="center">{book.stock}</TableCell>
                    <TableCell align="center">{book.publicationYear}</TableCell>
                    <TableCell align="center">
                      {book.categories?.map((cat) => (
                        <Chip
                          key={cat.id}
                          label={cat.name}
                          style={{ margin: "2px" }}
                        />
                      ))}
                    </TableCell>
                    <TableCell align="center">
                      {book.authors && book.authors.length > 0 ? (
                        book.authors.map((auth, i) => (
                          <Chip
                            key={i}
                            label={auth.name}
                            style={{ margin: "2px" }}
                          />
                        ))
                      ) : (
                        <span>No author</span>
                      )}
                    </TableCell>
                    <TableCell align="center">
                      {book.publishers && book.publishers.length > 0 ? (
                        book.publishers.map((pub) => (
                          <Chip
                            key={pub.id}
                            label={pub.name}
                            style={{ margin: "2px" }}
                          />
                        ))
                      ) : (
                        <span>No publisher</span>
                      )}
                    </TableCell>

                    <TableCell align="center">
                    <DeleteIcon
                        style={{
                          color: "red",
                          fontSize: "25px",
                          cursor: "pointer",
                        }}
                        onClick={() => handleBookDelete(book.id)}
                      />
                      </TableCell>
                      <TableCell align="center">
                      <UpgradeIcon
                        style={{
                          fontSize: "25px",
                          cursor: "pointer",
                        }}
                        onClick={() => handleUpdateForm(book)}
                      />
                      </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No books available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </section>
  );
};

export default Book;
