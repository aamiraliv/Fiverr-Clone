import React, { useEffect } from "react";
import publishGig from "../../assets/publish-page.svg";

export const StepFour = ({ gigdata, setStep }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-700">Publish Your Gig</h1>
      <div className="mt-5 flex flex-col gap-4 w-full h-[400px] items-center justify-center  bg-white border border-gray-300 ">
        <img
          src={publishGig}
          alt="Publish Gig"
          className="w-[300px] h-[300px] object-contain"
        />
        <p className="text-[17px] text-gray-700">You are almost done!!!</p>
      </div>
      <div className="flex flex-col gap-4 w-full px-12 py-4 justify-center items-center bg-white border border-gray-300 ">
        <p className="text-sm text-gray-500">
          This is how your gig will look like to buyers.
        </p>
        <div className="flex flex-col gap-2 w-full ">
          <div className="flex flex-col lg:flex-row w-full rounded-2xl border border-gray-300 p-4 gap-4 bg-white">
            <img
              src={gigdata.thumbnailUrl}
              alt=""
              className="w-[300px] h-[169px] object-cover rounded-2xl border border-gray-300"
            />
            <div className="flex flex-col gap-2 text-gray-500">
              <h1 className="font-semibold text-xl text-gray-800 ">
                {gigdata.title}
              </h1>
              <h1 className=" font-bold text-sm px-4 py-2 w-fit rounded-xl bg-gray-500 text-white">
                {gigdata.category}
              </h1>
              <h1 className=" font-bold text-2xl">₹{gigdata.price}</h1>
              <div className="flex gap-2 w-full overflow-x-scroll custom-scrollbar">
                {gigdata.tags.map((tag, index) => (
                  <p
                    key={index}
                    className=" text-[8px] lg:text-[10px] font-semibold text-gray-500 px-4 py-2 rounded-full border border-gray-300 w-fit"
                  >
                    {tag}
                  </p>
                ))}
              </div>
            </div>
          </div>
          <p className="flex-grow h-auto text-gray-500 text-sm p-4 rounded-2xl border border-gray-300 overflow-scroll custom-scrollbar">
            {gigdata.description}
          </p>
          <div className=" text-sm text-gray-500 flex flex-col gap-2 border rounded-2xl p-4 border-gray-300">
            <p>
              <strong>Delivery Time:</strong> {gigdata.deliveryTime} days
            </p>
            <p>
              <strong>Revisions:</strong> {gigdata.revisions}
            </p>
          </div>
          <div className="flex lg:flex-row flex-col gap-4 w-full rounded-2xl border border-gray-300 p-4 bg-white">
            {gigdata.imageUrl1 && (
              <img
                src={gigdata.imageUrl1}
                alt="Image 1"
                className="w-24 h-24 object-cover rounded"
              />
            )}
            {gigdata.imageUrl2 && (
              <img
                src={gigdata.imageUrl2}
                alt="Image 2"
                className="w-24 h-24 object-cover rounded"
              />
            )}
            {gigdata.imageUrl3 && (
              <img
                src={gigdata.imageUrl3}
                alt="Image 3"
                className="w-24 h-24 object-cover rounded"
              />
            )}
            {gigdata.videoUrl && (
              <video
                src={gigdata.videoUrl}
                controls
                className="w-32 h-24 rounded"
              />
            )}
          </div>
        </div>
      </div>
      <div className="mt-4 flex items-center justify-end gap-4">
        <button
          //  onClick={() => setStep(4)}
          className={`text-[16px] font-semibold text-white py-3 px-4 rounded-md bg-gray-900 `}
        >
          Save & Continue
        </button>
        <p
          onClick={() => setStep(3)}
          className="text-green-500 text-sm underline cursor-progress "
        >
          Back
        </p>
      </div>
    </div>
  );
};
