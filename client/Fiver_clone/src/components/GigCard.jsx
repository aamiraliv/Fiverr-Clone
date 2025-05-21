import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import { IoIosStar } from "react-icons/io";
import { Loader, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const GigCard = ({ data, nextBtn, prevBtn }) => {
  const navigate = useNavigate();

  if (!data || data.length === 0) {
    return (
      <div className="w-full flex justify-center items-center h-48">
        <Loader className="animate-spin" size={32} />
      </div>
    );
  }

  return (
    <div className="w-full relative">
      <Swiper
        modules={[Navigation]}
        spaceBetween={10}
        slidesPerView={5.5}
        navigation={{
          nextEl: nextBtn,
          prevEl: prevBtn,
        }}
        breakpoints={{
          320: { slidesPerView: 1.1 },
          640: { slidesPerView: 3 },
          768: { slidesPerView: 4 },
          1024: { slidesPerView: 4 },
        }}
      >
        {data.map((item, idx) => {
          const userDetails = item.userDetails || {};
          const defaultProfilePic =
            "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?t=st=1745584229~exp=1745587829~hmac=cd915b62a5e8afa00be08d73a57b5c135a74dac84612a39d28c50277baebd28a&w=900";

          return (
            <SwiperSlide key={idx} className="w-auto">
              <div className="flex flex-col gap-3 rounded-2xl w-[280px]">
                {item.thumbnailUrl ? (
                  <img
                    onClick={() => navigate(`/gigpreview/${item.id}`)}
                    src={item.thumbnailUrl}
                    alt={item.title || "Gig thumbnail"}
                    className="rounded-2xl w-full h-[150px] object-cover cursor-pointer"
                  />
                ) : (
                  <div className="rounded-2xl w-full h-[150px] bg-gray-200 flex items-center justify-center">
                    <p className="text-gray-500">No image</p>
                  </div>
                )}

                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-1">
                    <img
                      src={userDetails.picture || defaultProfilePic}
                      alt="User profile"
                      className="w-6 h-6 rounded-full object-cover"
                    />
                    <p className="font-semibold text-sm">
                      {userDetails.username || "Unknown user"}
                    </p>
                  </div>
                  <p className="text-sm text-gray-800 font-medium line-clamp-2">
                    {item.title || "No title"}
                  </p>
                </div>

                <div className="flex items-center gap-1">
                  <IoIosStar size={20} className="text-yellow-500" />
                  <p className="font-bold text-[16px]">
                    {item.rating || "0.0"}
                  </p>
                  <p className="text-gray-500">({item.reviewsCount || 0})</p>
                </div>

                <p className="font-bold text-[16px]">
                  From ₹{item.price || "0"}
                </p>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};
