import { Button, Drawer } from "@mui/material";
import React, { useRef, useState } from "react";
import { FaBars } from "react-icons/fa6";
import CustomSidebar from "./sidebar";
import AuthModal from "./Login";
import { Bell, Heart, Mail, Search } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const UserNavbar = () => {
  const navigate = useNavigate();
  const { role } = useSelector((state) => state.auth);

  const [searchOpen, setSearchOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };
  const [menuOpen, setMenuOpen] = useState(null);
  const handleClick = (id) => {
    setMenuOpen((prev) => (prev === id ? null : id));
  };

  return (
    <div className="flex justify-between items-center bg-white pr-5 pt-5 pb-5 lg:px-5">
      <AuthModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
      <div className="lg:hidden">
        <Button className="p-0" onClick={toggleDrawer(true)}>
          <FaBars className="text-2xl text-gray-900" />
        </Button>
        <Drawer open={open} onClose={toggleDrawer(false)}>
          <CustomSidebar />
        </Drawer>
      </div>

      <div>
        <h1
          onClick={() => navigate("/home")}
          className="text-3xl font-roboto font-extrabold text-gray-700 cursor-pointer"
        >
          Aiverr<span className=" text-green-500">.</span>
        </h1>
      </div>
      <div
        className="relative flex items-center  h-auto min-w-[500px]"
        ref={dropdownRef}
      >
        <input
          onClick={() => setSearchOpen(!searchOpen)}
          type="text"
          placeholder="What service are you looking for?"
          className="flex gap-4 items-center justify-center w-[250px] lg:w-full  h-[40px] bg-gray-100 rounded-md px-4 py-2 outline-none border border-black text-[12px] lg:text-sm "
        />
        <div className=" absolute hidden top-0 right-0 lg:flex items-center justify-center w-[50px] h-[40px] rounded-r-md bg-black/90 text-white cursor-pointer ">
          <Search size={20} />
        </div>
        {searchOpen && (
          <div className="absolute right-0 top-12 w-full bg-white rounded-md shadow-lg z-10 max-h-60 overflow-y-auto">
            <div className="px-4 py-2 text-sm cursor-pointer hover:bg-green-100">
              hello
            </div>
            <div className="px-4 py-2 text-sm cursor-pointer hover:bg-green-100">
              hello
            </div>
            <div className="px-4 py-2 text-sm cursor-pointer hover:bg-green-100">
              hello
            </div>
            <div className="px-4 py-2 text-sm cursor-pointer hover:bg-green-100">
              hello
            </div>
            {/* {categories.map((item, index) => (
              <div
                key={index}
                className={`px-4 py-2 text-sm cursor-pointer hover:bg-green-100 ${
                  item === value ? "bg-green-50 font-medium text-green-600" : ""
                }`}
                onClick={() => handleSelect(item)}
              >
               {item}
              </div>
            ))} */}
          </div>
        )}
      </div>
      {role === "FREELANCER" && (
        <div className="hidden lg:flex gap-5 items-center justify-center cursor-pointer relative">
          <p className=" text-[16px] font-medium text-[#62646A]">Orders</p>
          <p className=" text-[16px] font-medium text-green-500">
            Switch to Selling
          </p>
        </div>
      )}
      <div className="flex gap-6 items-center justify-center text-gray-500">
        <button
          onClick={() => handleClick(1)}
          className=" relative hidden lg:flex items-center justify-center cursor-pointer "
        >
          <Bell />
          <div
            className={`absolute right-0 top-12 z-10 ${
              menuOpen === 1 ? "block" : "hidden"
            } bg-white rounded-md shadow-2xl border border-gray-500/15 p-4 transition-all duration-500 min-w-[400px] min-h-[400px] max-h-[450px] overflow-autoflex flex-col gap-4`}
          >
            <div className="flex gap-4 p-5 border-b border-gray-300">
              <Bell size={20} />
              <p className="text-[15px] ">Notifications</p>
              <p>(1)</p>
            </div>
            <div>// Notifications content here</div>
          </div>
        </button>
        <button
          onClick={() => handleClick(2)}
          className=" relative hidden lg:flex items-center justify-center cursor-pointer "
        >
          <Mail />
          <div
            className={`absolute right-0 top-12 z-10 ${
              menuOpen === 2 ? "block" : "hidden"
            } bg-white rounded-md shadow-2xl border border-gray-500/15 p-4 transition-all duration-500 min-w-[400px] min-h-[400px] max-h-[450px] overflow-auto flex flex-col gap-4`}
          >
            <div className="flex gap-4 p-5 border-b border-gray-300">
              <Mail size={20} />
              <p className="text-[15px] ">Inbox</p>
              <p>(1)</p>
            </div>
            <div>// Messages content here</div>
          </div>
        </button>
        <button className=" hidden lg:flex items-center justify-center cursor-pointer ">
          <Heart />
        </button>
        <div className="hidden lg:flex items-center justify-center cursor-pointer relative">
          <img
            src="https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?t=st=1745584229~exp=1745587829~hmac=cd915b62a5e8afa00be08d73a57b5c135a74dac84612a39d28c50277baebd28a&w=900"
            alt="vector"
            className="w-8 h-8 rounded-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};
