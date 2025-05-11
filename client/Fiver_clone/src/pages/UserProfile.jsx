import { Globe, Mail, Upload } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FileUpload from "../components/GigComp/FileUpload";
import toast from "react-hot-toast";
import { getUserDetails, updateProfle } from "../redux/AuthSlice/authSlice";
import { PropagateLoader } from "react-spinners";

export const UserProfile = () => {
  const { uploadLoading } = useSelector((state) => state.gig);
  const [isUploading, setIsUploading] = useState(false);
  const dispatch = useDispatch();
  const { username, email, role, userDetails } = useSelector(
    (state) => state.auth
  );

  const userId = userDetails?.id;

  useEffect(() => {
    dispatch(getUserDetails(email));
  }, [dispatch, email]);

  const handleUpload = async (url) => {
    try {
      setIsUploading(true);
      await toast.promise(
        dispatch(updateProfle({ userId, url, email })),
        {
          loading: "Uploding...",
          success: "Your Profile Updated successfully!",
          error: (err) => (typeof err === "string" ? err : "Uploading failed!"),
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
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div
      className={` m-auto flex w-full items-center justify-center`}
    >
      <div className=" relative w-full max-w-lg mt-10 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        {uploadLoading && (
          <div className="absolute top-0 left-0 w-full h-full bg-black/30 flex items-center justify-center rounded-lg z-10">
            <PropagateLoader margin={0} color="#ffffff" />
          </div>
        )}
        <p className="absolute top-2 right-2 text-[10px] font-bold py-2 px-4 border border-green-500 bg-green-500/50 text-white rounded-md">
          {role}
        </p>
        <div className="flex flex-col items-center mb-4">
          <div className="mb-4">
            <div className="group relative  h-28 w-28 rounded-full p-2 border-2 border-gray-300">
              <img
                src={
                  userDetails?.picture ||
                  "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?t=st=1745584229~exp=1745587829~hmac=cd915b62a5e8afa00be08d73a57b5c135a74dac84612a39d28c50277baebd28a&w=900"
                }
                alt={`${username}'s profile`}
                className={`h-full w-full rounded-full object-cover transition duration-300 ${
                  isUploading ? "blur-sm opacity-70" : ""
                }`}
              />
              <div className=" absolute inset-0 flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition duration-300 ">
                <Upload size={24} className="text-white z-10" />
              </div>

              <div className=" absolute inset-0 flex items-center justify-center rounded-full bg-gray-900/50 cursor-pointer opacity-0 group-hover:opacity-100 transition duration-300 overflow-hidden ">
                <FileUpload
                  accept="image/*"
                  onUpload={(url) => handleUpload(url)}
                  hide="opacity-0"
                />
              </div>
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-900">{username}</h2>
          <p className="text-gray-500">@{username}</p>
        </div>
        <div className="border-t border-gray-200 my-4"></div>
        <div className="space-y-4">
          <div className="flex items-center gap-3 text-gray-500">
            <Mail className="h-5 w-5" />
            <span>{email}</span>
          </div>

          <div className="border-t border-gray-200 my-2"></div>

          <div className="space-y-2">
            <div className="flex items-center gap-3 text-gray-500">
              <Globe className="h-5 w-5" />
              <p>English</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
