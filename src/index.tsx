import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Profile from "./pages/profile";
import CreateBounty from "./pages/createBounty";
import Fiat1 from "./pages/fiat/fiat1";
import Fiat2 from "./pages/fiat/fiat2";
import Fiat3 from "./pages/fiat/fiat3";
import Fiat4 from "./pages/fiat/fiat4";
import Fiat5 from "./pages/fiat/fiat5";
import Fiat6 from "./pages/fiat/fiat6";
import Fiat7 from "./pages/fiat/fiat7";
import BountyFullInfo from "./pages/bountyFullInfo";
import EditBounty from "./pages/editBounty";
import DesignBounties from "./pages/tags/designBounties";
import WritingBounties from "./pages/tags/writingBounties";
import DebuggingBounties from "./pages/tags/debugginBounties";
import DevelopmentBounties from "./pages/tags/developmentBounties";
import MarketingBounties from "./pages/tags/marketingBounties";
import CybersecurityBounties from "./pages/tags/cybersecurityBounties";

const router = createBrowserRouter([
  {
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
        path: "/fiat1",
        element: <Fiat1 />,
      },
      {
        path: "/fiat2",
        element: <Fiat2 />,
      },
      {
        path: "/fiat3",
        element: <Fiat3 />,
      },
      {
        path: "/fiat4",
        element: <Fiat4 />,
      },
      {
        path: "/fiat5",
        element: <Fiat5 />,
      },
      {
        path: "/fiat6",
        element: <Fiat6 />,
      },
      {
        path: "/fiat7",
        element: <Fiat7 />,
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
