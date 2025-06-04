import { IoIosStar } from "react-icons/io";
import { useNavigate } from "react-router-dom";



const GigCardSingle = ({ item }) => {
  const navigate = useNavigate();
  const userDetails = item?.userDetails || {};
  const defaultProfilePic =
    "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?t=st=1745584229~exp=1745587829~hmac=cd915b62a5e8afa00be08d73a57b5c135a74dac84612a39d28c50277baebd28a&w=900";

  const handleGigClick = () => {
    navigate(`/gigpreview/${item.id}`);
    console.log(`Navigate to gig: ${item.id}`);
  };

  return (
    <div className="flex flex-col gap-3 rounded-2xl w-full bg-white shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 overflow-hidden">
      {item?.thumbnailUrl ? (
        <img
          onClick={handleGigClick}
          src={item.thumbnailUrl}
          alt={item.title || "Gig thumbnail"}
          className="w-full h-[200px] object-cover cursor-pointer hover:scale-105 transition-transform duration-200"
        />
      ) : (
        <div className="w-full h-[200px] bg-gray-200 flex items-center justify-center">
          <p className="text-gray-500">No image</p>
        </div>
      )}

      <div className="p-4 flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <img
            src={userDetails.picture || defaultProfilePic}
            alt="User profile"
            className="w-7 h-7 rounded-full object-cover"
          />
          <p className="font-semibold text-sm text-gray-700">
            {userDetails.username || "Unknown user"}
          </p>
        </div>

        <p className="text-sm text-gray-800 font-medium line-clamp-2 leading-relaxed">
          {item?.title || "No title"}
        </p>

        <div className="flex items-center gap-1">
          <IoIosStar size={18} className="text-yellow-500" />
          <p className="font-bold text-sm">
            {item?.rating || "0.0"}
          </p>
          <p className="text-gray-500 text-sm">({item?.reviewsCount || 0})</p>
        </div>

        <p className="font-bold text-lg text-gray-900">
          From ₹{item?.price || "0"}
        </p>
      </div>
    </div>
  );
};

export default GigCardSingle;

