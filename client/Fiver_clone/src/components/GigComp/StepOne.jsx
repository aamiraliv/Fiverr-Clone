import React, { useEffect, useRef, useState } from "react";
import Select from "react-select";
import allFreelanceTools from "../../../json/categoryTags";

export const StepOne = ({ title, onChange, value, tags, setStep }) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const toolOptions = allFreelanceTools.map((tool) => ({
    value: tool,
    label: tool,
  }));
  const categories = [
    "Graphics & Design",
    "Digital Marketing",
    "Writing & Translation",
    "Video & Animation",
    "Music & Audio",
    "Programming & Tech",
    "Business",
    "AI Services",
    "Lifestyle",
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleChange = (selectedOptions) => {
    if (selectedOptions.length <= 5) {
      const tagValues = selectedOptions.map((opt) => opt.value);
      onChange("tags", tagValues);
    }
  };

  const handleSelect = (item) => {
    onChange("category", item);
    setOpen(false);
  };

  return (
    <div>
      <div className="grid lg:grid-cols-[300px_1fr] rounded-sm border border-gray-300 p-8 gap-8 bg-white">
        <div className="flex flex-col gap-2">
          <h1 className="text-[17px] font-medium text-black">Gig Title</h1>
          <p className="text-sm text-gray-500">
            As your Gig storefront, your title is the most important place to
            include keywords that buyers would likely use to search for a
            service like yours.
          </p>
        </div>
        <div>
          <textarea
            name="title"
            id=""
            cols="30"
            className="w-full border border-black/50 rounded-xl outline-none p-4 resize-none"
            placeholder="e.g. I will create a professional logo design for you"
            onChange={(e) => onChange("title", e.target.value)}
            rows="3"
            maxLength={100}
            minLength={40}
            value={title}
          ></textarea>
          {title.length > 0 && title.length < 40 && (
            <p className="float-end text-red-500 text-sm mt-1">
              title must be at least 20 characters.
            </p>
          )}

          {title.length >= 40 && (
            <p className="float-end text-green-500 text-sm mt-1">
              Looks good! ({title.length} / 100)
            </p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="text-[17px] font-medium text-black">Category</h1>
          <p className="text-sm text-gray-500">
            Choose the category most suitable for your Gig.
          </p>
        </div>
        <div>
          <div className="relative w-full" ref={dropdownRef}>
            <div
              className="w-full border border-black/50 rounded-lg px-4 py-2 cursor-pointer flex justify-between items-center shadow-sm hover:border-green-500 transition"
              onClick={() => setOpen(!open)}
            >
              <span
                className={`text-sm ${value ? "text-black" : "text-gray-400"}`}
              >
                {value || "Select a category"}
              </span>
              <svg
                className={`w-4 h-4 transform transition-transform ${
                  open ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M19 9l-7 7-7-7" />
              </svg>
            </div>

            {open && (
              <div className="absolute mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
                {categories.map((item, index) => (
                  <div
                    key={index}
                    className={`px-4 py-2 text-sm cursor-pointer hover:bg-green-100 ${
                      item === value
                        ? "bg-green-50 font-medium text-green-600"
                        : ""
                    }`}
                    onClick={() => handleSelect(item)}
                  >
                    {item}
                  </div>
                ))}
              </div>
            )}
          </div>
          {value && (
            <p className="float-end text-green-500 text-sm mt-1">
              Looks good! ({value})
            </p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="text-[17px] font-medium text-black">Search tags</h1>
          <p className="text-sm text-gray-500">
            Tag your Gig with buzz words that are relevant to the services you
            offer. Use all 5 tags to get found.
          </p>
        </div>
        <div>
          <div className="flex flex-col gap-2 w-full">
            <h1 className="text-[17px] font-medium text-black/60">
              Positive keywords
            </h1>
            <p className="text-[14px] text-gray-500">
              Enter search terms you feel your buyers will use when looking for
              your service.
            </p>
            <Select
              isMulti
              options={toolOptions}
              onChange={handleChange}
              value={tags.map((tag) => ({ value: tag, label: tag }))}
              placeholder="Select or type tags..."
            />
            {tags.length > 0 && tags.length < 5 && (
              <p className="float-end text-red-500 text-sm mt-1">
                You can add up to 5 tags.
              </p>
            )}
            {tags.length >= 5 && (
              <p className="float-end text-green-500 text-sm mt-1">
                Looks good! ({tags.length} / 5)
              </p>
            )}
          </div>
        </div>
      </div>
      <div className="mt-4 flex justify-end gap-4">
        <button
          disabled={title.length < 40 || tags.length < 1 || !value}
          onClick={() => setStep(2)}
          className={`text-[16px] font-semibold text-white py-3 px-4 rounded-md ${
            title.length < 40 || tags.length < 1 || !value
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-gray-900"
          }`}
        >
          Save & Continue
        </button>
      </div>
    </div>
  );
};
