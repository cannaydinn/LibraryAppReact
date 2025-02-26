import axios from "axios";
import { useState, useEffect } from "react";
import "./author.css";
import { Button, TextField, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import UpgradeIcon from "@mui/icons-material/Upgrade";

const initialAuthor = {
  name: "",
  birthDate: "",
  country: ""
};

function Author() {
  const [newAuthor, setNewAuthor] = useState(initialAuthor);
  const [updateAuthor, setUpdateAuthor] = useState(initialAuthor);
  const [authors, setAuthors] = useState([]);
  const [update, setUpdate] = useState(false);
  const [alert, setAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  useEffect(() => {
    const request = async () => {
      const res = await axios.get(import.meta.env.VITE_BASE_URL + "/api/v1/authors");
      setAuthors(res.data);
      setUpdate(true);
    };
    request();
  }, [update]);

  // const body = {
  //   name: "Can Aydın",
  //   establishmentYear: 1,
  //   address: "Ankara",
  // };

  const handleAuthorsPost = async () => {
    console.log("Tıklandı!");
    try {
      const res = await axios.post(
        import.meta.env.VITE_BASE_URL + "/api/v1/authors",
        newAuthor
      );
      setUpdate(false);
      setNewAuthor(initialAuthor);
      handleAlert("Author Added");
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

  const handleAuthorsDelete = async (id) => {
    console.log("Tıklandı");
    try {
      await axios.delete(import.meta.env.VITE_BASE_URL + `/api/v1/authors/${id}`);
      handleAlert("Author Deleted");
      setUpdate(false);
      console.log("Delete başarılı:");
    } catch (error) {
      console.error("Delete hatası:", error);
    }
  };

  const handleUpdateForm = (author) => {
    setUpdateAuthor(author);
  };

  const handleUpdateAuthor = async () => {
    await axios.put(import.meta.env.VITE_BASE_URL + `/api/v1/authors/${updateAuthor.id}`, updateAuthor);
    setUpdateAuthor(initialAuthor);
    handleAlert("Author Updated");
    setUpdate(false);
  };

  return (
    <>
      <section className=" bg-gray-300 h-[calc(100vh-100px)] flex py-10">
        <div className="container w-full max-w-5xl mx-auto flex flex-col gap-6">
          {alert && <h1>{alertMessage}</h1>}
          <div className="w-full grid grid-cols-4 gap-4">
            {Object.keys(initialAuthor).map((key) => (
              <TextField
                key={key}
                id="standard-basic"
                type={key === "birthDate" ? "date" : "text"}
                label={key === "birthDate" ? " " : key}
                variant="standard"
                value={newAuthor[key]}
                onChange={(e) =>
                  setNewAuthor((prev) => ({
                    ...prev,
                    [key]: e.target.value,
                  }))
                }
              />
            ))}
            <Button
              variant="contained"
              className="self-center"
              onClick={handleAuthorsPost}
            >
              Add New Author
            </Button>
          </div>
          <div className="w-full grid grid-cols-4 gap-4">
            {Object.keys(initialAuthor).map((key) => (
              <TextField
                key={key}
                id="standard-basic"
                type={key === "birthDate" ? "date" : "text"}
                label={key === "birthDate" ? " " : key}
                variant="standard"
                value={updateAuthor[key]}
                onChange={(e) =>
                  setUpdateAuthor((prev) => ({
                    ...prev,
                    [key]: e.target.value,
                  }))
                }
              />
            ))}
            <Button
              variant="contained"
              className="self-center"
              onClick={handleUpdateAuthor}
            >
              Update Author
            </Button>
          </div>

          <Typography variant="h3" className="text-center text-shadow">
            Authors
          </Typography>
          <table className="min-w-full table-auto border-collapse">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 border-b text-center">
                  Author Name
                </th>
                <th className="px-4 py-2 border-b text-center">
                  Birth Date
                </th>
                <th className="px-4 py-2 border-b text-center">
                  Country
                </th>
                <th className="px-4 py-2 border-b text-center">Delete</th>
                <th className="px-4 py-2 border-b text-center">Update</th>
              </tr>
            </thead>
            <tbody>
              {authors.length > 0 ? (
                authors.map((author) => (
                  <tr key={author.id} className="hover:bg-gray-50">
                    <td className="px-4 py-2 border-b text-center">
                      {author.name}
                    </td>
                    <td className="px-4 py-2 border-b text-center">
                      {author.birthDate}
                    </td>
                    <td className="px-4 py-2 border-b text-center">
                      {author.country}
                    </td>
                    <td className="px-4 py-2 border-b border-black text-center">
                      <DeleteIcon
                        style={{
                          color: "red",
                          fontSize: "25px",
                          cursor: "pointer",
                        }}
                        onClick={() => handleAuthorsDelete(author.id)}
                      />
                    </td>
                    <td className="px-4 py-2 border-b text-center">
                      <UpgradeIcon
                        style={{
                          fontSize: "25px",
                          cursor: "pointer",
                        }}
                        onClick={() => handleUpdateForm(author)}
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-4 py-2 text-center">
                  Author not found.
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

export default Author;
