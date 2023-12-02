import { Link } from "react-router-dom";
import styles from "./index.module.css";
import { useCallback, useEffect, useState } from "react";
import api from "../../services/config";
import { CellphoneModel } from "../../models/cellphoneModel";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  const [cellphones, setCellphones] = useState<CellphoneModel[]>([]);

  const deleteCellphone = async (cellphoneId: string) => {
    await api
      .delete(`/cellphones/${cellphoneId}`)
      .then(() => {
        toast.success("Cellphone deleted successfully", {
          position: "bottom-right",
        });
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      })
      .catch(() => {
        toast.error("Oops! An error ocurred!", {
          position: "bottom-right",
        });
      });
  };

  const formatDate = useCallback((date: string) => {
    const splitDates = date.split("T")[0].split("-");

    return `${splitDates[1]}/${splitDates[2]}/${splitDates[0]}`;
  }, []);

  useEffect(() => {
    const fetchCellphones = async () => {
      try {
        const data = await api.get("/cellphones").then((response) => {
          setCellphones(response.data);
        });
      } catch (error) {
        toast.error("Oops! An error ocurred!", {
          position: "bottom-right",
        });
      }
    };
    fetchCellphones();
  }, []);

  return (
    <>
      <Link to={"/new-cellphone"}>
        <button className={styles.new_cellphone}>New cellphone</button>
      </Link>
      {cellphones.length ? (
        <table className={styles.content}>
          <thead>
            <tr>
              <th>Brand</th>
              <th>Model</th>
              <th>Memory capacity (GB)</th>
              <th>Launch Date</th>
              <th>Alter</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {cellphones.map((cellphone, index) => (
              <tr key={index}>
                <td>{cellphone.brand}</td>
                <td>{cellphone.model}</td>
                <td>{cellphone.memory}</td>
                <td>{formatDate(cellphone.launchDate)}</td>
                <td>
                  <Link
                    to={`/new-cellphone/${cellphone._id}`}
                    state={{ selectedCellphone: cellphone }}
                  >
                    Alter
                  </Link>
                </td>
                <td>
                  <input
                    type="submit"
                    value={"Delete"}
                    onClick={() => deleteCellphone(cellphone._id)}
                  ></input>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No cellphones!</p>
      )}
      <ToastContainer hideProgressBar />
    </>
  );
}
