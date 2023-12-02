import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/home";
import NewCellphonePage from "../pages/new-cellphone";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/new-cellphone/:id?",
    element: <NewCellphonePage />,
  },
]);
