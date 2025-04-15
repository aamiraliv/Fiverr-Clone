import { Button, Drawer } from "@mui/material";
import React, { useState } from "react";
import { FaBars } from "react-icons/fa6";
import CustomSidebar from "./sidebar";
import { IoIosArrowDown } from "react-icons/io";

export const Navbar = () => {
  const [open, setOpen] = useState(false);
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const [menuOpen ,setMenuOpen] = useState(false);

  return (
    <div className="flex justify-between items-center bg-white pr-5 pt-5 pb-5 lg:px-5">
      <div className="lg:hidden">
        <Button className="p-0" onClick={toggleDrawer(true)}>
          <FaBars className="text-2xl text-gray-900" />
        </Button>
        <Drawer open={open} onClose={toggleDrawer(false)}>
          <CustomSidebar />
        </Drawer>
      </div>
      <div>
        <h1 className="text-3xl font-roboto font-extrabold text-gray-700">
          fiverr<span className=" text-green-500">.</span>
        </h1>
      </div>
      <div className="flex gap-6 items-center justify-center ">
        <div className="flex gap-1 items-center justify-center text-gray-950 font-roboto font-semibold text-[17px] ">
          <p>Fiverr Pro</p>
          <IoIosArrowDown />
        </div>
        <p className=" text-sm font-bold font-roboto text-gray-600 border border-black px-4 py-2 rounded-md">Join</p>
      </div>
    </div>
  );
};
