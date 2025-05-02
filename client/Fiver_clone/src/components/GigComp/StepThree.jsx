import React from "react";
import FileUpload from "./FileUpload";
import toast from "react-hot-toast";
import { PropagateLoader } from "react-spinners";
import { useSelector } from "react-redux";

export const StepThree = ({
  onChange,
  image1,
  image2,
  image3,
  thumbnail,
  setStep,
}) => {
  const { uploadLoading } = useSelector((state) => state.gig);

  const handleUpload = (key, url) => {
    onChange(key, url);
    toast.success("Image uploaded successfully!");
  };

  return (
    <div>
      <h1 className="text-black/65 font-normal text-3xl border-b border-b-gray-400 pb-5 mb-5">
        Gallery
      </h1>
      <div className=" relative flex flex-col rounded-sm border border-gray-300 p-8 gap-8 bg-white">
        {uploadLoading && (
          <div className="absolute top-0 left-0 w-full h-full bg-black/50 flex items-center justify-center rounded-lg z-10">
            <PropagateLoader margin={0} color="#ffffff" />
          </div>
        )}
        <div className="flex flex-col gap-2 items-center">
          <h1 className="text-[20px] font-semibold text-gray-700">
            Upload images Up to Three
          </h1>
          <div className=" grid grid-cols-1 lg:grid-cols-3 gap-4 w-full ">
            <FileUpload
              accept="image/*"
              previewType="image"
              onUpload={(url) => handleUpload("imageUrl1", url)}
            />
            <FileUpload
              accept="image/*"
              previewType="image"
              onUpload={(url) => handleUpload("imageUrl2", url)}
            />
            <FileUpload
              accept="image/*"
              previewType="image"
              onUpload={(url) => handleUpload("imageUrl3", url)}
            />
          </div>
          <h1 className="text-[20px] font-semibold text-gray-700 mt-5 pt-4 border-t border-t-gray-300">
            Upload A intro Video (Optional)
          </h1>
          <p className="text-sm text-gray-500 text-center">
            A video can be a great way to showcase your work and personality. It
            can help you stand out from the competition and give buyers a better
            sense of what you offer.
          </p>
          <div className="relative w-full mt-4">
            <FileUpload
              accept="video/*"
              previewType="video"
              onUpload={(url) => handleUpload("videoUrl", url)}
            />
          </div>
          <h1 className="text-[20px] font-semibold text-gray-700 mt-5 pt-4 border-t border-t-gray-300">
            Upload A Thumbnail Image
          </h1>
          <div className="relative w-full mt-4">
            <FileUpload
              accept="image/*"
              previewType="image"
              onUpload={(url) => handleUpload("thumbnailUrl", url)}
            />
          </div>
        </div>
      </div>
      <div className="mt-4 flex items-center justify-end gap-4">
        <button
          disabled={(!image1 && !image2 && !image3) || !thumbnail}
          onClick={() => setStep(4)}
          className={`text-[16px] font-semibold text-white py-3 px-4 rounded-md ${
            (!image1 && !image2 && !image3) || !thumbnail
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-gray-900"
          }`}
        >
          Save & Continue
        </button>
        <p
          onClick={() => setStep(2)}
          className="text-green-500 text-sm underline cursor-progress "
        >
          Back
        </p>
      </div>
    </div>
  );
};
