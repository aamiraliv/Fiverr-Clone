import { useEffect, useRef, useState } from "react";
import { IoSearch } from "react-icons/io5";
import introvideo from "../assets/Desktop Header new version.mp4";
import {
  FaBuilding,
  FaBullhorn,
  FaCode,
  FaMusic,
  FaPause,
  FaPenNib,
  FaPlay,
  FaRobot,
  FaUserTie,
  FaVideo,
} from "react-icons/fa6";
import { IoIosArrowRoundForward } from "react-icons/io";
import googleIcon from "../assets/google.e74f4d9.svg";
import metaIcon from "../assets/meta.ff37dd3.svg";
import netflixIcon from "../assets/netflix.b310314.svg";
import paypalIcon from "../assets/paypal.d398de5.svg";
import pioneerIcon from "../assets/payoneer.7c1170d.svg";
import pgIcon from "../assets/pg.22fca85.svg";
import { FaPaintBrush } from "react-icons/fa";
import { MdKeyboardArrowDown } from "react-icons/md";
import programming from "../assets/programming-tech-thin.56382a2.svg";
import graphics from "../assets/graphics-design-thin.ff38893.svg";
import digital from "../assets/digital-marketing-thin.68edb44.svg";
import writing from "../assets/writing-translation-thin.fd3699b.svg";
import video from "../assets/video-animation-thin.9d3f24d.svg";
import music from "../assets/music-audio-thin.43a9801.svg";
import business from "../assets/business-thin.885e68e.svg";
import consulting from "../assets/consulting-thin.d5547ff.svg";
import aiserivce from "../assets/ai-services-thin.104f389.svg";
import PopularService from "../components/PopularService";

export const Home = () => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [showAll, setShowAll] = useState(false);

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

  const categories = [
    {
      title: "Programming & Tech",
      icon: <img src={programming} width={30} alt="" />,
    },
    {
      title: "Graphics & Design",
      icon: <img src={graphics} width={30} alt="" />,
    },
    {
      title: "Digital Marketing",
      icon: <img src={digital} width={30} alt="" />,
    },
    {
      title: "Writing & Translation",
      icon: <img src={writing} width={30} alt="" />,
    },
    { title: "Video & Animation", icon: <img src={video} width={30} alt="" /> },
    { title: "AI Services", icon: <img src={aiserivce} width={30} alt="" /> },
    { title: "Music & Audio", icon: <img src={music} width={30} alt="" /> },
    { title: "Business", icon: <img src={business} width={30} alt="" /> },
    { title: "Consulting", icon: <img src={consulting} width={30} alt="" /> },
  ];

  const visibleItems = showAll ? categories : categories.slice(0, 6);

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

        <div className="absolute top-48 left-10 flex flex-col gap-4 ">
          <div>
            <p className=" text-7xl font-light text-white">
              Our freelancers <br />
              will take it from here
            </p>
          </div>
          <br />
          <div>
            <div className="relative ">
              <input
                type="text"
                name=""
                id=""
                placeholder="search for any services....."
                className="text-gray-600 font-roboto text-[17px] rounded-2xl pl-4 pr-10 py-4 outline-none bg-white relative w-full"
              />
              <div className="absolute flex items-center justify-center right-1 top-1 w-[50px] h-[50px] rounded-2xl bg-[#222325] text-white">
                <IoSearch size={20} />
              </div>
            </div>
          </div>
          <div className="flex gap-2 ">
            <div className="flex gap-2 p-2  bg-gray-50/10 rounded-md border border-gray-300 w-auto text-white items-center justify-center">
              <button className=" font-light text-[15px]">
                website development
              </button>
              <IoIosArrowRoundForward size={20} />
            </div>
            <div className="flex gap-2 p-2  bg-gray-50/10 rounded-md border border-gray-300 w-auto text-white items-center justify-center">
              <button className=" font-light text-[15px]">logo design</button>
              <IoIosArrowRoundForward size={20} />
            </div>
            <div className="flex gap-2 p-2  bg-gray-50/10 rounded-md border border-gray-300 w-auto text-white items-center justify-center">
              <button className=" font-light text-[15px]">video editing</button>
              <IoIosArrowRoundForward size={20} />
            </div>
            <div className="flex gap-2 p-2  bg-gray-50/10 rounded-md border border-gray-300 w-auto text-white items-center justify-center">
              <button className=" font-light text-[15px]">
                architecture & interior design
              </button>
              <IoIosArrowRoundForward size={20} />
            </div>
          </div>
        </div>
        <div className="absolute left-10 bottom-5 flex gap-14">
          <p className=" text-[15px] font-normal text-white">Trusted By: </p>
          <img src={metaIcon} alt="meta" />
          <img src={googleIcon} alt="meta" />
          <img src={netflixIcon} alt="meta" />
          <img src={pgIcon} alt="meta" />
          <img src={paypalIcon} alt="meta" />
          <img src={pioneerIcon} alt="meta" />
        </div>
      </div>

      <div className="flex flex-col gap-4 px-8 py-10">
        <div className="w-full py-6">
          {/* Desktop Carousel */}
          <div className="hidden lg:flex gap-4 overflow-x-auto scrollbar-hide">
            {categories.map((item, idx) => (
              <div
                key={idx}
                className="w-[120px] h-[120px] flex-shrink-0 bg-white  rounded-2xl shadow p-4 overflow-clip border border-gray-200 transition-all duration-200 hover:bg-radial from-green-500/35 from-10% to-white"
              >
                <div className="flex flex-col gap-2 ">
                  <div>{item.icon}</div>
                  <div className="font-semibold text-gray-800 text-[12px]">
                    {item.title}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* mobile view */}
          <div className="grid grid-cols-3 gap-3 lg:hidden">
            {visibleItems.map((item, idx) => (
              <div key={idx} className="flex flex-col gap-2 items-center ">
                <div className="w-[120px] h-[120px] flex items-center justify-center bg-white  rounded-2xl shadow p-4 overflow-clip border border-gray-200 ">
                  <div className="font-semibold text-gray-800">{item.icon}</div>
                </div>
                <div className="font-semibold text-gray-800 text-[12px]">
                  {item.title}
                </div>
              </div>
            ))}
          </div>

          {!showAll && (
            <div className="lg:hidden mt-4 text-center">
              <div className="flex justify-center items-center gap-2 border-t-2 border-gray-300 pt-2">
                <button
                  onClick={() => setShowAll(true)}
                  className="text-gray-800 text-sm font-semibold "
                >
                  View 3 More
                </button>
                <MdKeyboardArrowDown />
              </div>
            </div>
          )}
        </div>
        <div className="flex flex-col gap-10 mt-5 ">
          <h1 className="font-normal text-5xl text-[#404145]">Popular Services</h1>
          <PopularService />
        </div>
      </div>
    </div>
  );
};
