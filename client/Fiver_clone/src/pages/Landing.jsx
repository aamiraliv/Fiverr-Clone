import React from "react";
import { GigCard } from "../components/GigCard";
import gigs from "../../json/gigmockdata";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { MasonaryGrid } from "../components/MasonaryGrid";
import masonary from "../../json/masonary";
import { BiArrowToRight } from "react-icons/bi";
import { MdKeyboardArrowRight } from "react-icons/md";

export const Landing = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="relative flex flex-col gap-2 w-full h-[200px]">
        <div className="absolute p-8 max-w-[500px]">
          <p className="text-3xl font-grotesk font-semibold text-white">
            Meet Fiverr Go
          </p>
          <p className="text-sm font-normal text-white">
            Meet Fiverr Go Choose a freelancer's personal AI model and instantly
            generate work in their distinct style.
          </p>
        </div>
        <video
          src="https://res.cloudinary.com/dntsodqdy/video/upload/v1745575020/LIHP-narrow-desktop_kyocp3.mp4"
          className="w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
        />
        <div className=" absolute w-full -bottom-25 m-auto grid grid-cols-2 gap-4 p-10">
          <div className="flex flex-col gap-2 p-4 rounded-lg bg-white shadow-lg">
            <h1 className="font-normal text-gray-500 text-sm">
              RECOMMENDED FOR YOU
            </h1>
            <div className="flex justify-between items-center w-[500px]">
              <div className="flex gap-2">
                <img
                  src="https://res.cloudinary.com/dntsodqdy/image/upload/v1745575418/image_20_281_29_owqfan.png"
                  alt=""
                  className="h-12 w-12 rounded-full"
                />
                <div className="flex flex-col gap-1">
                  <p className="font-semibold text-sm">Post a project brief</p>
                  <p className="font-normal text-sm text-gray-900">
                    Get tailored offers for your needs.
                  </p>
                </div>
              </div>
              <div>
                <button className="py-2 px-4 rounded-md bg-white text-black border border-black hover:bg-black hover:text-white transition duration-300 ease-in-out">
                  Get Started
                </button>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2 p-4 rounded-lg bg-white shadow-lg">
            <h1 className="font-normal text-gray-500 text-sm">
              BUSINESS RECOMMENDATIONS
            </h1>
            <div className="flex justify-between items-center w-[500px]">
              <div className="flex gap-2">
                <img
                  src="https://res.cloudinary.com/dntsodqdy/image/upload/v1745575442/jtbd_briefcase_ggxblh.png"
                  alt=""
                  className="h-12 w-12 rounded-full"
                />
                <div className="flex flex-col gap-1">
                  <p className="font-semibold text-sm">
                    Tailor Fiverr to your needs
                  </p>
                  <p className="font-normal text-sm text-gray-900">
                    Tell us a bit about your business.
                  </p>
                </div>
              </div>
              <div>
                <button className="py-2 px-4 rounded-md bg-white text-black border border-black hover:bg-black hover:text-white transition duration-300 ease-in-out">
                  Add Your Info
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4 mt-12 p-8">
        <div className="Based-on-what-you-might-be-looking-for flex flex-col gap-8">
          <h1 className=" relative font-semibold text-black text-2xl">
            Based on what you might be looking for
            <div className="z-10 absolute flex right-0 top-0 items-center gap-3">
              <button className="prev-btn flex items-center justify-center transform w-8 h-8 rounded-full text-black/50 font-medium bg-white shadow-md hover:bg-gray-200 transition duration-300 ease-in-out">
                <IoIosArrowBack size={20} />
              </button>
              <button className="next-btn flex items-center justify-center transform w-8 h-8 rounded-full text-black/50 font-medium bg-white shadow-md hover:bg-gray-200 transition duration-300 ease-in-out ">
                <IoIosArrowForward size={20} />
              </button>
            </div>
          </h1>
          <div>
            <GigCard data={gigs} nextBtn={".next-btn"} prevBtn={".prev-btn"} />
          </div>
        </div>
        <div className="Gigs-you-may-like  flex flex-col gap-8 mt-16">
          <h1 className="font-semibold text-black text-2xl">Gigs you ma</h1>
          <div className=" relative">
            <GigCard
              data={gigs}
              nextBtn={".next-btn2"}
              prevBtn={".prev-btn2"}
            />
            <button className="prev-btn2 absolute top-1/2 -left-5 z-10 flex items-center justify-center transform w-12 h-12 rounded-full text-black/50 font-medium bg-white shadow-md hover:bg-gray-200 transition duration-300 ease-in-out">
              <IoIosArrowBack size={20} />
            </button>
            <button className="next-btn2 absolute top-1/2 -right-5 z-10 flex items-center justify-center transform w-12 h-12 rounded-full text-black/50 font-medium bg-white shadow-md hover:bg-gray-200 transition duration-300 ease-in-out ">
              <IoIosArrowForward size={20} />
            </button>
          </div>
        </div>
        <div className="most-popular-in-web  flex flex-col gap-8 mt-16">
          <div className=" flex justify-between items-center">
            <h1 className="font-semibold text-black text-2xl">
              Most popular Gigs in Website Development
            </h1>
            <p className="flex items-center underline text-sm font-semibold text-gray-500 cursor-pointer">
              Show All <MdKeyboardArrowRight size={20} />
            </p>
          </div>

          <div className=" relative">
            <GigCard
              data={gigs}
              nextBtn={".next-btn3"}
              prevBtn={".prev-btn3"}
            />
            <button className="prev-btn3 absolute top-1/2 -left-5 z-10 flex items-center justify-center transform w-12 h-12 rounded-full text-black/50 font-medium bg-white shadow-md hover:bg-gray-200 transition duration-300 ease-in-out">
              <IoIosArrowBack size={20} />
            </button>
            <button className="next-btn3 absolute top-1/2 -right-5 z-10 flex items-center justify-center transform w-12 h-12 rounded-full text-black/50 font-medium bg-white shadow-md hover:bg-gray-200 transition duration-300 ease-in-out ">
              <IoIosArrowForward size={20} />
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-8 mt-16">
          <h1 className="font-semibold text-black text-2xl">
            Get inspired by work done on Fiverr
          </h1>
          <MasonaryGrid masonary={masonary} />
        </div>
      </div>
    </div>
  );
};
