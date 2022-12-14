import "./App.css";

import { createBrowserRouter } from "react-router-dom";

import Openlogin from "./components/openlogin";
import OpenloginMPC from "./components/openlogin-mpc";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Openlogin />,
  },
  {
    path: "/sapphire",
    element: <OpenloginMPC />,
  },
]);

export default router;
