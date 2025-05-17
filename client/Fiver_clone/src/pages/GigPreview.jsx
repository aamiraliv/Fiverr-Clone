import { ChevronLeft, ChevronRight, Heart, Repeat2, Timer } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getGigByGigId } from "../redux/GigSlice/gigSlice";
import { MoonLoader } from "react-spinners";
import { getFreelancerDetails } from "../redux/AuthSlice/authSlice";

export default function GigPreview() {
  const [mediaItems, setMediaItems] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const { getbygigId, getbygigIdloding } = useSelector((state) => state.gig);
  const { freelancer } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { id } = useParams();
  const userId = getbygigId?.userId;

  useEffect(() => {
    dispatch(getGigByGigId(id));
  }, [dispatch, id]);

  useEffect(() => {
    dispatch(getFreelancerDetails(userId));
  }, [dispatch, userId]);

  useEffect(() => {
    if (!getbygigId) return;

    const items = [];

    if (getbygigId.imageUrl1) {
      items.push({ type: "image", url: getbygigId.imageUrl1, id: "img1" });
    }
    if (getbygigId.imageUrl2) {
      items.push({ type: "image", url: getbygigId.imageUrl2, id: "img2" });
    }
    if (getbygigId.imageUrl3) {
      items.push({ type: "image", url: getbygigId.imageUrl3, id: "img3" });
    }

    if (getbygigId.videoUrl) {
      items.push({
        type: "video",
        url: getbygigId.videoUrl,
        thumbnail: getbygigId.thumbnailUrl || "",
        id: "video1",
      });
    }

    setMediaItems(items);
  }, [getbygigId]);

  const goToNext = () => {
    if (mediaItems.length <= 1) return;
    setCurrentIndex((prevIndex) =>
      prevIndex === mediaItems.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToPrev = () => {
    if (mediaItems.length <= 1) return;
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? mediaItems.length - 1 : prevIndex - 1
    );
  };

  const currentItem = mediaItems[currentIndex];

  const removePrefixFromName = (name) => {
    if (
      name &&
      typeof name === "string" &&
      name.toLowerCase().startsWith("i will")
    ) {
      return name.substring(6).trim();
    }
    return name || "";
  };

  if (getbygigIdloding) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <MoonLoader color="#6e6e6e" />
      </div>
    );
  }

  if (!getbygigId || !getbygigId.title) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500">No gig information available</p>
      </div>
    );
  }

  return (
    <div className="relative">
      <div className=" bg-gray-200 mr-[450px]">
        <div className="w-full p-8 flex flex-col gap-4">
          <h1 className="text-2xl font-bold mt-4">{getbygigId.title}</h1>
          <div className="flex items-center gap-2">
            <img
              src={freelancer?.picture}
              alt="freelancer"
              className="h-16 w-16 rounded-full object-cover"
            />
            <h1 className="text-xl font-semibold text-gray-800 uppercase">
              {freelancer?.username}
            </h1>
          </div>
          <div>
            {mediaItems.length > 0 && (
              <div className="mt-4">
                <div className="relative w-full bg-gray-100 rounded overflow-hidden">
                  <div className="aspect-video w-full relative">
                    {currentItem.type === "image" ? (
                      <img
                        src={currentItem.url}
                        alt="Preview"
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <video
                        src={currentItem.url}
                        // poster={currentItem.thumbnail}
                        controls
                        className="w-full h-full object-contain"
                      />
                    )}

                    {mediaItems.length > 1 && (
                      <>
                        <button
                          onClick={goToPrev}
                          className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-md transition-colors"
                          aria-label="Previous image"
                        >
                          <ChevronLeft size={24} />
                        </button>

                        <button
                          onClick={goToNext}
                          className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-md transition-colors"
                          aria-label="Next image"
                        >
                          <ChevronRight size={24} />
                        </button>
                      </>
                    )}
                  </div>
                </div>

                {mediaItems.length > 1 && (
                  <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
                    {mediaItems.map((item, index) => (
                      <button
                        key={item.id}
                        onClick={() => setCurrentIndex(index)}
                        className={`flex-shrink-0 w-20 h-16 overflow-hidden rounded border-2 transition-all ${
                          index === currentIndex
                            ? "border-blue-500 opacity-100"
                            : "border-transparent opacity-70 hover:opacity-100"
                        }`}
                      >
                        {item.type === "image" ? (
                          <img
                            src={item.url}
                            alt={`Thumbnail ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="relative w-full h-full bg-gray-200">
                            <img
                              src={item.thumbnail}
                              alt="Video thumbnail"
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                              <div className="w-6 h-6 rounded-full bg-white/80 flex items-center justify-center">
                                <div className="w-0 h-0 border-t-4 border-t-transparent border-l-8 border-l-gray-800 border-b-4 border-b-transparent ml-0.5"></div>
                              </div>
                            </div>
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
          <div className="flex flex-col gap-3">
            <h1 className="text-xl text-gray-800 font-semibold border-t border-gray-300 pt-4">
              About this gig
            </h1>
            <p className="text-sm font-light text-gray-500 ">
              {getbygigId.description}
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <h1 className="text-xl text-gray-800 font-semibold border-t border-gray-300 pt-4">
              Tools Used
            </h1>
            <div className="flex gap-3">
              {getbygigId.tags.map((tool, index) => (
                <div key={index}>
                  <p className="text-sm font-normal px-3 rounded-md text-black/50 bg-white border border-black/50">
                    {tool}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-3">
            {getbygigId.deliveryTime && (
              <div className="text-gray-900 flex items-center gap-2">
                <Timer size={20} />
                <p>{getbygigId.deliveryTime}-day delivery</p>
              </div>
            )}
            {getbygigId.revisions && (
              <div className="text-gray-900 flex items-center gap-2">
                <Repeat2 size={20} />
                <p>{getbygigId.revisions} Revisions</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="fixed right-10 top-25 z-10 flex min-h-screen w-full md:w-96 items-start justify-end">
        <div className="w-full md:w-96 bg-white h-full overflow-y-auto border border-gray-300 rounded-lg shadow-lg">
          <div className="p-6 flex flex-col gap-4">
            <div className="flex w-full justify-end">
              <Heart
                size={20}
                className=" text-gray-500 hover:text-red-500 transition-colors duration-200"
              />
            </div>
            <div className="flex justify-between items-start">
              <h1 className="text-lg font-bold">
                {removePrefixFromName(getbygigId.title)}
              </h1>
              {getbygigId.price && (
                <div className=" flex items-center">
                  <span className="ml-2 text-lg text-green-600">
                    ₹
                    {typeof getbygigId.price === "number"
                      ? getbygigId.price.toFixed(2)
                      : getbygigId.price}
                  </span>
                </div>
              )}
            </div>
            {getbygigId.description && (
              <p className="text-gray-500">{getbygigId.description}</p>
            )}
            <div className="mt-4 flex text-sm font-semibold gap-4 border-t pt-4 ">
              {getbygigId.deliveryTime && (
                <div className="text-gray-900 flex items-center gap-2">
                  <Timer size={20} />
                  <p>{getbygigId.deliveryTime}-day delivery</p>
                </div>
              )}
              {getbygigId.revisions && (
                <div className="text-gray-900 flex items-center gap-2">
                  <Repeat2 size={20} />
                  <p>{getbygigId.revisions} Revisions</p>
                </div>
              )}
            </div>
            <button className="w-full p-4 bg-gray-800 rounded-sm text-white font-semibold hover:bg-gray-700 transition-colors duration-200">
              Request to order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
