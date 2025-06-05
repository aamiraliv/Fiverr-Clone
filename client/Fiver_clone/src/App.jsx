import React, { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { Landing } from "./pages/Landing";
import { GigForm } from "./pages/GigForm";
import { Toaster } from "react-hot-toast";
import PrivateRoute from "./utils/PrivateRoute";
import { UserProfile } from "./pages/UserProfile";
import { Dashboard } from "./pages/Dashboard";
import DashboardPage from "./pages/DashboardPage";
import Gig from "./pages/Gig";
import GigPreview from "./pages/GigPreview";
import OrderCheckout from "./pages/OrderCheckout";
import PaymentPage from "./pages/PaymentPage";
import { UserOrders } from "./pages/UserOrders";
import { SellerOrders } from "./pages/SellerOrders";
import FreelancerRoute from "./utils/FreelancerRoute";
import useAutoRefreshToken from "./utils/useAutoRefreshToken";
import { getCurrentUser } from "./redux/AuthSlice/authSlice";
import { useDispatch } from "react-redux";
import GigsDisplayPage from "./pages/GigsDisplayPage";

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
            path: "/user",
            element: <UserProfile />,
          },
          {
            path:"/allgigs",
            element: <GigsDisplayPage />,
          },
          {
            path: "/gigpreview/:id",
            element: <GigPreview />,
          },
          {
            path: "/checkout/:id",
            element: <OrderCheckout />,
          },
          {
            path: "/checkout/payment/:id/:orderId",
            element: <PaymentPage />,
          },
          {
            path: "/userorders",
            element: <UserOrders />,
          },
          {
            element: <FreelancerRoute />,
            children: [
              {
                element: <Dashboard />,
                children: [
                  {
                    path: "/dashboard",
                    element: <DashboardPage />,
                  },
                  {
                    path: "/dashboard/gig",
                    element: <Gig />,
                  },
                  {
                    path: "/dashboard/orders",
                    element: <SellerOrders />,
                  },
                  {
                    path: "/gigform",
                    element: <GigForm />,
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
]);

const App = () => {
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(getCurrentUser());
  }, [dispatch]);
  useAutoRefreshToken();
  return (
    <>
      <RouterProvider router={router} />;
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
};

export default App;
