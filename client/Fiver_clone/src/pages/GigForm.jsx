import React, { useState } from "react";
import { MdArrowForwardIos } from "react-icons/md";
import { StepOne } from "../components/GigComp/StepOne";
import { StepTwo } from "../components/GigComp/StepTwo";
import { StepThree } from "../components/GigComp/StepThree";
import { StepFour } from "../components/GigComp/StepFour";

export const GigForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    title: "",
    price: null,
    category: "",
    description: "",
    tags: [],
    imageUrl1: "",
    imageUrl2: "",
    imageUrl3: "",
    videoUrl: "",
    thumbnailUrl: "",
    deliveryTime: null,
    revisions: null,
    userId: null,
  });

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  console.log(formData);
  console.log(step);

  return (
    <div>
      <div className="flex lg:flex-row w-full px-12 py-4 justify-center gap-5 items-center bg-white border-b border-gray-300 border-t">
        <div className="flex items-center gap-2">
          <p
            className={`flex items-center justify-center w-7 h-7 rounded-full text-sm font-bold text-white ${
              step >= 1 ? "bg-green-500" : "bg-stone-400"
            }`}
          >
            1
          </p>
          <p
            className={` hidden lg:block text-sm font-bold ${
              step === 1
                ? "text-black"
                : step > 1
                ? "text-green-500"
                : "text-stone-400"
            }`}
          >
            Overview
          </p>
        </div>
        <MdArrowForwardIos />
        <div className="flex items-center gap-4">
          <p
            className={`flex items-center justify-center w-7 h-7 rounded-full text-sm font-bold text-white ${
              step >= 2 ? "bg-green-500" : "bg-stone-400"
            }`}
          >
            2
          </p>
          <p
            className={`hidden lg:block text-sm font-bold ${
              step === 2
                ? "text-black"
                : step > 2
                ? "text-green-500"
                : "text-stone-400"
            }`}
          >
            Pricing
          </p>
        </div>
        <MdArrowForwardIos />

        <div className="flex items-center gap-4">
          <p
            className={`flex items-center justify-center w-7 h-7 rounded-full text-sm font-bold text-white ${
              step >= 3 ? "bg-green-500" : "bg-stone-400"
            }`}
          >
            3
          </p>
          <p
            className={`hidden lg:block text-sm font-bold ${
              step === 3
                ? "text-black"
                : step > 3
                ? "text-green-500"
                : "text-stone-400"
            }`}
          >
            Gallery
          </p>
        </div>
        <MdArrowForwardIos />
        <div className="flex items-center gap-4">
          <p
            className={`flex items-center justify-center w-7 h-7 rounded-full text-sm font-bold text-white ${
              step >= 4 ? "bg-green-500" : "bg-stone-400"
            }`}
          >
            4
          </p>
          <p
            className={`hidden lg:block text-sm font-bold ${
              step === 4
                ? "text-black"
                : step > 4
                ? "text-green-500"
                : "text-stone-400"
            }`}
          >
            Publish
          </p>
        </div>
      </div>
      <div className="p-12 bg-[#e8e6e3]/50">
        {step === 1 && (
          <StepOne
            setStep={setStep}
            onChange={handleChange}
            title={formData.title}
            value={formData.category}
            tags={formData.tags}
          />
        )}
        {step === 2 && (
          <StepTwo
            onChange={handleChange}
            rev={formData.revisions}
            del={formData.deliveryTime}
            price={formData.price}
            description={formData.description}
            setStep={setStep}
          />
        )}
        {step === 3 && (
          <StepThree
            onChange={handleChange}
            image1={formData.imageUrl1}
            image2={formData.imageUrl2}
            image3={formData.imageUrl3}
            thumbnail={formData.thumbnailUrl}
            setStep={setStep}
            
          />
        )}
        {step === 4 && <StepFour gigdata={formData} setStep={setStep} />}
      </div>
    </div>
  );
};
