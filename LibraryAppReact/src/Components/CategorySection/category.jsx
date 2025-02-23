import axios from "axios";
import { useState, useEffect } from "react";
import "./category.css";
import { Button, TextField, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import UpgradeIcon from "@mui/icons-material/Upgrade";

const initialCategory = {
  name: "",
  description: ""
};

function Category() {
  const [newCategory, setNewCategory] = useState(initialCategory);
  const [updateCategory, setUpdateCategory] = useState(initialCategory);
  const [categories, setCategories] = useState([]);
  const [update, setUpdate] = useState(false);
  const [alert, setAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  useEffect(() => {
    const request = async () => {
      const res = await axios.get(import.meta.env.VITE_BASE_URL+"/api/v1/categories");
      setCategories(res.data);
      setUpdate(true);
    };
    request();
  }, [update]);

  // const body = {
  //   name: "Can Aydın",
  //   establishmentYear: 1,
  //   address: "Ankara",
  // };

  const handleCategoriesPost = async () => {
    console.log("Tıklandı!");
    try {
      const res = await axios.post(
        import.meta.env.VITE_BASE_URL+"/api/v1/categories",
        newCategory
      );
      setUpdate(false);
      setNewCategory(initialCategory);
      handleAlert("Category Added");
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

  const handleCategoriesDelete = async (id) => {
    console.log("Tıklandı");
    try {
      axios.delete(import.meta.env.VITE_BASE_URL+`/api/v1/categories/${id}`);
      handleAlert("Category Deleted");
      setUpdate(false);
      console.log("Delete başarılı:");
    } catch (error) {
      console.error("Delete hatası:", error);
    }
  };

  const handleUpdateForm = (category) => {
    setUpdateCategory(category);
  };

  const handleUpdateCategory = async () => {
    await axios.put(import.meta.env.VITE_BASE_URL+`/api/v1/categories/${updateCategory.id}`, updateCategory);
    setUpdateCategory(initialCategory);
    handleAlert("Category Updated");
    setUpdate(false);
  };

  return (
    <>
      <section className="bg-gray-300 h-[calc(100vh-100px)] flex py-10">
        <div className="container w-full max-w-5xl mx-auto flex flex-col gap-6">
          {alert && <h1>{alertMessage}</h1>}
          <div className="w-full grid grid-cols-3 gap-4">
            {Object.keys(initialCategory).map((key) => (
              <TextField
                key={key}
                id="standard-basic"
                label={key}
                variant="standard"
                value={newCategory[key]}
                onChange={(e) =>
                  setNewCategory((prev) => ({
                    ...prev,
                    [key]: e.target.value,
                  }))
                }
              />
            ))}
            <Button
              variant="contained"
              className="self-center"
              onClick={handleCategoriesPost}
            >
              Add New Category
            </Button>
          </div>
          <div className="w-full grid grid-cols-3 gap-4">
            {Object.keys(initialCategory).map((key) => (
              <TextField
                key={key}
                id="standard-basic"
                label={key}
                variant="standard"
                value={updateCategory[key]}
                onChange={(e) =>
                  setUpdateCategory((prev) => ({
                    ...prev,
                    [key]: e.target.value,
                  }))
                }
              />
            ))}
            <Button
              variant="contained"
              className="self-center"
              onClick={handleUpdateCategory}
            >
              Update Category
            </Button>
          </div>

          <Typography variant="h3" className="text-center text-shadow">
            Categories
          </Typography>
          <table className="min-w-full table-auto border-collapse">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 border-b text-center">
                  Category Name
                </th>
                <th className="px-4 py-2 border-b text-center">
                  Description
                </th>
                <th className="px-4 py-2 border-b text-center">Delete</th>
                <th className="px-4 py-2 border-b text-center">Update</th>
              </tr>
            </thead>
            <tbody>
              {categories.length > 0 ? (
                categories.map((category) => (
                  <tr key={category.id} className="hover:bg-gray-50">
                    <td className="px-4 py-2 border-b text-center">
                      {category.name}
                    </td>
                    <td className="px-4 py-2 border-b text-center">
                      {category.description}
                    </td>
                    <td className="px-4 py-2 border-b border-black text-center">
                      <DeleteIcon
                        style={{
                          color: "red",
                          fontSize: "25px",
                          cursor: "pointer",
                        }}
                        onClick={() => handleCategoriesDelete(category.id)}
                      />
                    </td>
                    <td className="px-4 py-2 border-b text-center">
                      <UpgradeIcon
                        style={{
                          fontSize: "25px",
                          cursor: "pointer",
                        }}
                        onClick={() => handleUpdateForm(category)}
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-4 py-2 text-center">
                  Category not found.
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

export default Category;
