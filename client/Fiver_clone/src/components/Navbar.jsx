import React from "react";
import { FaBars } from "react-icons/fa6";

export const Navbar = () => {
  return (
    <div className="flex justify-between items-center bg-white p-5">
      <div>
        <FaBars className="text-2xl"/>
      </div>
      <div>
        <h1 className="text-3xl font-roboto font-extrabold text-gray-700">
          fiverr<span className=" text-green-500">.</span>
        </h1>
      </div>
      <div >
        <p className=" text-sm font-bold font-roboto text-gray-800">Join</p>
      </div>
    </div>
  );
};
