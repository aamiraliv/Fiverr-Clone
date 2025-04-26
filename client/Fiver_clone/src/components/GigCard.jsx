import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import { IoIosStar } from "react-icons/io";

export const GigCard = ({ data , nextBtn , prevBtn}) => {
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
          320: { slidesPerView: 1.6 },
          640: { slidesPerView: 3 },
          768: { slidesPerView: 4 },
          1024: { slidesPerView: 4 },
        }}
      >
        {data.map((item, idx) => (
          <SwiperSlide key={idx} className="w-auto">
            <div className="flex flex-col gap-3 rounded-2xl w-[280px] ">
              <img
                src={item.imageUrl}
                alt=""
                className=" rounded-2xl w-full h-[150px] object-cover"
              />
              <div className="flex flex-col gap-1 ">
                <div className="flex items-center gap-1 ">
                  <img
                    src="https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?t=st=1745584229~exp=1745587829~hmac=cd915b62a5e8afa00be08d73a57b5c135a74dac84612a39d28c50277baebd28a&w=900"
                    alt=""
                    className="w-6 h-6 rounded-full object-cover"
                  />
                  <p className=" font-semibold text-sm">Aiverr Member</p>
                </div>
                <p className="text-sm text-gray-800 font-medium">
                  {item.mainTitle}
                </p>
              </div>
              <div className="flex  gap-1">
                <IoIosStar size={20} />
                <p className="font-bold text-[16px]">{item.rating}</p>
                <p className="text-gray-500">({item.reviewsCount})</p>
              </div>
              <p className="font-bold text-[16px]">From ₹{item.price}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
