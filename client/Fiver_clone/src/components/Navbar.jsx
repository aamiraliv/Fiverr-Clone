import { Button, Drawer } from "@mui/material";
import React, { useState } from "react";
import { FaBars } from "react-icons/fa6";
import CustomSidebar from "./sidebar";

export const Navbar = () => {
  const [open, setOpen] = useState(false);
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  return (
    <div className="flex justify-between items-center bg-white pr-5 pt-5">
      <div>
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
      <div>
        <p className=" text-sm font-bold font-roboto text-gray-800">Join</p>
      </div>
    </div>
  );
};
