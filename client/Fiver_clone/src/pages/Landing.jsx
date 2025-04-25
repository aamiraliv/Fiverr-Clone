import React from "react";

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
        <div className="Based-on-what-you-might-be-looking-for">
          <h1 className="font-semibold text-black text-2xl">Based on what you might be looking for</h1>
        </div>
      </div>
    </div>
  );
};
