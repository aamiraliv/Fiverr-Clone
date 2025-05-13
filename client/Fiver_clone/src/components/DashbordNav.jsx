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
import { IoIosArrowDown } from "react-icons/io";

export const DashboardNav = () => {
  const dispatch = useDispatch();
  const bellRef = useRef(null);
  const mailRef = useRef(null);
  const profileRef = useRef(null);

  const navigate = useNavigate();
  const { role, userDetails } = useSelector((state) => state.auth);

  const [isOpen, setIsOpen] = useState(false);
  const [open, setOpen] = useState(false);
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

  useEffect(() => {
    const handleClickOutside = (event) => {
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

      <div className="flex items-center gap-8">
        <h1
          onClick={() => navigate("/home")}
          className="text-3xl font-roboto font-extrabold text-gray-700 cursor-pointer"
        >
          Aiverr<span className=" text-green-500">.</span>
        </h1>
        <p
          onClick={() => navigate("/dashboard")}
          className=" text-[17px] cursor-pointer font-medium text-[#757679]"
        >
          Dashboard
        </p>
        <div className="relative hidden lg:block cursor-pointer">
          <div
            onClick={() => handleClick(4)}
            className="flex gap-1 items-center justify-center text-gray-950  font-semibold text-[17px] "
          >
            <p className=" text-[17px]  font-medium text-[#757679]">
              My Business
            </p>
            {menuOpen === 4 ? (
              <IoIosArrowDown className="rotate-180 transition duration-500 text-[#62646A]" />
            ) : (
              <IoIosArrowDown className=" transition-transform duration-500 text-[#62646A]" />
            )}
          </div>
          <div
            className={`absolute right-0 top-12 z-10 ${
              menuOpen === 4 ? "block" : "hidden"
            } bg-white rounded-md shadow-2xl border border-gray-500/15 min-w-[200px] transition-all duration-500 flex flex-col gap-4`}
          >
            <div className="flex flex-col gap-1  bg-white rounded-md p-4 w-auto">
              <div className="flex flex-col gap-1 border-b border-gray-300 hover:bg-gray-100 p-2 rounded-md cursor-pointer">
                <h1 className="  text-[15px] text-gray-500">Orders</h1>
              </div>
              <div
                onClick={() => {
                  navigate("/dashboard/gig");
                  setMenuOpen(null);
                }}
                className="flex flex-col gap-1 hover:bg-gray-100 p-2 rounded-md cursor-pointer"
              >
                <h1 className="  text-[15px] text-gray-500">Gigs</h1>
              </div>
              <div
                onClick={() => navigate("/user")}
                className="flex flex-col gap-1 hover:bg-gray-100 p-2 rounded-md cursor-pointer"
              >
                <h1 className="  text-[15px] text-gray-500">Profile</h1>
              </div>
              <div className="flex flex-col gap-1 border-t border-gray-300 hover:bg-gray-100 p-2 rounded-md cursor-pointer">
                <h1 className="  text-[15px] text-gray-500">Earnings</h1>
              </div>
            </div>
          </div>
        </div>
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
