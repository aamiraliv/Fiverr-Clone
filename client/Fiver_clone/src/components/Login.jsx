import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import girlImage from "../assets/standard.0638957.png";
import { FaArrowLeft, FaRegEnvelope } from "react-icons/fa6";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import freelacerVector from "../assets/freelancerVector.svg";
import userVector from "../assets/userVector.svg";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, registerUser } from "../redux/AuthSlice/authSlice";
import toast from "react-hot-toast";

export default function AuthModal({ isOpen, onClose, closeDialog }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);

  const [regForm, setRegForm] = useState({
    email: "",
    password: "",
    username: "",
    role: "",
  });
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });
  const [step, setStep] = useState("signup"); //signup ,login
  const [regStep, setRegStep] = useState("null");

  const isLogDisabled = !loginForm.email || !loginForm.password;
  const isRegDisabled = !regForm.email || !regForm.password;

  console.log("regForm", regForm);
  console.log("loginForm", loginForm);

  const validations = {
    length: regForm.password.length >= 8,
    uppercase: /[A-Z]/.test(regForm.password),
    lowercase: /[a-z]/.test(regForm.password),
    number: /\d/.test(regForm.password),
  };
  const isPasswordValid = Object.values(validations).every(Boolean);

  const handleSelect = (role) => {
    setRegForm((prev) => ({
      ...prev,
      role: role,
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await toast.promise(
        dispatch(registerUser(regForm)).unwrap(),
        {
          loading: "Registering...",
          success: "You are registered successfully!",
          error: (err) =>
            typeof err === "string" ? err : "Registration failed!",
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

      setTimeout(() => {
        setStep("login");
        setRegStep("null");
        setRegForm({
          email: "",
          password: "",
          username: "",
          role: "",
        });
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await toast.promise(
        dispatch(loginUser(loginForm)).unwrap(),
        {
          loading: "Login...",
          success: "You are Logined successfully!",
          error: (err) => (typeof err === "string" ? err : "Login failed!"),
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

      setTimeout(() => {
        setLoginForm({
          email: "",
          password: "",
        });
        setStep("signup");
        navigate("/home", { replace: true });

      }, 500);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Transition show={isOpen} as={Fragment} set>
      <Dialog onClose={onClose} className="fixed inset-0 z-50">
        {/* Overlay */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-50"
          leave="ease-in duration-200"
          leaveFrom="opacity-50"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/50" />
        </Transition.Child>

        {/* Modal Content */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-90"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-90"
        >
          <div className="fixed inset-0 min-h-[500px] flex items-center justify-center p-4">
            <Dialog.Panel className="w-full max-w-4xl h-[85vh] bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="lg:grid  lg:grid-cols-2">
                <div className="relative hidden lg:flex">
                  <img
                    src={girlImage}
                    alt=""
                    className="flex-shrink-0 object-cover w-full h-full "
                  />
                  <div className="absolute inset-0 items-center p-10 text-white">
                    <h2 className="text-3xl font-bold mb-4">
                      Success starts here
                    </h2>
                    <ul className="space-y-2 text-[18px]">
                      <li>✓ Over 700 categories</li>
                      <li>✓ Quality work done faster</li>
                      <li>
                        ✓ Access to talent and businesses across the globe
                      </li>
                    </ul>
                  </div>
                </div>
                {/* Auth area */}
                {regStep === "null" && (
                  <div className="flex flex-col gap-4 mt-5 p-10 bg-white">
                    {/* signup */}
                    {step === "signup" && (
                      <div>
                        <h2 className="text-2xl font-bold">
                          Create a new account
                        </h2>
                        <p className="text-sm text-gray-950 ">
                          Already have an account?{" "}
                          <span
                            className=" underline cursor-pointer"
                            onClick={() => setStep("login")}
                          >
                            Sign in
                          </span>
                        </p>
                      </div>
                    )}
                    {/* login */}
                    {step === "login" && (
                      <div>
                        <h2 className="text-2xl font-bold">
                          Sign in to your account
                        </h2>
                        <p className="text-sm text-gray-950 ">
                          Don’t have an account?{" "}
                          <span
                            className=" underline cursor-pointer"
                            onClick={() => setStep("signup")}
                          >
                            Join Here
                          </span>
                        </p>
                      </div>
                    )}
                    <div className="flex cursor-pointer gap-8 mt-4 items-center justify-center p-3 border border-black/10 rounded-md w-[90%]">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        x="0px"
                        y="0px"
                        width="20"
                        height="20"
                        viewBox="0 0 48 48"
                      >
                        <path
                          fill="#FFC107"
                          d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                        ></path>
                        <path
                          fill="#FF3D00"
                          d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                        ></path>
                        <path
                          fill="#4CAF50"
                          d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                        ></path>
                        <path
                          fill="#1976D2"
                          d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                        ></path>
                      </svg>
                      <p className="text-gray-950 font-medium text-[15px]">
                        Continue with Google
                      </p>
                    </div>
                    <div className="flex cursor-pointer gap-8 mt-4 items-center justify-center p-3 border border-black/10 rounded-md w-[90%]">
                      <FaRegEnvelope size={20} />
                      <p
                        onClick={
                          step === "signup"
                            ? () => setRegStep("create")
                            : () => setRegStep("email")
                        }
                        className="text-gray-950 cursor-pointer font-medium text-[15px]"
                      >
                        Continue with Email
                      </p>
                    </div>
                    <div>
                      <p className="text-[12px] text-gray-500 mt-4">
                        By joining, you agree to the Aiverr Terms of Service and
                        to occasionally receive emails from us. Please read our
                        Privacy Policy to learn how we use your personal data.
                      </p>
                    </div>
                  </div>
                )}
                {/* login page */}
                {regStep === "email" && (
                  <form onSubmit={handleLogin}>
                    <div className="flex flex-col m-auto mt-5 p-10 bg-white">
                      <div
                        onClick={() => setRegStep("null")}
                        className="flex gap-2 cursor-pointer items-center w-fit rounded-lg p-4 hover:bg-gray-100"
                      >
                        <FaArrowLeft />
                        <p>Back</p>
                      </div>
                      <h2 className="text-2xl font-bold mb-5">
                        Continue with your email
                      </h2>
                      <div className="flex flex-col gap-2 w-full mb-4">
                        <p className="text-gray-900 text-sm font-semibold">
                          Email
                        </p>
                        <input
                          onChange={(e) =>
                            setLoginForm({
                              ...loginForm,
                              email: e.target.value,
                            })
                          }
                          type="text"
                          className="border border-black/30 rounded-md px-4 py-2"
                          name="email"
                          value={loginForm.email}
                        />
                      </div>
                      <div className="flex flex-col gap-2 w-full mb-4">
                        <p className="text-gray-900 text-sm font-semibold">
                          Password
                        </p>

                        <input
                          onChange={(e) =>
                            setLoginForm({
                              ...loginForm,
                              password: e.target.value,
                            })
                          }
                          type="text"
                          className="border border-black/30 rounded-md px-4 py-2"
                          name="email"
                          value={loginForm.password}
                        />
                        <p className="flex justify-end underline cursor-pointer font-normal text-[12px] text-gray-900">
                          Forgot password?
                        </p>
                      </div>
                      <button
                        type="submit"
                        disabled={isLogDisabled}
                        className={`rounded-md   w-full p-2 mt-5 font-semibold ${
                          isLogDisabled
                            ? "bg-gray-200 text-gray-400"
                            : "bg-gray-900 text-white"
                        }`}
                      >
                        Login
                      </button>
                    </div>
                  </form>
                )}
                {/* register page */}
                {regStep === "create" && (
                  <form>
                    <div className="flex flex-col m-auto p-10 bg-white">
                      <div
                        onClick={() => setRegStep("null")}
                        className="flex gap-2 cursor-pointer items-center w-fit rounded-lg p-4 hover:bg-gray-100"
                      >
                        <FaArrowLeft />
                        <p>Back</p>
                      </div>
                      <h2 className="text-2xl font-bold mb-5">
                        Continue with your email
                      </h2>
                      <div className="flex flex-col gap-2 w-full mb-4">
                        <p className="text-gray-900 text-sm font-semibold">
                          Email
                        </p>
                        <input
                          onChange={(e) =>
                            setRegForm({
                              ...regForm,
                              email: e.target.value,
                            })
                          }
                          type="text"
                          className="border border-black/30 rounded-md px-4 py-2"
                          name="email"
                          value={regForm.email}
                        />
                      </div>
                      <div className="flex flex-col gap-2 w-full mb-4">
                        <p className="text-gray-900 text-sm font-semibold">
                          Password
                        </p>

                        <input
                          onChange={(e) =>
                            setRegForm({
                              ...regForm,
                              password: e.target.value,
                            })
                          }
                          type="text"
                          className="border border-black/30 rounded-md px-4 py-2"
                          name="email"
                          value={regForm.password}
                        />
                      </div>
                      <div>
                        <p
                          className={`flex items-center gap-2 text-[12px] ${
                            validations.length
                              ? "text-green-500"
                              : "text-gray-500"
                          }`}
                        >
                          <IoMdCheckmarkCircleOutline />
                          At least 8 characters
                        </p>
                        <p
                          className={`flex items-center gap-2 text-[12px] ${
                            validations.uppercase
                              ? "text-green-500"
                              : "text-gray-500"
                          }`}
                        >
                          <IoMdCheckmarkCircleOutline />
                          At least 1 uppercase letter
                        </p>
                        <p
                          className={`flex items-center gap-2 text-[12px] ${
                            validations.lowercase
                              ? "text-green-500"
                              : "text-gray-500"
                          }`}
                        >
                          <IoMdCheckmarkCircleOutline />
                          At least 1 lowercase letter
                        </p>
                        <p
                          className={`flex items-center gap-2 text-[12px] ${
                            validations.number
                              ? "text-green-500"
                              : "text-gray-500"
                          }`}
                        >
                          <IoMdCheckmarkCircleOutline />
                          At least 1 number
                        </p>
                      </div>
                      <button
                        onClick={() => setRegStep("createName")}
                        disabled={isRegDisabled || !isPasswordValid}
                        className={`rounded-md   w-full p-2 mt-5 font-semibold ${
                          isRegDisabled || !isPasswordValid
                            ? "bg-gray-200 text-gray-400"
                            : "bg-gray-900 text-white"
                        }`}
                      >
                        Continue
                      </button>
                    </div>
                  </form>
                )}
                {/* case "createName": */}
                {regStep === "createName" && (
                  <div className="flex flex-col p-10 bg-white">
                    <div
                      onClick={() => setRegStep("create")}
                      className="flex gap-2 cursor-pointer items-center w-fit rounded-lg p-4 hover:bg-gray-100"
                    >
                      <FaArrowLeft />
                      <p>Back</p>
                    </div>
                    <h2 className="text-2xl font-bold mb-5">
                      Get your profile started
                    </h2>
                    <p className="text-sm text-gray-950 mb-5">
                      We’ll help you set up your profile and get started on
                      Aiverr. You can always change your profile later.
                    </p>
                    <div className="flex flex-col gap-2 w-full mb-4">
                      <p className="text-gray-900 text-sm font-medium">
                        Choose a username
                      </p>
                      <input
                        onChange={(e) =>
                          setRegForm({
                            ...regForm,
                            username: e.target.value,
                          })
                        }
                        type="text"
                        className="border border-black/30 rounded-md px-4 py-2"
                        name="email"
                        value={regForm.username}
                      />
                    </div>
                    <button
                      onClick={() => setRegStep("createFinal")}
                      disabled={regForm.username.length < 3}
                      className={`rounded-md   w-full p-2 mt-5 font-semibold ${
                        regForm.username.length < 3
                          ? "bg-gray-200 text-gray-400"
                          : "bg-gray-900 text-white"
                      }`}
                    >
                      Create My Account
                    </button>
                  </div>
                )}
                {/* case "createFinal": */}
                {regStep === "createFinal" && (
                  <div className="flex flex-col p-10 bg-white">
                    <form onSubmit={handleRegister}>
                      <div
                        onClick={() => setRegStep("createName")}
                        className="flex gap-2 cursor-pointer items-center w-fit rounded-lg p-4 hover:bg-gray-100"
                      >
                        <FaArrowLeft />
                        <p>Back</p>
                      </div>
                      <h2 className="text-2xl font-bold mb-5 border-b border-gray-300 pb-5">
                        Get your Role in Aiverr
                      </h2>
                      <div className="flex flex-col gap-2 w-full mb-4 mt-2">
                        <div
                          onClick={() => handleSelect("USER")}
                          className={`flex gap-2 items-center rounded-lg p-4 border border-black/40  cursor-pointer ${
                            regForm.role === "USER"
                              ? "border-green-500 bg-green-100 hover:"
                              : "border-black/40"
                          }`}
                        >
                          <img
                            src={userVector}
                            alt=""
                            className="h-14 pr-2 border-r border-black/40"
                          />
                          <div className="flex flex-col gap-1">
                            <h1 className="text-sm font-bold text-gray-900">
                              USER
                            </h1>
                            <p className="text-[12px] font-normal text-gray-800">
                              I want to hire freelancers for services.
                            </p>
                          </div>
                        </div>
                        <div
                          onClick={() => handleSelect("FREELANCER")}
                          className={`flex gap-2 items-center rounded-lg p-4 border border-black/40  cursor-pointer ${
                            regForm.role === "FREELANCER"
                              ? "border-green-500 bg-green-100 hover:"
                              : "border-black/40"
                          }`}
                        >
                          <img
                            src={freelacerVector}
                            alt=""
                            className="h-14 pr-2 border-r border-black/40"
                          />
                          <div className="flex flex-col gap-1">
                            <h1 className="text-sm font-bold text-gray-900">
                              FREELANCER
                            </h1>
                            <p className="text-[12px] font-normal text-gray-800">
                              I want to offer services and earn money.
                            </p>
                          </div>
                        </div>
                      </div>
                      <button
                        type="submit"
                        disabled={loading || regForm.role.length < 1}
                        className={`rounded-md   w-full p-2 mt-5 font-semibold ${
                          regForm.role.length < 1 || loading
                            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                            : "bg-gray-900 text-white"
                        }`}
                      >
                        {loading ? (
                          <svg
                            className="animate-spin h-5 w-5 mr-3 text-white"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                              fill="none"
                            />
                          </svg>
                        ) : (
                          "Sign Up"
                        )}
                      </button>
                    </form>
                  </div>
                )}
              </div>
            </Dialog.Panel>
          </div>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
}
