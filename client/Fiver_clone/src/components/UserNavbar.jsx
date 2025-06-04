import { Button, Drawer } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { FaBars } from "react-icons/fa6";
import AuthModal from "./Login";
import { Bell, Heart, Mail, Search } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CustomSidebarForAuth from "./SideBarForAuth";
import toast from "react-hot-toast";
import { logoutUser } from "../redux/AuthSlice/authSlice";
import { persistor } from "../redux/store";

export const UserNavbar = () => {
  const dispatch = useDispatch();
  const bellRef = useRef(null);
  const mailRef = useRef(null);
  const profileRef = useRef(null);

  const navigate = useNavigate();
  const { role, userDetails } = useSelector((state) => state.auth);
  const [searchOpen, setSearchOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [open, setOpen] = useState(false);

  // Search related states
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchTimeout, setSearchTimeout] = useState(null);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };
  const [menuOpen, setMenuOpen] = useState(null);
  const handleClick = (id) => {
    setMenuOpen((prev) => (prev === id ? null : id));
  };

  const handleNavigation = (path) => {
    navigate(path);
    setMenuOpen(null);
  };

  const API_BASE_URL = "http://localhost:8080/api/gig";

  const searchGigs = async (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    try {
      const response = await fetch(
        `${API_BASE_URL}/search?query=${encodeURIComponent(query)}`
      );

      if (response.ok) {
        const results = await response.json();
        setSearchResults(results.slice(0, 8));
      } else {
        console.error("Search failed:", response.statusText);
        setSearchResults([]);
      }
    } catch (error) {
      console.error("Search error:", error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const handleSearchInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }

    const timeout = setTimeout(() => {
      searchGigs(value);
    }, 300);

    setSearchTimeout(timeout);
  };

  const handleSearchResultClick = (gig) => {
    navigate(`/gigpreview/${gig.id}`);
    setSearchOpen(false);
    setSearchTerm("");
    setSearchResults([]);
  };

  // const handleSearchButtonClick = () => {
  //   if (searchTerm.trim()) {
  //     navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
  //     setSearchOpen(false);
  //   }
  // };

  // const handleSearchKeyPress = (e) => {
  //   if (e.key === "Enter") {
  //     handleSearchButtonClick();
  //   }
  // };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setSearchOpen(false);
      }

      if (
        menuOpen === 1 &&
        bellRef.current &&
        !bellRef.current.contains(event.target)
      ) {
        setMenuOpen(null);
      } else if (
        menuOpen === 2 &&
        mailRef.current &&
        !mailRef.current.contains(event.target)
      ) {
        setMenuOpen(null);
      } else if (
        menuOpen === 3 &&
        profileRef.current &&
        !profileRef.current.contains(event.target)
      ) {
        setMenuOpen(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  useEffect(() => {
    return () => {
      if (searchTimeout) {
        clearTimeout(searchTimeout);
      }
    };
  }, [searchTimeout]);

  const handleLogout = async () => {
    try {
      await toast.promise(
        dispatch(logoutUser()),
        {
          loading: "Login Out...",
          success: "You are Logout successfully!",
          error: (err) => (typeof err === "string" ? err : "Logout failed!"),
        },
        {
          position: "top-center",
          style: {
            fontSize: "12px",
            padding: "6px 12px",
            background: "white",
            color: "black",
            border: "1px solid #ccc",
          },
        }
      );
      setMenuOpen(null);
      persistor.purge();
      setTimeout(() => {
        window.location.reload();
        navigate("/");
      }, 500);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-between items-center bg-white pr-5 pt-5 pb-5 lg:px-5">
      <AuthModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
      <div className="lg:hidden">
        <Button className="p-0" onClick={toggleDrawer(true)}>
          <FaBars className="text-2xl text-gray-900" />
        </Button>
        <Drawer open={open} onClose={toggleDrawer(false)}>
          <CustomSidebarForAuth />
        </Drawer>
      </div>

      <div>
        <h1
          onClick={() => navigate("/home")}
          className="text-3xl font-roboto font-extrabold text-gray-700 cursor-pointer"
        >
          Aiverr<span className=" text-green-500">.</span>
        </h1>
      </div>

      <div
        className=" hidden relative lg:flex items-center  h-auto min-w-[500px]"
        ref={dropdownRef}
      >
        <input
          value={searchTerm}
          onChange={handleSearchInputChange}
          onFocus={() => setSearchOpen(true)}
          // onKeyPress={handleSearchKeyPress}
          type="text"
          placeholder="What service are you looking for?"
          className="flex gap-4 items-center justify-center w-[250px] lg:w-full  h-[40px] bg-gray-100 rounded-md px-4 py-2 outline-none border border-black text-[12px] lg:text-sm "
        />
        <div
          // onClick={handleSearchButtonClick}
          className=" absolute hidden top-0 right-0 lg:flex items-center justify-center w-[50px] h-[40px] rounded-r-md bg-black/90 text-white cursor-pointer hover:bg-black transition-colors"
        >
          <Search size={20} />
        </div>

        {searchOpen && searchTerm && (
          <div className="absolute right-0 top-12 w-full bg-white rounded-md shadow-lg z-10 max-h-60 overflow-y-auto border border-gray-200">
            {isSearching ? (
              <div className="px-4 py-3 text-sm text-gray-500 flex items-center gap-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-green-500"></div>
                Searching...
              </div>
            ) : searchResults.length > 0 ? (
              <>
                {searchResults.map((gig) => (
                  <div
                    key={gig.id}
                    className="px-3 py-3 cursor-pointer hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 border-b border-gray-100 last:border-b-0 transition-all duration-200 group"
                    onClick={() => handleSearchResultClick(gig)}
                  >
                    <div className="flex items-center gap-3">
                      {/* Thumbnail Image */}
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
                          {gig.thumbnailUrl ? (
                            <img
                              src={gig.thumbnailUrl}
                              alt={gig.name}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.target.style.display = "none";
                                e.target.nextSibling.style.display = "flex";
                              }}
                            />
                          ) : null}
                          <div
                            className={`w-full h-full flex items-center justify-center text-gray-400 ${
                              gig.thumbnailUrl ? "hidden" : "flex"
                            }`}
                          >
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 002 2z"
                              />
                            </svg>
                          </div>
                        </div>
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex-1 min-w-0">
                            
                            <span className="inline-flex items-center bg-green-100 text-green-800 px-2 py-1 rounded-md text-xs font-medium mt-1">
                              {gig.title}
                            </span>
                          </div>

                          
                          {gig.price && (
                            <div className="flex-shrink-0 text-right">
                              <p className="text-sm font-bold text-green-600">
                                ${gig.price}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>

              
                      <div className="flex-shrink-0 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                ))}
                {searchResults.length === 8 && (
                  <div
                    className="px-4 py-3 text-sm cursor-pointer hover:bg-gray-50 text-center text-green-600 font-medium border-t border-gray-200"
                    // onClick={handleSearchButtonClick}
                  >
                    View all results for "{searchTerm}"
                  </div>
                )}
              </>
            ) : searchTerm.length > 0 ? (
              <div className="px-4 py-3 text-sm text-gray-500 text-center">
                No results found for "{searchTerm}"
                <div
                  className="text-green-600 cursor-pointer hover:underline mt-1"
                  onClick={() => setSearchTerm("")}
                >
                  Clear search
                </div>
              </div>
            ) : null}
          </div>
        )}
      </div>

      <div className="hidden lg:flex gap-5 items-center justify-center cursor-pointer relative">
        <p
          onClick={() => navigate("/userorders")}
          className=" text-[16px] font-medium text-[#62646A]"
        >
          Orders
        </p>
        {role === "FREELANCER" && (
          <p
            onClick={() => navigate("/dashboard")}
            className=" text-[16px] font-medium text-green-500"
          >
            Switch to Selling
          </p>
        )}
      </div>

      <div className="flex gap-6 items-center justify-center text-gray-500">
        <button
          onClick={() => handleClick(1)}
          ref={bellRef}
          className=" relative hidden lg:flex items-center justify-center cursor-pointer "
        >
          <Bell />
          <div
            className={`absolute right-0 top-12 z-10 ${
              menuOpen === 1 ? "block" : "hidden"
            } bg-white rounded-md shadow-2xl border border-gray-500/15 p-4 transition-all duration-500 min-w-[400px] min-h-[400px] max-h-[450px] overflow-autoflex flex-col gap-4`}
          >
            <div className="flex gap-4 p-5 border-b border-gray-300">
              <Bell size={20} />
              <p className="text-[15px] ">Notifications</p>
              <p>(1)</p>
            </div>
            <div>
              <div className="p-3 border-b border-gray-100">
                <p className="font-medium">New message from support</p>
                <p className="text-sm text-gray-500">5 min ago</p>
              </div>
            </div>
          </div>
        </button>
        <button
          onClick={() => handleClick(2)}
          ref={mailRef}
          className=" relative hidden lg:flex items-center justify-center cursor-pointer "
        >
          <Mail />
          <div
            className={`absolute right-0 top-12 z-10 ${
              menuOpen === 2 ? "block" : "hidden"
            } bg-white rounded-md shadow-2xl border border-gray-500/15 p-4 transition-all duration-500 min-w-[400px] min-h-[400px] max-h-[450px] overflow-auto flex flex-col gap-4`}
          >
            <div className="flex gap-4 p-5 border-b border-gray-300">
              <Mail size={20} />
              <p className="text-[15px] ">Inbox</p>
              <p>(1)</p>
            </div>
            <div>
              <div className="p-3 border-b border-gray-100">
                <p className="font-medium">Project update</p>
                <p className="text-sm text-gray-500">2 hours ago</p>
              </div>
            </div>
          </div>
        </button>
        <button className=" hidden lg:flex items-center justify-center cursor-pointer ">
          <Heart />
        </button>
        <div
          ref={profileRef}
          className="hidden lg:flex items-center justify-center cursor-pointer relative"
        >
          <img
            onClick={() => handleClick(3)}
            src={
              userDetails?.picture ||
              "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?t=st=1745584229~exp=1745587829~hmac=cd915b62a5e8afa00be08d73a57b5c135a74dac84612a39d28c50277baebd28a&w=900"
            }
            alt="user"
            className="w-9 h-9  rounded-full object-cover items-center cursor-pointer"
          />
          <p className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-white"></p>
          <div
            className={`absolute right-0 top-12 z-10 ${
              menuOpen === 3 ? "block" : "hidden"
            } bg-white rounded-md shadow-2xl border border-gray-500/15 p-4 transition-all duration-500 min-w-[300px]  h-auto  flex flex-col gap-4`}
          >
            <div className="flex flex-col gap-2 text-[15px] ">
              <p
                onClick={() => handleNavigation("/user")}
                className="py-2 hover:text-green-500 cursor-pointer"
              >
                Profile
              </p>
              {role === "FREELANCER" && (
                <p
                  onClick={() => handleNavigation("/dashboard")}
                  className="py-2 hover:text-green-500 "
                >
                  Dashboard
                </p>
              )}
              <p className="py-2 hover:text-green-500">Billing and Payment</p>
              <p
                onClick={handleLogout}
                className="border-t border-gray-200 py-2 hover:text-green-500"
              >
                Logout
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
