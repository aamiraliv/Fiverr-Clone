import React from "react";
import { IoSearch } from "react-icons/io5";

export const Home = () => {
  return (
    <div>
      <div
        className="flex flex-col justify-center pb-8 bg-gradient-to-b from-green-950 to-green-700
"
      >
        <h1 className="text-3xl font-light font-poppins text-white text-center">
          Our freelancers
          <br />
          will take it from here
        </h1>
        <br />
        <div className="flex justify-center items-center ">
          <div className="relative">
            <input
              type="text"
              name=""
              id=""
              placeholder="try building mobile app"
              className="text-gray-600 font-roboto text-[17px] rounded-lg pl-4 pr-10 py-2 outline-none bg-white relative"
            />
            <div className="absolute right-1 top-1 p-2 rounded-lg bg-green-900 text-white">
              <IoSearch />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
