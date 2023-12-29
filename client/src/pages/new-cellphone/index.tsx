import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./index.module.css";
import api from "../../services/config";
import { ToastContainer, toast } from "react-toastify";
import { useForm, SubmitHandler } from "react-hook-form";
import "react-toastify/dist/ReactToastify.css";

type InputsType = {
  _id: any;
  brand: string;
  model: string;
  memory: number;
  launchDate: Date;
};

export default function NewCellphonePage() {
  const { register, handleSubmit } = useForm<InputsType>();
  const _onSubmit: SubmitHandler<InputsType> = (data) => console.log(data);
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedCellphone } = location.state || {};
  const [formData, setFormData] = useState<InputsType>();
  const [isEditing, setIsEditing] = useState(false);

  const onSubmit = async (formData: InputsType) => {
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
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form_content}>
        <h1>New cellphone</h1>
        <hr />
        <span>* Fields required</span>

        <div>
          <div>
            <label htmlFor="brand">
              Brand <span>*</span>
            </label>
            <input
              {...register("brand", { required: true })}
              name="brand"
              id="brand"
              type="text"
              placeholder="Brand"

              // value={formData.brand}
              // onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="model">
              Model <span>*</span>
            </label>
            <input
              {...register("model", { required: true })}
              name="model"
              id="model"
              type="text"
              placeholder="Model"
              // value={formData.model}
              // onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="memory">
              Memory <span>*</span>
            </label>
            <input
              {...register("memory", { required: true })}
              name="memory"
              id="memory"
              type="number"
              placeholder="Memory"
              // value={formData.memory}
              // onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="launchDate">
              Launch date <span>*</span>
            </label>
            <input
              {...register("launchDate", { required: true, valueAsDate: true })}
              placeholder="00/00/0000"
              type="date"
              id="launchDate"
              name="launchDate"
              // name="launchDate"
              // id="launchDate"
              // type="date"
              // value={formData.launchDate.split("T")[0]}
              // placeholder="Launch date"
              // onChange={handleInputChange}
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
