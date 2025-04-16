import React from "react";
import { Navbar } from "./Navbar";
import { Outlet } from "react-router-dom";

export const Layout = () => {
  // const location = useLocation();
  // const noFooterPages = [];
  return (
    <div className="flex flex-col min-h-screen">
      <div className="fixed top-0 left-0 right-0 z-10 h-[80px] bg-white shadow-md">
        <Navbar />
      </div>

      <main className="flex-grow pt-[80px]">
        <Outlet />
      </main>
      {/* {!noFooterPages.includes(location.pathname) && <Footer />} */}
    </div>
  );
};
