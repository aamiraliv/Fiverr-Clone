import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { Landing } from "./pages/Landing";
import { GigForm } from "./pages/GigForm";
import { Toaster } from "react-hot-toast";
import PrivateRoute from "./utils/PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        element: <PrivateRoute />,
        children: [
          {
            path: "/home",
            element: <Landing />,
          },
          {
            path: "/gigform",
            element: <GigForm />,
          },
        ],
      },
    ],
  },
]);

const App = () => {
  return (
    <>
      <RouterProvider router={router} />;
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
};

export default App;
