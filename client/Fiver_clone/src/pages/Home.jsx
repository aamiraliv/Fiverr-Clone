import React, { useEffect, useRef, useState } from "react";
import { IoSearch } from "react-icons/io5";
import introvideo from "../assets/Desktop Header new version.mp4";
import { FaPause, FaPlay } from "react-icons/fa6";

export const Home = () => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    videoRef.current?.play();
  }, []);

  const toggleVideo = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div>
      <div
        className=" lg:hidden flex flex-col justify-center pb-8 bg-gradient-to-b from-green-950 to-green-700
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
      <div className="hidden lg:block relative">
        <video
          ref={videoRef}
          src={introvideo}
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
        />
        <button
          onClick={toggleVideo}
          className="absolute bottom-4 right-4 bg-gray-700 text-white rounded-full p-3 shadow-lg hover:bg-gray-600 transition"
        >
          {isPlaying ? <FaPause /> : <FaPlay />}
        </button>
      </div>
      
    </div>
  );
};
