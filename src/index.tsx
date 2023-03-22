import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Profile from "./pages/profile";
import CreateBounty from "./pages/createBounty";
import BountyFullInfo from "./pages/bountyFullInfo";
import EditBounty from "./pages/editBounty";
import DesignBounties from "./pages/tags/designBounties";
import WritingBounties from "./pages/tags/writingBounties";
import DebuggingBounties from "./pages/tags/debugginBounties";
import DevelopmentBounties from "./pages/tags/developmentBounties";
import MarketingBounties from "./pages/tags/marketingBounties";
import CybersecurityBounties from "./pages/tags/cybersecurityBounties";
import Error404 from "./pages/error";
import Relays from "./pages/relays";

const router = createBrowserRouter([
  { errorElement: <Error404 />,
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "profile/:id",
        element: <Profile />,
      },
      {
        path: "create",
        element: <CreateBounty />,
      },
      {
        path: "/b/:id",
        element: <BountyFullInfo />,
      },
      {
        path: "/edit/:id",
        element: <EditBounty />,
      },

      {
        path: "/tag/design",
        element: <DesignBounties />,
      },
      {
        path: "/tag/writing",
        element: <WritingBounties />,
      },
      {
        path: "/tag/debugging",
        element: <DebuggingBounties />,
      },
      {
        path: "/tag/cybersecurity",
        element: <CybersecurityBounties />,
      },
      {
        path: "/tag/development",
        element: <DevelopmentBounties />,
      },
      {
        path: "/tag/marketing",
        element: <MarketingBounties />,
      },
      {
        path: "/relays",
        element: <Relays />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(<RouterProvider router={router} />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
