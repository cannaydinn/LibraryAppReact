import axios from "axios";
import { useState, useEffect } from "react";
import "./buyingBooks.css";
import { Button, TextField, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import UpgradeIcon from "@mui/icons-material/Upgrade";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

const initialBorrows = {
  borrowerName: "",
  borrowerMail: "",
  borrowingDate: "",
  returnDate: "",
  book: {
    author: {

    },
    publisher: {

    },
    categories: [

    ],
  },
};

function BuyingBooks() {
  const [newBorrow, setNewBorrow] = useState(initialBorrows);
  const [updateBorrow, setUpdateBorrow] = useState(initialBorrows);
  const [borrows, setBorrows] = useState([]);
  const [books, setBooks] = useState(null);
  const [update, setUpdate] = useState(false);
  const [alert, setAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  useEffect(() => {
    const borrowRequest = async () => {
      const res = await axios.get(import.meta.env.VITE_BASE_URL+"/api/v1/borrows");
      setBorrows(res.data);
      setUpdate(true);
    };

    const bookRequest = async () => {
      const res = await axios.get(import.meta.env.VITE_BASE_URL+"/api/v1/books");
      setBooks(res.data);
    };
    borrowRequest();
    bookRequest();
  }, [update]);

  // const body = {
  //   name: "Can Aydın",
  //   establishmentYear: 1,
  //   address: "Ankara",
  // };

  const handleBorrowsPost = async () => {
    console.log("Tıklandı!");
    try {
      const res = await axios.post(
        import.meta.env.VITE_BASE_URL+"/api/v1/borrows",
        newBorrow
      );
      setUpdate(false);
      setNewBorrow(initialBorrows);
      handleAlert("Borrow Added");
      console.log("Post başarılı:", res.data);
    } catch (error) {
      console.error("Post hatası:", error);
    }
  };

  const handleAlert = (alertM) => {
    setAlertMessage(alertM);
    setAlert(true);
    setTimeout(() => {
      setAlert(false);
    }, 3000);
  };

  const handleBorrowsDelete = async (id) => {
    console.log("Tıklandı");
    try {
      await axios.delete(import.meta.env.VITE_BASE_URL+`/api/v1/borrows/${id}`);
      handleAlert("Borrow Deleted");
      setUpdate(false);
      console.log("Delete başarılı:");
    } catch (error) {
      console.error("Delete hatası:", error);
    }
  };

  const handleUpdateForm = (borrow) => {
    setUpdateBorrow(borrow);
  };

  const handleUpdateBorrow = async () => {
    await axios.put(
      import.meta.env.VITE_BASE_URL+`/api/v1/borrows/${updateBorrow.id}`,
      updateBorrow
    );
    setUpdateBorrow(initialBorrows);
    handleAlert("Borrow Updated");
    setUpdate(false);
  };

  return (
    <>
      <section className=" bg-gray-300 h-[calc(100vh-100px)] flex py-10">
        <div className="container w-full max-w-5xl mx-auto flex flex-col gap-6">
          {alert && <h1>{alertMessage}</h1>}
          <div className="w-full grid grid-cols-6 gap-4">
            {Object.keys(initialBorrows).map((key) => {
              if (key !== "book") {
                return (
                  <TextField
                    key={key}
                    id="standard-basic"
                    type={key === "borrowingDate" && "returnDate" ? "date" : "text"}
                    label={key === "borrowingDate" && "returnDate" ? " " : key}
                    variant="standard"
                    value={newBorrow[key]}
                    onChange={(e) =>
                      setNewBorrow((prev) => ({
                        ...prev,
                        [key]: e.target.value,
                      }))
                    }
                  />
                );
              } else {
                return (
                  <div key={key}>
                    <InputLabel id="demo-simple-select-label">{key}</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={newBorrow.book.id}
                      label={key}
                      onChange={(e) => {
                        setNewBorrow((prev) => ({
                          ...prev,
                          book: { id: e.target.value },
                        }));
                      }}
                    >
                      {books?.map((book) => (
                        <MenuItem key={book.id} value={book.id}>
                          {book.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </div>
                );
              }
            })}
            <Button
              variant="contained"
              className="self-center"
              onClick={handleBorrowsPost}
            >
              Add New Book
            </Button>
          </div>
          <div className="w-full grid grid-cols-6 gap-4">
          {Object.keys(initialBorrows).map((key) => {
              if (key !== "book") {
                return (
                  <TextField
                    key={key}
                    id="standard-basic"
                    type={key === "borrowingDate" && "returnDate" ? "date" : "text"}
                    label={key === "borrowingDate" && "returnDate" ? " " : key}
                    variant="standard"
                    value={updateBorrow[key]}
                    onChange={(e) =>
                      setNewBorrow((prev) => ({
                        ...prev,
                        [key]: e.target.value,
                      }))
                    }
                  />
                );
              } else {
                return (
                  <div key={key}>
                    <InputLabel id="demo-simple-select-label">{key}</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={newBorrow.book.id}
                      label={key}
                      onChange={(e) => {
                        setUpdateBorrow((prev) => ({
                          ...prev,
                          book: { id: e.target.value },
                        }));
                      }}
                    >
                      {books?.map((book) => (
                        <MenuItem key={book.id} value={book.id}>
                          {book.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </div>
                );
              }
            })}
            <Button
              variant="contained"
              className="self-center"
              onClick={handleUpdateBorrow}
            >
              Update Borrow
            </Button>
          </div>

          <Typography variant="h3" className="text-center text-shadow">
            Borrows
          </Typography>
          <table className="min-w-full table-auto border-collapse">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 border-b text-center">Borrower Name</th>
                <th className="px-4 py-2 border-b text-center">
                Borrower Mail
                </th>
                <th className="px-4 py-2 border-b text-center">Borrowing Date</th>
                <th className="px-4 py-2 border-b text-center">Return Date</th>
                <th className="px-4 py-2 border-b text-center">Book Name</th>
                <th className="px-4 py-2 border-b text-center">Delete</th>
                <th className="px-4 py-2 border-b text-center">Update</th>
              </tr>
            </thead>
            <tbody>
              {borrows.length > 0 ? (
                books.map((borrow) => (
                  <tr key={borrow.id} className="hover:bg-gray-50">
                    <td className="px-4 py-2 border-b text-center">
                      {borrow.borrowerName}
                    </td>
                    <td className="px-4 py-2 border-b text-center">
                      {borrow.borrowerMail}
                    </td>
                    <td className="px-4 py-2 border-b text-center">
                      {borrow.borrowingDate}
                    </td>
                    <td className="px-4 py-2 border-b text-center">
                      {borrow.returnDate}
                    </td>
                    <td className="px-4 py-2 border-b text-center">
                      {borrow.book.name}
                    </td>
                    <td className="px-4 py-2 border-b border-black text-center">
                      <DeleteIcon
                        style={{
                          color: "red",
                          fontSize: "25px",
                          cursor: "pointer",
                        }}
                        onClick={() => handleBorrowsDelete(borrow.id)}
                      />
                    </td>
                    <td className="px-4 py-2 border-b text-center">
                      <UpgradeIcon
                        style={{
                          fontSize: "25px",
                          cursor: "pointer",
                        }}
                        onClick={() => handleUpdateForm(borrow)}
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="px-4 py-2 text-center">
                    Borrow not found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}

export default BuyingBooks;
