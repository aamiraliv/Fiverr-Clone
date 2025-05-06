import React, { useRef, useState } from "react";

export const StepTwo = ({
  rev,
  onChange,
  del,
  price,
  setStep,
  description,
}) => {
  const [open, setOpen] = useState(false);
  const [opendelivery, setOpenDelivery] = useState(false);
  const dropdownRef = useRef(null);
  const dropdownRefDelivery = useRef(null);

  const revisions = [1, 2, 3, 4, 5];
  const deliveryTime = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const handleSelect = (item) => {
    onChange("revisions", item);
    setOpen(false);
  };

  const handleDelSelect = (item) => {
    onChange("deliveryTime", item);
    setOpenDelivery(false);
  };

  return (
    <div>
      <h1 className="text-black/65 font-normal text-3xl border-b border-b-gray-400 pb-5 mb-5">
        Scope & Pricing
      </h1>
      <div className="grid lg:grid-cols-[300px_1fr] rounded-sm border border-gray-300 p-8 gap-8 bg-white">
        <div className="flex flex-col gap-2">
          <h1 className="text-black/70 font-semibold text-sm">Gig Description</h1>
          <p className="text-sm text-gray-500">
            As your Gig storefront, your description is the most important place to
            include keywords that buyers would likely use to search for a
            service like yours.
          </p>
        </div>
        <div>
          <textarea
            name="description"
            id=""
            cols="30"
            className="w-full border border-black/50 rounded-xl outline-none p-4 resize-none"
            placeholder="e.g. description here ..."
            onChange={(e) => onChange("description", e.target.value)}
            rows="3"
            maxLength={120}
            minLength={50}
            value={description}
          ></textarea>
          {description.length > 0 && description.length < 50 && (
            <p className="float-end text-red-500 text-sm mt-1">
              description must be at least 30 characters.
            </p>
          )}

          {description.length >= 50 && (
            <p className="float-end text-green-500 text-sm mt-1">
              Looks good! ({description.length} / 120)
            </p>
          )}
        </div>
        <div>
          <h1 className="text-black/70 font-semibold text-sm ">Revisions</h1>
        </div>
        <div className="relative w-full" ref={dropdownRef}>
          <div
            className="w-full border border-black/50 rounded-lg px-4 py-2 cursor-pointer flex justify-between items-center shadow-sm hover:border-green-500 transition"
            onClick={() => setOpen(!open)}
          >
            <span className={`text-sm ${rev ? "text-black" : "text-gray-400"}`}>
              {rev || "Select revisions ( in days )"}
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
              {revisions.map((item, index) => (
                <div
                  key={index}
                  className={`px-4 py-2 text-sm cursor-pointer hover:bg-green-100 ${
                    item === rev ? "bg-green-50 font-medium text-green-600" : ""
                  }`}
                  onClick={() => handleSelect(item)}
                >
                  {item}
                </div>
              ))}
            </div>
          )}
          {rev && (
            <p className="float-end mt-2 text-green-500 text-sm">
              Looks good! ({rev})
            </p>
          )}
        </div>
        <div>
          <h1 className="text-black/70 font-semibold text-sm ">deliveryTime</h1>
        </div>
        <div className="relative w-full" ref={dropdownRefDelivery}>
          <div
            className="w-full border border-black/50 rounded-lg px-4 py-2 cursor-pointer flex justify-between items-center shadow-sm hover:border-green-500 transition"
            onClick={() => setOpenDelivery(!opendelivery)}
          >
            <span className={`text-sm ${del ? "text-black" : "text-gray-400"}`}>
              {del || "Select delivery time (in days)"}
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

          {opendelivery && (
            <div className="absolute mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
              {deliveryTime.map((item, index) => (
                <div
                  key={index}
                  className={`px-4 py-2 text-sm cursor-pointer hover:bg-green-100 ${
                    item === del ? "bg-green-50 font-medium text-green-600" : ""
                  }`}
                  onClick={() => handleDelSelect(item)}
                >
                  {item}
                </div>
              ))}
            </div>
          )}
          {del && (
            <p className="float-end mt-2 text-green-500 text-sm">
              Looks good! ({del})
            </p>
          )}
        </div>
        <div>
          <h1 className="text-black/70 font-semibold text-sm ">Price</h1>
        </div>
        <div className="flex items-center gap-2">
          <p className="text-2xl">₹</p>
          <input
            type="text"
            className="w-full border border-black/50 rounded-lg px-4 py-2 cursor-pointer  hover:border-green-500 transition outline-none"
            placeholder="0.00"
            onChange={(e) => onChange("price", parseFloat(e.target.value))}
            value={price}
          />
        </div>
      </div>
      <div className="mt-4 flex items-center justify-end gap-4">
        <button
          disabled={!price || price <= 0 || del === null || rev === null || description.length < 50}
          onClick={() => setStep(3)}
          className={`text-[16px] font-semibold text-white py-3 px-4 rounded-md ${
            !price || price <= 0 || del === null || rev === null || description.length < 50
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-gray-900"
          }`}
        >
          Save & Continue
        </button>
        <p
          onClick={() => setStep(1)}
          className="text-green-500 text-sm underline cursor-progress "
        >
          Back
        </p>
      </div>
    </div>
  );
};
