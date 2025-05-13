import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGigsByFreelancerId } from "../redux/GigSlice/gigSlice";
import { useNavigate } from "react-router-dom";

const Gig = () => {
  const navigate = useNavigate();
  const { userDetails } = useSelector((state) => state.auth);
  const { gigsByFreelacerLoading , gigsByFreelacer } = useSelector((state) => state.gig);
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("ACTIVE");
  const [openDropdown, setOpenDropdown] = useState(null);

  const userId = userDetails?.id;
  useEffect(() => {
    dispatch(getGigsByFreelancerId(userId));
  }, [dispatch, userId]);

  const tabs = [
    { label: "ACTIVE" },
    { label: "PENDING APPROVAL" },
    { label: "DENIED" },
    { label: "PAUSED" },
  ];

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setOpenDropdown(openDropdown === tab ? null : tab);
  };
  console.log("activeTab", activeTab);

  const renderActiveGigsTable = () => {
    const currentGigs = gigsByFreelacer[activeTab] || [];

    console.log("currentGigs", currentGigs);
    return (
      <div className="bg-white rounded-sm border border-gray-300 p-4 mt-2">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold text-lg">{activeTab} GIGS</h3>
        </div>

        {currentGigs.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            No {activeTab.toLowerCase()} gigs found
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100 border-b">
                <tr>
                  <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <input type="checkbox" className="form-checkbox" />
                  </th>
                  <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    GIG
                  </th>
                  <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    IMPRESSIONS
                  </th>
                  <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    CLICKS
                  </th>
                  <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ORDERS
                  </th>
                  <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    CANCELLATIONS
                  </th>
                  <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {/* Actions column */}
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentGigs.map((gig) => (
                  <tr key={gig.id} className="hover:bg-gray-50">
                    <td className="p-3">
                      <input type="checkbox" className="form-checkbox" />
                    </td>
                    <td className="p-3 flex items-center space-x-3">
                      <img
                        src={gig.image || "https://via.placeholder.com/50"}
                        alt={gig.title}
                        className="w-12 h-12 object-cover rounded"
                      />
                      <span className="text-sm font-medium text-gray-900">
                        {gig.title}
                      </span>
                    </td>
                    <td className="p-3 text-sm text-gray-500">
                      {gig.impressions}
                    </td>
                    <td className="p-3 text-sm text-gray-500">{gig.clicks}</td>
                    <td className="p-3 text-sm text-gray-500">{gig.orders}</td>
                    <td className="p-3 text-sm text-gray-500">
                      {gig.cancellations}
                    </td>
                    <td className="p-3">
                      <div className="relative">
                        <button className="text-gray-400 hover:text-gray-600">
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                            />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4">
      <div className="flex flex-col">
        <div className="flex flex-wrap justify-between items-center mb-4">
          <h1 className="text-[40px] font-light text-gray-600 mt-8 mb-4 md:mb-0">
            Gigs
          </h1>
        </div>

        <div className="flex items-center justify-between overflow-x-auto border-b border-gray-300">
          <div className="flex flex-wrap gap-4">
            {tabs.map((tab) => (
              <div
                key={tab.label}
                className={`
                  cursor-pointer
                  px-4 py-6
                  text-sm font-medium
                  whitespace-nowrap
                  transition-colors duration-300
                  ${
                    activeTab === tab.label
                      ? "border-b-2 border-black text-black"
                      : "text-gray-400 hover:text-gray-800"
                  }
                `}
                onClick={() => handleTabClick(tab.label)}
              >
                {tab.label} {tab.count > 0 && `(${tab.count})`}
              </div>
            ))}
          </div>
          <div onClick={()=> navigate("/gigform")} className="cursor-pointer px-3 py-2 text-[12px] font-medium bg-green-600 rounded-sm text-white hover:bg-green-600 transition duration-300">
            CREATE A NEW GIG
          </div>
        </div>

        {openDropdown && renderActiveGigsTable()}
      </div>
    </div>
  );
};

export default Gig;
