import axios from "axios";
import { useState, useEffect } from "react";
import "./publisher.css";
import { Button, TextField, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import UpgradeIcon from "@mui/icons-material/Upgrade";

const initialPublisher = {
  name: "",
  establishmentYear: "",
  address: "",
};

function Publisher() {
  const [newPublisher, setNewPublisher] = useState(initialPublisher);
  const [updatePublisher, setUpdatePublisher] = useState(initialPublisher);
  const [publishers, setPublishers] = useState([]);
  const [update, setUpdate] = useState(false);
  const [alert, setAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  useEffect(() => {
    const request = async () => {
      const res = await axios.get(import.meta.env.VITE_BASE_URL+"/api/v1/publishers");
      setPublishers(res.data);
      setUpdate(true);
    };
    request();
  }, [update]);

  // const body = {
  //   name: "Can Aydın",
  //   establishmentYear: 1,
  //   address: "Ankara",
  // };

  const handlePublishersPost = async () => {
    console.log("Tıklandı!");
    try {
      const res = await axios.post(
        import.meta.env.VITE_BASE_URL+"/api/v1/publishers",
        newPublisher
      );
      setUpdate(false);
      setNewPublisher(initialPublisher);
      handleAlert("Publisher Added");
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

  const handlePublishersDelete = async (id) => {
    console.log("Tıklandı");
    try {
      axios.delete(import.meta.env.VITE_BASE_URL+`/api/v1/publishers/${id}`);
      handleAlert("Publisher Deleted");
      setUpdate(false);
      console.log("Delete başarılı:");
    } catch (error) {
      console.error("Delete hatası:", error);
    }
  };

  const handleUpdateForm = (publisher) => {
    setUpdatePublisher(publisher);
  };

  const handleUpdatePublisher = async () => {
    await axios.put(import.meta.env.VITE_BASE_URL+`/api/v1/publishers/${updatePublisher.id}`, updatePublisher);
    setUpdatePublisher(initialPublisher);
    handleAlert("Publisher Updated");
    setUpdate(false);
  };

  return (
    <>
      <section className="publisher bg-gray-300 h-[calc(100vh-100px)] flex py-10">
        <div className="container w-full max-w-5xl mx-auto flex flex-col gap-6">
          {alert && <h1>{alertMessage}</h1>}
          <div className="w-full grid grid-cols-4 gap-4">
            {Object.keys(initialPublisher).map((key) => (
              <TextField
                key={key}
                id="standard-basic"
                label={key}
                variant="standard"
                value={newPublisher[key]}
                onChange={(e) =>
                  setNewPublisher((prev) => ({
                    ...prev,
                    [key]: e.target.value,
                  }))
                }
              />
            ))}
            <Button
              variant="contained"
              className="self-center"
              onClick={handlePublishersPost}
            >
              Add New Publisher
            </Button>
          </div>
          <div className="w-full grid grid-cols-4 gap-4">
            {Object.keys(initialPublisher).map((key) => (
              <TextField
                key={key}
                id="standard-basic"
                label={key}
                variant="standard"
                value={updatePublisher[key]}
                onChange={(e) =>
                  setUpdatePublisher((prev) => ({
                    ...prev,
                    [key]: e.target.value,
                  }))
                }
              />
            ))}
            <Button
              variant="contained"
              className="self-center"
              onClick={handleUpdatePublisher}
            >
              Update Publisher
            </Button>
          </div>

          <Typography variant="h3" className="text-center text-shadow">
            Publishers
          </Typography>
          <table className="min-w-full table-auto border-collapse">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 border-b text-center">
                  Publisher Name
                </th>
                <th className="px-4 py-2 border-b text-center">
                  Establishment Year
                </th>
                <th className="px-4 py-2 border-b text-center">Address</th>
                <th className="px-4 py-2 border-b text-center">Delete</th>
                <th className="px-4 py-2 border-b text-center">Update</th>
              </tr>
            </thead>
            <tbody>
              {publishers.length > 0 ? (
                publishers.map((publisher) => (
                  <tr key={publisher.id} className="hover:bg-gray-50">
                    <td className="px-4 py-2 border-b text-center">
                      {publisher.name}
                    </td>
                    <td className="px-4 py-2 border-b text-center">
                      {publisher.establishmentYear}
                    </td>
                    <td className="px-4 py-2 border-b text-center">
                      {publisher.address}
                    </td>
                    <td className="px-4 py-2 border-b border-black text-center">
                      <DeleteIcon
                        style={{
                          color: "red",
                          fontSize: "25px",
                          cursor: "pointer",
                        }}
                        onClick={() => handlePublishersDelete(publisher.id)}
                      />
                    </td>
                    <td className="px-4 py-2 border-b text-center">
                      <UpgradeIcon
                        style={{
                          fontSize: "25px",
                          cursor: "pointer",
                        }}
                        onClick={() => handleUpdateForm(publisher)}
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-4 py-2 text-center">
                    Publisher not found.
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

export default Publisher;
