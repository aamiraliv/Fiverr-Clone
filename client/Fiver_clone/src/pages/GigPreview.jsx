import {
  ChevronLeft,
  ChevronRight,
  Heart,
  Repeat2,
  Timer,
  BarChart2,
  MousePointerClick,
  Package,
  AlertCircle,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getGigByGigId } from "../redux/GigSlice/gigSlice";
import { MoonLoader } from "react-spinners";
import { getFreelancerDetails } from "../redux/AuthSlice/authSlice";

export default function GigPreview() {
  const navigate = useNavigate();
  const [mediaItems, setMediaItems] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showOrderCard, setShowOrderCard] = useState(false); // For mobile view

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

  // Mobile view toggle order card
  const toggleOrderCard = () => {
    setShowOrderCard(!showOrderCard);
  };

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
      {/* Main content */}
      <div className=" lg:mr-[450px] md:mr-0 sm:mr-0">
        <div className="w-full p-4 md:p-6 lg:p-8 flex flex-col gap-4">
          <h1 className="text-xl md:text-2xl font-bold mt-2 md:mt-4">
            {getbygigId.title}
          </h1>
          <div className="flex items-center gap-2">
            <img
              src={freelancer?.picture}
              alt="freelancer"
              className="h-12 w-12 md:h-16 md:w-16 rounded-full object-cover"
            />
            <h1 className="text-lg md:text-xl font-semibold text-gray-800 uppercase">
              {freelancer?.username}
            </h1>
          </div>

          {/* Media content */}
          <div>
            {mediaItems.length > 0 && (
              <div className="mt-2 md:mt-4">
                <div className="relative w-full bg-gray-100 rounded overflow-hidden">
                  <div className="aspect-video w-full relative">
                    {currentItem?.type === "image" ? (
                      <img
                        src={currentItem.url}
                        alt="Preview"
                        className="w-full h-full object-contain"
                      />
                    ) : currentItem?.type === "video" ? (
                      <video
                        src={currentItem.url}
                        controls
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-200">
                        <p className="text-gray-500">No media available</p>
                      </div>
                    )}

                    {mediaItems.length > 1 && (
                      <>
                        <button
                          onClick={goToPrev}
                          className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-1 md:p-2 shadow-md transition-colors"
                          aria-label="Previous image"
                        >
                          <ChevronLeft size={20} />
                        </button>

                        <button
                          onClick={goToNext}
                          className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-1 md:p-2 shadow-md transition-colors"
                          aria-label="Next image"
                        >
                          <ChevronRight size={20} />
                        </button>
                      </>
                    )}
                  </div>
                </div>

                {mediaItems.length > 1 && (
                  <div className="mt-2 md:mt-4 flex gap-1 md:gap-2 overflow-x-auto pb-2">
                    {mediaItems.map((item, index) => (
                      <button
                        key={item.id}
                        onClick={() => setCurrentIndex(index)}
                        className={`flex-shrink-0 w-16 h-12 md:w-20 md:h-16 overflow-hidden rounded border-2 transition-all ${
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
                              <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-white/80 flex items-center justify-center">
                                <div className="w-0 h-0 border-t-3 border-t-transparent border-l-6 border-l-gray-800 border-b-3 border-b-transparent ml-0.5"></div>
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

          {/* About this gig */}
          <div className="flex flex-col gap-2 md:gap-3">
            <h1 className="text-lg md:text-xl text-gray-800 font-semibold border-t border-gray-300 pt-3 md:pt-4">
              About this gig
            </h1>
            <p className="text-xs md:text-sm font-light text-gray-500">
              {getbygigId.description}
            </p>
          </div>

          {/* Tools Used */}
          <div className="flex flex-col gap-2 md:gap-3">
            <h1 className="text-lg md:text-xl text-gray-800 font-semibold border-t border-gray-300 pt-3 md:pt-4">
              Tools Used
            </h1>
            <div className="flex flex-wrap gap-2 md:gap-3">
              {getbygigId.tags?.map((tool, index) => (
                <div key={index}>
                  <p className="text-xs md:text-sm font-normal px-2 md:px-3 py-1 rounded-md text-black/50 bg-white border border-black/50">
                    {tool}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Delivery & Revisions */}
          <div className="flex flex-col gap-2 md:gap-3">
            {getbygigId.deliveryTime && (
              <div className="text-gray-900 flex items-center gap-2">
                <Timer size={16} className="md:w-5 md:h-5" />
                <p className="text-sm md:text-base">
                  {getbygigId.deliveryTime}-day delivery
                </p>
              </div>
            )}
            {getbygigId.revisions && (
              <div className="text-gray-900 flex items-center gap-2">
                <Repeat2 size={16} className="md:w-5 md:h-5" />
                <p className="text-sm md:text-base">
                  {getbygigId.revisions} Revisions
                </p>
              </div>
            )}
          </div>

          {/* Gig Statistics */}
          <div className="flex flex-col gap-2 md:gap-3 mt-2">
            <h1 className="text-lg md:text-xl text-gray-800 font-semibold border-t border-gray-300 pt-3 md:pt-4">
              Gig Statistics
            </h1>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center gap-2">
                  <BarChart2 size={16} className="text-blue-500" />
                  <p className="text-sm font-medium text-gray-700">
                    Impressions
                  </p>
                </div>
                <p className="text-xl font-bold mt-1">
                  {getbygigId.impressions || 0}
                </p>
              </div>

              <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center gap-2">
                  <MousePointerClick size={16} className="text-green-500" />
                  <p className="text-sm font-medium text-gray-700">Clicks</p>
                </div>
                <p className="text-xl font-bold mt-1">
                  {getbygigId.clicks || 0}
                </p>
              </div>

              <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center gap-2">
                  <Package size={16} className="text-purple-500" />
                  <p className="text-sm font-medium text-gray-700">Orders</p>
                </div>
                <p className="text-xl font-bold mt-1">
                  {getbygigId.orders || 0}
                </p>
              </div>

              <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center gap-2">
                  <AlertCircle size={16} className="text-red-500" />
                  <p className="text-sm font-medium text-gray-700">
                    Cancellation
                  </p>
                </div>
                <p className="text-xl font-bold mt-1">
                  {getbygigId.cancellationRate
                    ? `${(getbygigId.cancellationRate * 100).toFixed(1)}%`
                    : "0.0%"}
                </p>
              </div>
            </div>

            <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-200 mt-2">
              <div className="flex justify-between items-center">
                <p className="text-sm font-medium text-gray-700">Status</p>
                <div
                  className={`px-2 py-1 rounded text-xs font-medium ${
                    getbygigId.status === "ACTIVE"
                      ? "bg-green-100 text-green-700"
                      : getbygigId.status === "PAUSED"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {getbygigId.status || "ACTIVE"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile view - bottom fixed button to show order card */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200 shadow-lg z-20">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-lg font-bold text-green-600">
              ₹
              {typeof getbygigId.price === "number"
                ? getbygigId.price.toFixed(2)
                : getbygigId.price}
            </p>
          </div>
          <button
            onClick={toggleOrderCard}
            className="px-4 py-2 bg-gray-800 rounded-sm text-white font-semibold hover:bg-gray-700 transition-colors duration-200"
          >
            {showOrderCard ? "Hide details" : "Request to order"}
          </button>
        </div>
      </div>

      {/* Mobile order card */}
      {showOrderCard && (
        <div className="lg:hidden fixed inset-0 bg-black/50 z-30 flex items-end">
          <div className="bg-white w-full rounded-t-xl p-4 pb-8 max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Order Details</h2>
              <button onClick={toggleOrderCard} className="p-2">
                ✕
              </button>
            </div>

            <div className="flex w-full justify-end mb-2">
              <Heart
                size={20}
                className="text-gray-500 hover:text-red-500 transition-colors duration-200"
              />
            </div>

            <div className="flex justify-between items-start mb-3">
              <h1 className="text-lg font-bold">
                {removePrefixFromName(getbygigId.title)}
              </h1>
              {getbygigId.price && (
                <div className="flex items-center">
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
              <p className="text-gray-500 text-sm mb-4">
                {getbygigId.description}
              </p>
            )}

            <div className="flex text-sm font-semibold gap-4 border-t pt-4 mb-4">
              {getbygigId.deliveryTime && (
                <div className="text-gray-900 flex items-center gap-2">
                  <Timer size={16} />
                  <p>{getbygigId.deliveryTime}-day delivery</p>
                </div>
              )}
              {getbygigId.revisions && (
                <div className="text-gray-900 flex items-center gap-2">
                  <Repeat2 size={16} />
                  <p>{getbygigId.revisions} Revisions</p>
                </div>
              )}
            </div>

            <button className="w-full p-3 bg-gray-800 rounded-sm text-white font-semibold hover:bg-gray-700 transition-colors duration-200">
              Request to order
            </button>
          </div>
        </div>
      )}

      <div className="hidden lg:flex fixed right-10 top-25 z-10 min-h-screen w-full md:w-96 items-start justify-end">
        <div className="w-full md:w-96 bg-white h-full overflow-y-auto border border-gray-300 rounded-lg shadow-lg">
          <div className="p-6 flex flex-col gap-4">
            <div className="flex w-full justify-end">
              <Heart
                size={20}
                className="text-gray-500 hover:text-red-500 transition-colors duration-200"
              />
            </div>
            <div className="flex justify-between items-start">
              <h1 className="text-lg font-bold">
                {removePrefixFromName(getbygigId.title)}
              </h1>
              {getbygigId.price && (
                <div className="flex items-center">
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
            <div className="mt-4 flex text-sm font-semibold gap-4 border-t pt-4">
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
            <button
              onClick={() => navigate(`/checkout/${id}`)}
              className="w-full p-4 bg-gray-800 rounded-sm text-white font-semibold hover:bg-gray-700 transition-colors duration-200"
            >
              Request to order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
