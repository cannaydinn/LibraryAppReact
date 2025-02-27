import axios from "axios";
import { useState, useEffect } from "react";
import "./buyingBooks.css";
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

const initialBorrows = {
  borrowerName: "",
  borrowerMail: "",
  borrowingDate: "",
  returnDate: "",
  books: [],
};

function BuyingBooks() {
  const [newBorrow, setNewBorrow] = useState(initialBorrows);
  const [updateBorrow, setUpdateBorrow] = useState(initialBorrows);
  const [borrows, setBorrows] = useState([]);
  const [books, setBooks] = useState([]);
  const [update, setUpdate] = useState(false);
  // const [alert, setAlert] = useState(false);
  // const [alertMessage, setAlertMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const borrowRes = await axios.get(
          import.meta.env.VITE_BASE_URL + "/api/v1/borrows"
        );
        setBorrows(borrowRes.data);

        const bookRes = await axios.get(
          import.meta.env.VITE_BASE_URL + "/api/v1/books"
        );
        setBooks(bookRes.data);

        setUpdate(true);
      } catch (error) {
        console.error("API Fetch Error:", error);
      }
    };
    fetchData();
  }, [update]);

  // const body = {
  //   name: "Can Aydın",
  //   establishmentYear: 1,
  //   address: "Ankara",
  // };

  const handleBorrowsPost = async () => {
    const formattedBorrow = {
      borrowerName: newBorrow.borrowerName,
      borrowerMail: newBorrow.borrowerMail,
      borrowingDate: newBorrow.borrowingDate, // ISO formatında tarih
      returnDate: newBorrow.returnDate, // ISO formatında tarih
      bookForBorrowingRequest: newBorrow.books.map((bookId) => {
        const book = books.find((b) => b.id === bookId);
        return {
          id: book.id, // sadece kitap ID'si
          name: book.name, // kitap ismi
        };
      })[0], // Eğer birden fazla kitap varsa ilkini gönderiyoruz (API tek kitap bekliyor)
    };

    console.log("Formatted Borrow to be sent: ", formattedBorrow);

    try {
      await axios.post(
        import.meta.env.VITE_BASE_URL + "/api/v1/borrows",
        formattedBorrow
      );
      setNewBorrow(initialBorrows);
      setUpdate(false);
    } catch (error) {
      if (error.response) {
        console.error("Error adding borrow:", error.response.data); // API'den gelen hata mesajını gösterir
      } else if (error.request) {
        console.error("No response received:", error.request);
      } else {
        console.error("Error", error.message);
      }
    }
  };

  // const handleAlert = (alertM) => {
  //   setAlertMessage(alertM);
  //   setAlert(true);
  //   setTimeout(() => {
  //     setAlert(false);
  //   }, 3000);
  // };

  const handleBorrowsDelete = async (id) => {
    await axios.delete(import.meta.env.VITE_BASE_URL + `/api/v1/borrows/${id}`);
    setUpdate(false);
  };

  const handleUpdateForm = (borrow) => {
    setUpdateBorrow({
      ...borrow,
      books: borrow.books ? borrow.books.map((borr) => borr.id) : [],
    });
  };

  const handleUpdateBorrow = async () => {
    const formattedBorrow = {
      ...updateBorrow,
      books: updateBorrow.books.map((bookId) => ({
        id: bookId,
      })),
    };
    await axios.put(
      import.meta.env.VITE_BASE_URL + `/api/v1/borrows/${updateBorrow.id}`,
      formattedBorrow
    );

    setUpdateBorrow(initialBorrows);
    setUpdate(false);
  };

  return (
    <>
      <section className="bg-gray-300 h-[calc(100vh-100px)] flex py-10">
        <div className="container w-full max-w-5xl mx-auto flex flex-col gap-6">
          <div className="w-full grid grid-cols-6 gap-4">
            {/* NEW Borrow */}
            {[
              "borrowerName",
              "borrowerMail",
              "borrowingDate",
              "returnDate",
            ].map((key) => (
              <TextField
                key={key}
                type={
                  key === "borrowingDate" || key === "returnDate"
                    ? "date"
                    : "text"
                } // Date için doğru koşul
                label={
                  key === "borrowingDate" || key === "returnDate" ? " " : key
                } // Label aynı olabilir ya da farklı bir şey yazılabilir
                variant="standard"
                value={newBorrow[key]}
                onChange={(e) =>
                  setNewBorrow((prev) => ({ ...prev, [key]: e.target.value }))
                }
              />
            ))}

            <FormControl variant="standard" style={{ minWidth: 130 }}>
              <InputLabel>Books</InputLabel>
              <Select
                multiple
                value={newBorrow.books}
                onChange={(e) =>
                  setNewBorrow((prev) => ({ ...prev, books: e.target.value }))
                }
                input={<OutlinedInput label="Books" />}
                renderValue={(selected) =>
                  selected
                    .map((id) => books.find((book) => book.id === id)?.name)
                    .join(", ")
                }
              >
                {books.map((book) => (
                  <MenuItem key={book.id} value={book.id}>
                    {book.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Button variant="contained" onClick={handleBorrowsPost}>
              Add New Borrow
            </Button>
          </div>

          {/* UPDATE BOOK */}
          <div className="w-full grid grid-cols-6 gap-4">
            {[
              "borrowerName",
              "borrowerMail",
              "borrowingDate",
              "returnDate",
            ].map((key) => (
              <TextField
                key={key}
                type={
                  key === "borrowingDate" || key === "returnDate"
                    ? "date"
                    : "text"
                } // Date için doğru koşul
                label={
                  key === "borrowingDate" || key === "returnDate" ? " " : key
                } // Label aynı olabilir ya da farklı bir şey yazılabilir
                variant="standard"
                value={updateBorrow[key]}
                onChange={(e) =>
                  setUpdateBorrow((prev) => ({
                    ...prev,
                    [key]: e.target.value,
                  }))
                }
              />
            ))}

            <FormControl variant="standard" style={{ minWidth: 130 }}>
              <InputLabel>Books</InputLabel>
              <Select
                multiple
                value={updateBorrow.books}
                onChange={(e) =>
                  setUpdateBorrow((prev) => ({
                    ...prev,
                    books: e.target.value,
                  }))
                }
                input={<OutlinedInput label="Kitaplar" />}
                renderValue={(selected) =>
                  selected
                    .map((id) => books.find((book) => book.id === id)?.name)
                    .join(", ")
                }
              >
                {books.map((book) => (
                  <MenuItem key={book.id} value={book.id}>
                    {book.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Button variant="contained" onClick={handleUpdateBorrow}>
              Update Borrow
            </Button>
          </div>
          <Typography variant="h3" className="text-center text-shadow">
            Borrows
          </Typography>
          {/* TABLE */}
          <Table className="min-w-full table-auto border-collapse">
            <TableHead className="bg-gray-100">
              <TableRow>
                <TableCell align="center">Borrower Name</TableCell>
                <TableCell align="center">Borrower Mail</TableCell>
                <TableCell align="center">Borrowing Date</TableCell>
                <TableCell align="center">Return Date</TableCell>
                <TableCell align="center">Book Name</TableCell>
                <TableCell align="center">Delete</TableCell>
                <TableCell align="center">Update</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {borrows && borrows.length > 0 ? (
                borrows.map((borrow, index) => {
                  return (
                    <TableRow
                      key={index}
                      className={index % 2 === 0 ? "even-row" : "odd-row"}
                    >
                      <TableCell align="center">
                        {borrow.borrowerName}
                      </TableCell>
                      <TableCell align="center">
                        {borrow.borrowerMail}
                      </TableCell>
                      <TableCell align="center">
                        {borrow.borrowingDate}
                      </TableCell>
                      <TableCell align="center">{borrow.returnDate}</TableCell>
                      <TableCell align="center">
                        {borrow.books?.map((book) => (
                          <Chip
                            key={book.id}
                            label={book.name}
                            style={{ margin: "2px" }}
                          />
                        ))}
                      </TableCell>
                      <TableCell align="center">
                        <DeleteIcon
                          style={{
                            color: "red",
                            fontSize: "25px",
                            cursor: "pointer",
                          }}
                          onClick={() => handleBorrowsDelete(borrow.id)}
                        />
                      </TableCell>
                      <TableCell align="center">
                        <UpgradeIcon
                          style={{
                            fontSize: "25px",
                            cursor: "pointer",
                          }}
                          onClick={() => handleUpdateForm(borrow)}
                        />
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={7} align="center">
                    No borrows available
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </section>
    </>
  );
}

export default BuyingBooks;
