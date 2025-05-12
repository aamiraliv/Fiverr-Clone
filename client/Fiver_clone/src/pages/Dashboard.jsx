import React from "react";
import { DashboardNav } from "../components/DashbordNav";
import { Outlet } from "react-router-dom";

export const Dashboard = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="fixed top-0 left-0 right-0 z-50 h-[80px] bg-white shadow-md">
        <DashboardNav />
      </div>

      <main className="flex-grow ">
        <Outlet />
      </main>
    </div>
  );
};
