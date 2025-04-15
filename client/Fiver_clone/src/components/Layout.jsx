import React from "react";
import { Navbar } from "./Navbar";
import { Outlet, useLocation } from "react-router-dom";

export const Layout = () => {
  // const location = useLocation();
  // const noFooterPages = [];
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
         <Outlet />
      </main>
      {/* {!noFooterPages.includes(location.pathname) && <Footer />} */}
    </div>
  );
};
