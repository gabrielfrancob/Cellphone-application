import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./index.module.css";
import api from "../../services/config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function NewCellphonePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedCellphone } = location.state || {};
  const [formData, setFormData] = useState({
    _id: null,
    brand: "",
    model: "",
    memory: 0,
    launchDate: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const onSubmit = async (e: any) => {
    e.preventDefault();
    if (!isEditing) {
      await api
        .post("/cellphones", formData)
        .then(() => {
          navigate("/");
          setTimeout(() => {
            toast.success("You created a cellphone!", {
              position: "bottom-right",
            }),
              1;
          });
        })
        .catch(() => {
          toast.error("Oops! Some fields could be empty", {
            position: "bottom-right",
          });
        });
    } else {
      await api
        .patch(`/cellphones/${formData._id}`, formData)
        .then(() => {
          navigate("/");
          setTimeout(() => {
            toast.success("You updated a cellphone!", {
              position: "bottom-right",
            }),
              1;
          });
        })
        .catch(() => {
          toast.error("Oops! An error ocurred!", {
            position: "bottom-right",
          });
        });
    }
  };

  useEffect(() => {
    if (selectedCellphone) {
      setFormData(selectedCellphone);
      setIsEditing(true);
    }
  }, []);

  return (
    <>
      <form onSubmit={onSubmit} className={styles.form_content}>
        <h1>New cellphone</h1>
        <hr />
        <span>* Fields required</span>

        <div>
          <div>
            <label htmlFor="brand">
              Brand <span>*</span>
            </label>
            <input
              name="brand"
              id="brand"
              type="text"
              value={formData.brand}
              placeholder="Brand"
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="model">
              Model <span>*</span>
            </label>
            <input
              name="model"
              id="model"
              type="text"
              value={formData.model}
              placeholder="Model"
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="memory">
              Memory <span>*</span>
            </label>
            <input
              name="memory"
              id="memory"
              type="number"
              value={formData.memory}
              placeholder="Memory"
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="launchDate">
              Launch date <span>*</span>
            </label>
            <input
              name="launchDate"
              id="launchDate"
              type="date"
              value={formData.launchDate.split("T")[0]}
              placeholder="Launch date"
              onChange={handleInputChange}
            />
          </div>
          <div className={styles.button_group}>
            <Link to={"/"}>
              <button className={styles.cancel_button}>Cancel</button>
            </Link>
            <button type="submit" className={styles.submit_button}>
              {isEditing ? "Edit" : "Submit"}
            </button>
          </div>
        </div>
      </form>
      <ToastContainer hideProgressBar />
    </>
  );
}
