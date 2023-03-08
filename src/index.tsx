import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Profile from "./pages/profile"
import CreateBounty from "./pages/createBounty";
import BountyFullInfo from "./pages/bountyFullInfo";

const router = createBrowserRouter([
  {
    children: [
      {
        path:"/",
        element: <App />
      },
      {
        path:"profile/:id",
        element: <Profile />
      },
      {
        path:"create",
        element:<CreateBounty />
      },
      {
        path:"/b/:id",
        element: <BountyFullInfo />
      }
    ],
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  
   <RouterProvider router={router} />
  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
