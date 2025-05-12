import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Footer } from "./Footer";
import { UserNavbar } from "./UserNavbar";
import { useSelector } from "react-redux";
import { Navbar } from "./Navbar";
import { Dashboard } from "../pages/Dashboard";

export const Layout = () => {
  const { isAuth } = useSelector((state) => state.auth);
  const location = useLocation();
  
  const noFooterPages = [];
  const noNavbarPages = ["/dashboard"];
  
  const shouldShowNavbar = !noNavbarPages.includes(location.pathname);
  const shouldShowFooter = !noFooterPages.includes(location.pathname);
  
  return (
    <div className="flex flex-col min-h-screen">
      <div className="fixed top-0 left-0 right-0 z-50 h-[80px] bg-white shadow-md">
        {isAuth ? 
          (shouldShowNavbar && <UserNavbar />) : 
          <Navbar />
        }
      </div>
      
      <main className="flex-grow pt-[80px]">
        <Outlet />
      </main>
      
      {shouldShowFooter && <Footer />}
    </div>
  );
};