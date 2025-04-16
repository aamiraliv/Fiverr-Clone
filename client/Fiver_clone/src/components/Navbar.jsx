import { Button, Drawer } from "@mui/material";
import React, { useState } from "react";
import { FaBars } from "react-icons/fa6";
import CustomSidebar from "./sidebar";
import { IoIosArrowDown } from "react-icons/io";
import vector1 from "../assets/vector_1.svg";
import vector2 from "../assets/vector_2.svg";

export const Navbar = () => {
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
        <div className="relative hidden lg:block cursor-pointer">
          <div
            onClick={() => handleClick(1)}
            className="flex gap-1 items-center justify-center text-gray-950 font-roboto font-semibold text-[17px] "
          >
            <p className=" text-[16px] font-medium text-[#62646A]">
              Fiverr Pro
            </p>
            {menuOpen === 1 ? (
              <IoIosArrowDown className="rotate-180 transition duration-500 text-[#62646A]" />
            ) : (
              <IoIosArrowDown className=" transition-transform duration-500 text-[#62646A]" />
            )}
          </div>
          <div
            className={`absolute right-0 z-10 ${
              menuOpen === 1 ? "block" : "hidden"
            } bg-white rounded-md shadow-2xl border border-gray-500/15 p-4 transition-all duration-500 w-max flex flex-col gap-4`}
          >
            <div className="flex gap-2 items-center justify-center bg-white rounded-md p-4 border border-gray-300 w-auto">
              <div>
                <img src={vector1} alt="image" className="h-12" />
              </div>
              <div className="flex flex-col gap-1">
                <h1 className=" font-bold text-[15px] text-gray-700">
                  i'am looking to hire
                </h1>
                <p className="font-normal text-gray-600 text-sm">
                  My team needs vetted freelance talent <br /> and a premium
                  business solution.
                </p>
              </div>
            </div>
            <div className="flex gap-2 items-center justify-center bg-white rounded-md p-4 border border-gray-300 w-auto">
              <div>
                <img src={vector2} alt="image" className="h-12" />
              </div>
              <div className="flex flex-col gap-1">
                <h1 className=" font-bold text-[15px] text-gray-700">
                  I want to offer Pro services
                </h1>
                <p className="font-normal text-gray-600 text-sm">
                  I’d like to work on business projects as a <br /> Pro
                  freelancer or agency.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative hidden lg:block cursor-pointer">
          <div
            onClick={() => handleClick(2)}
            className="flex gap-1 items-center justify-center text-gray-950 font-roboto font-semibold text-[17px] "
          >
            <p className=" text-[16px] font-medium text-[#62646A]">Explore</p>
            {menuOpen === 2 ? (
              <IoIosArrowDown className="rotate-180 transition duration-500 text-[#62646A]" />
            ) : (
              <IoIosArrowDown className=" transition-transform duration-500 text-[#62646A]" />
            )}
          </div>
          <div
            className={`absolute left-0 z-10 ${
              menuOpen === 2 ? "block" : "hidden"
            } bg-white rounded-md shadow-2xl border border-gray-500/15 p-4 transition-all duration-500 w-max flex flex-col gap-4`}
          >
            <div className="flex flex-col gap-1  bg-white rounded-md p-4 w-auto">
              <div className="flex flex-col gap-1 hover:bg-gray-100 p-2 rounded-md cursor-pointer">
                <h1 className=" font-bold text-[15px] text-gray-700">Go</h1>
                <p className="font-normal text-gray-600 text-sm">
                  Access a world of instant creativity and talent
                </p>
              </div>
              <div className="flex flex-col gap-1 hover:bg-gray-100 p-2 rounded-md cursor-pointer">
                <h1 className=" font-bold text-[15px] text-gray-700">
                  Answers
                </h1>
                <p className="font-normal text-gray-600 text-sm">
                  Powered by AI, answered by Fiverr freelancers
                </p>
              </div>
              <div className="flex flex-col gap-1 hover:bg-gray-100 p-2 rounded-md cursor-pointer">
                <h1 className=" font-bold text-[15px] text-gray-700">
                  Community
                </h1>
                <p className="font-normal text-gray-600 text-sm">
                  Connect with Fiverrs team and community
                </p>
              </div>
              <div className="flex flex-col gap-1 hover:bg-gray-100 p-2 rounded-md cursor-pointer">
                <h1 className=" font-bold text-[15px] text-gray-700">Guides</h1>
                <p className="font-normal text-gray-600 text-sm">
                  In-depth guides covering business topics
                </p>
              </div>
              <div className="flex flex-col gap-1 hover:bg-gray-100 p-2 rounded-md cursor-pointer">
                <h1 className=" font-bold text-[15px] text-gray-700">
                  Podcast
                </h1>
                <p className="font-normal text-gray-600 text-sm">
                  Inside tips from top business minds
                </p>
              </div>
              <div className="flex flex-col gap-1 hover:bg-gray-100 p-2 rounded-md cursor-pointer">
                <h1 className=" font-bold text-[15px] text-gray-700">Learn</h1>
                <p className="font-normal text-gray-600 text-sm">
                  Professional online courses, led by experts
                </p>
              </div>
              <div className="flex flex-col gap-1 hover:bg-gray-100 p-2 rounded-md cursor-pointer">
                <h1 className=" font-bold text-[15px] text-gray-700">Blog</h1>
                <p className="font-normal text-gray-600 text-sm">
                  News, information and community stories
                </p>
              </div>
              <div className="flex flex-col gap-1 hover:bg-gray-100 p-2 rounded-md cursor-pointer">
                <h1 className=" font-bold text-[15px] text-gray-700">
                  Logo Maker
                </h1>
                <p className="font-normal text-gray-600 text-sm">
                  Create your logo instantly
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative hidden lg:block cursor-pointer">
          <p className=" text-[16px] font-medium text-[#62646A]">
            Become a Seller
          </p>
        </div>

        <div className="relative hidden lg:block cursor-pointer">
          <p className=" text-[16px] font-medium text-[#62646A]">
           Sign in
          </p>
        </div>

        <p className=" text-sm font-bold font-roboto text-gray-600 border border-black px-4 py-2 rounded-md hover:text-white hover:bg-gray-900 cursor-pointer transition duration-300 ">
          Join
        </p>
      </div>
    </div>
  );
};
