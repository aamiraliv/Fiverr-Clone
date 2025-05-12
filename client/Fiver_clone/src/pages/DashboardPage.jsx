import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails } from "../redux/AuthSlice/authSlice";
import { FaSpinner } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const DashboardPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { email, userDetails } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getUserDetails(email));
  }, [dispatch, email]);

  return (
    <div className="w-full bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center md:col-span-1">
            <div className="w-24 h-24 mb-4">
              <img
                src={
                  userDetails?.picture ||
                  "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?t=st=1745584229~exp=1745587829~hmac=cd915b62a5e8afa00be08d73a57b5c135a74dac84612a39d28c50277baebd28a&w=900"
                }
                alt="Profile"
                className="rounded-full w-full h-full object-cover"
              />
            </div>
            <h3 className="text-xl font-semibold">{userDetails.username}</h3>
            <p className="text-gray-600 mb-4">@{userDetails.email}</p>

            <button
              onClick={() => navigate("/user")}
              className="w-full py-2 px-4 border border-gray-300 rounded-md text-gray-700 mb-2 hover:bg-gray-700 hover:text-white transition duration-200"
            >
              View profile
            </button>
          </div>

          <div className="bg-white rounded-lg shadow p-6 md:col-span-3">
            <h2 className="text-lg font-semibold mb-4">Level overview</h2>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">My level</span>
                <span className="font-medium">
                  <FaSpinner />
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-600">Success score</span>
                <span className="font-medium">
                  <FaSpinner />
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-600">Rating</span>
                <div>
                  <span className="inline-block mr-1">★</span>
                  <span className="font-medium">soon..</span>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-600">Response rate</span>
                <span className="font-medium">soon..</span>
              </div>
            </div>

            <button className="mt-6 w-full md:w-auto py-2 px-4 border border-gray-300 rounded-md text-gray-700">
              View progress
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex flex-col md:flex-row justify-between">
            <div>
              <h1 className="text-2xl font-bold mb-1">
                Welcome, {userDetails.username}
              </h1>
              <p className="text-gray-600 mb-4">
                Find important messages, tips, and links to helpful resources
                here:
              </p>

              <div className="bg-gray-50 border border-gray-200 p-4 rounded-md">
                <div className="flex justify-between">
                  <p>
                    You're all up to speed! Keep an eye out for future updates.
                  </p>
                  <button className="text-blue-600 font-medium  ">
                    Dismiss
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-4 md:mt-0">
              <div className="relative inline-block text-left w-full md:w-auto">
                <div className="mt-4 md:mt-0">
                  <button className="inline-flex w-full md:w-auto justify-between items-center px-4 py-2 border border-gray-300 rounded-md bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                    Active orders (soon...)
                    <svg
                      className="-mr-1 ml-2 h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-medium text-gray-700">
                Active orders - 2 (500)
              </h3>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-medium text-gray-700 mb-3">
            Upgrade Your Business
          </h3>

          <div className="relative bg-green-900 rounded-lg p-6 text-white overflow-hidden">
            <div className="relative z-10 max-w-lg">
              <h3 className="text-3xl font-bold mb-2">Be a scroll stopper</h3>
              <p className="text-xl">
                Grab more attention with these Gig image tips.
              </p>
            </div>

            <div className="absolute right-6 bottom-6 w-40 h-40 bg-green-100 bg-opacity-20 rounded-lg flex items-center justify-center">
              <div className="w-32 h-32 bg-gray-200 rounded-md relative">
                <div className="absolute inset-4 border-2 border-dashed border-gray-400 flex items-center justify-center">
                  <svg
                    className="w-12 h-12 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    ></path>
                  </svg>
                </div>
              </div>
            </div>

            <div className="absolute top-4 right-4 bg-white rounded-full p-1">
              <svg
                className="w-6 h-6 text-green-500"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Availability</h2>

            <p className="text-gray-600 mb-4">
              While unavailable, your Gigs are hidden and you will not receive
              new orders.
            </p>

            <button className="w-full md:w-auto py-2 px-4 border border-gray-300 rounded-md text-gray-700">
              Set your availability
            </button>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">
                Earned in (this month - soon..)
              </h3>
              <span className="text-lg font-semibold">(500)</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="flex justify-between items-center p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold">Inbox</h2>
            <a href="#" className="text-blue-600">
              View All
            </a>
          </div>

          {/* <div className="divide-y divide-gray-200">
            {userData.messages.map((message) => (
              <div key={message.id} className="flex p-4 hover:bg-gray-50">
                <div className="mr-4">
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-teal-500 flex items-center justify-center text-white font-medium">
                      {message.initial}
                    </div>
                    {message.isUnread && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-gray-400 border-2 border-white rounded-full"></div>
                    )}
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex justify-between">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {message.sender}
                    </p>
                    <p className="text-sm text-gray-500">{message.time}</p>
                  </div>
                  <p className="text-sm text-gray-500 truncate">
                    {message.preview}
                  </p>
                </div>

                <div className="ml-4 flex-shrink-0">
                  <button className="text-gray-400 hover:text-gray-500">
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
                        d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                      ></path>
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
