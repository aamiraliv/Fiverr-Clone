import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteGig, getGigsByFreelancerId } from "../redux/GigSlice/gigSlice";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import toast from "react-hot-toast";

const Gig = () => {
  const navigate = useNavigate();
  const { userDetails } = useSelector((state) => state.auth);
  const { gigsByFreelacerLoading, gigsByFreelacer } = useSelector(
    (state) => state.gig
  );
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("ACTIVE");
  const [filteredGigs, setFilteredGigs] = useState([]);
  const [openMenuId, setOpenMenuId] = useState(null);

  const menuRef = useRef(null);

  const userId = userDetails?.id;

  // useEffect(() => {
  //   function handleClickOutside(event) {
  //     if (menuRef.current && !menuRef.current.contains(event.target)) {
  //       setOpenMenuId(null);
  //     }
  //   }

  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, []);

  useEffect(() => {
    if (userId) {
      dispatch(getGigsByFreelancerId(userId));
    }
  }, [dispatch, userId]);

  useEffect(() => {
    if (gigsByFreelacer && Array.isArray(gigsByFreelacer)) {
      const filtered = gigsByFreelacer.filter(
        (gig) => gig.status === activeTab
      );
      setFilteredGigs(filtered);
    } else {
      setFilteredGigs([]);
    }
  }, [gigsByFreelacer, activeTab]);

  const tabs = [{ label: "ACTIVE" }, { label: "DENIED" }, { label: "PAUSED" }];

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const toggleMenu = (gigId) => {
    setOpenMenuId(openMenuId === gigId ? null : gigId);
  };

  const handleMenuAction = async (action, gig) => {
    switch (action) {
      case "preview": {
        const gigId = gig.id;
        console.log("Preview gig:", gig.id);
        navigate(`/gigpreview/${gigId}`);
        break;
      }
      case "denied":
        console.log("Mark as denied:", gig.id);
        // Update gig status
        break;
      case "paused":
        console.log("Pause gig:", gig.id);
        // Update gig status
        break;
      case "delete": {
        console.log("Delete gig:", gig.id);
        const gigId = gig.id;
        await toast.promise(
          dispatch(deleteGig({ gigId, userId })).unwrap(),
          {
            loading: "Deleting...",
            success: "Gig deleted successfully!",
            error: (err) =>
              typeof err === "string" ? err : "Deletion of gig failed!",
          },
          {
            position: "top-center",
            style: {
              fontSize: "12px",
              padding: "6px 12px",
              background: "white",
              color: "black",
              border: "1px solid red",
            },
          }
        );

        setTimeout(() => {
          navigate("/dashboard/gig");
        }, 1000);
        break;
      }
      default:
        break;
    }
    setOpenMenuId(null);
  };

  const renderGigsTable = () => {
    return (
      <div className="bg-white rounded-sm border border-gray-300 p-2 md:p-4 mt-2">
        <div className="flex justify-between items-center mb-2 md:mb-4">
          <h3 className="font-semibold text-base md:text-lg">
            {activeTab} GIGS
          </h3>
        </div>

        {gigsByFreelacerLoading ? (
          <div className="text-center text-gray-500 py-4 md:py-8">
            <ClipLoader color="#bdbdbd" />
          </div>
        ) : filteredGigs.length === 0 ? (
          <div className="text-center text-gray-500 py-4 md:py-8">
            No {activeTab.toLowerCase()} gigs found
          </div>
        ) : (
          <>
            <div className="hidden md:block">
              <table className="w-full">
                <thead className="bg-gray-100 border-b">
                  <tr>
                    <th className="p-2 md:p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                    <th className="p-2 md:p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      GIG
                    </th>
                    <th className="p-2 md:p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      IMPRESSIONS
                    </th>
                    <th className="p-2 md:p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      CLICKS
                    </th>
                    <th className="p-2 md:p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ORDERS
                    </th>
                    <th className="p-2 md:p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      CANCELLATIONS
                    </th>
                    <th className="p-2 md:p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredGigs.map((gig) => (
                    <tr key={gig.id} className="hover:bg-gray-50">
                      <td className="p-2 md:p-3"></td>
                      <td className="p-2 md:p-3 flex items-center space-x-2 md:space-x-3">
                        <img
                          src={
                            gig.thumbnailUrl || "https://via.placeholder.com/50"
                          }
                          alt={gig.title}
                          className="w-10 h-10 md:w-12 md:h-12 object-cover rounded"
                        />
                        <span className="text-xs md:text-sm font-medium text-gray-900">
                          {gig.title}
                        </span>
                      </td>
                      <td className="p-2 md:p-3 text-xs md:text-sm text-gray-500">
                        {gig.impressions || 0}
                      </td>
                      <td className="p-2 md:p-3 text-xs md:text-sm text-gray-500">
                        {gig.clicks || 0}
                      </td>
                      <td className="p-2 md:p-3 text-xs md:text-sm text-gray-500">
                        {gig.orders || 0}
                      </td>
                      <td className="p-2 md:p-3 text-xs md:text-sm text-gray-500">
                        {gig.cancellationRate || 0}
                      </td>
                      <td className="p-2 md:p-3">
                        <div
                          className="relative"
                          ref={openMenuId === gig.id ? menuRef : null}
                        >
                          <button
                            onClick={() => toggleMenu(gig.id)}
                            className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100 transition-colors duration-200"
                            aria-label="Gig settings"
                          >
                            <svg
                              className="w-4 h-4 md:w-5 md:h-5"
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
                          {openMenuId === gig.id && renderMenu(gig)}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="md:hidden">
              {filteredGigs.map((gig) => (
                <div
                  key={gig.id}
                  className="border-b border-gray-200 py-3 last:border-0"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <img
                        src={
                          gig.thumbnailUrl || "https://via.placeholder.com/50"
                        }
                        alt={gig.title}
                        className="w-10 h-10 object-cover rounded"
                      />
                      <span className="text-xs font-medium text-gray-900 line-clamp-2">
                        {gig.title}
                      </span>
                    </div>
                    <div
                      className="relative"
                      ref={openMenuId === gig.id ? menuRef : null}
                    >
                      <button
                        onClick={() => toggleMenu(gig.id)}
                        className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100 transition-colors duration-200"
                        aria-label="Gig settings"
                      >
                        <svg
                          className="w-4 h-4"
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
                      {openMenuId === gig.id && renderMenu(gig)}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="flex items-center gap-1">
                      <span className="font-medium text-gray-500">
                        Impressions:
                      </span>
                      <span>{gig.impressions || 0}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="font-medium text-gray-500">Clicks:</span>
                      <span>{gig.clicks || 0}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="font-medium text-gray-500">Orders:</span>
                      <span>{gig.orders || 0}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="font-medium text-gray-500">
                        Cancel Rate:
                      </span>
                      <span>{gig.cancellationRate || 0}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    );
  };

  const renderMenu = (gig) => {
    return (
      <div className="absolute right-0 z-10 mt-1 w-36 bg-white rounded shadow-lg border border-gray-200 py-1 overflow-hidden">
        <button
          onClick={() => handleMenuAction("preview", gig)}
          className="w-full text-left px-4 py-2 text-xs md:text-sm text-gray-700 hover:bg-gray-100 flex items-center"
        >
          <svg
            className="w-3 h-3 md:w-4 md:h-4 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            ></path>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
            ></path>
          </svg>
          Preview
        </button>
        <button
          onClick={() => handleMenuAction("paused", gig)}
          className="w-full text-left px-4 py-2 text-xs md:text-sm text-gray-700 hover:bg-gray-100 flex items-center"
        >
          <svg
            className="w-3 h-3 md:w-4 md:h-4 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          Pause
        </button>
        <button
          onClick={() => handleMenuAction("denied", gig)}
          className="w-full text-left px-4 py-2 text-xs md:text-sm text-gray-700 hover:bg-gray-100 flex items-center"
        >
          <svg
            className="w-3 h-3 md:w-4 md:h-4 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
            ></path>
          </svg>
          Deny
        </button>
        <div className="border-t border-gray-100 my-1"></div>
        <button
          onClick={() => handleMenuAction("delete", gig)}
          className="w-full text-left px-4 py-2 text-xs md:text-sm text-red-600 hover:bg-red-50 flex items-center"
        >
          <svg
            className="w-3 h-3 md:w-4 md:h-4 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            ></path>
          </svg>
          Delete
        </button>
      </div>
    );
  };

  return (
    <div className="container mx-auto px-2 md:px-4">
      <div className="flex flex-col">
        <div className="flex flex-wrap justify-between items-center mb-2 md:mb-4">
          <h1 className="text-2xl md:text-4xl font-light text-gray-600 mt-4 md:mt-8 mb-2 md:mb-0">
            Gigs
          </h1>
        </div>

        <div className="flex items-center justify-between border-b border-gray-300 overflow-x-auto">
          <div className="flex">
            {tabs.map((tab) => (
              <div
                key={tab.label}
                className={`
                  cursor-pointer
                  px-2 md:px-4 py-3 md:py-6
                  text-xs md:text-sm font-medium
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
                {tab.label}
              </div>
            ))}
          </div>
          <button
            onClick={() => navigate("/gigform")}
            className="cursor-pointer px-2 md:px-4 py-1 md:py-2 text-xs md:text-sm font-medium bg-green-600 rounded text-white hover:bg-green-700 transition duration-300 whitespace-nowrap"
          >
            CREATE NEW GIG
          </button>
        </div>

        {renderGigsTable()}
      </div>
    </div>
  );
};

export default Gig;
