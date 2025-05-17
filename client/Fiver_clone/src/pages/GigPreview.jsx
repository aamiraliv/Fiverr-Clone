import { Heart } from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getGigByGigId } from "../redux/GigSlice/gigSlice";

export default function GigPreview() {
  const { getbygigId, getbygigIdloding } = useSelector((state) => state.gig);
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getGigByGigId(id));
  }, [dispatch, id]);

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
        <div className="loader"></div>
      </div>
    );
  }

  // Handle case where data hasn't loaded yet or is undefined
  if (!getbygigId || !getbygigId.title) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500">No gig information available</p>
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="fixed right-0 top-0 z-10 flex min-h-screen w-full md:w-96 items-start justify-end bg-black/50">
        <div className="w-full md:w-96 bg-white h-full overflow-y-auto">
          <div className="p-6 flex flex-col gap-4">
            {/* Gig header with title and favorite button */}
            <div className="flex justify-between items-center">
              <h1 className="text-xl font-bold">
                {removePrefixFromName(getbygigId.title)}
              </h1>
              <button
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Add to favorites"
              >
                <Heart size={24} className="text-gray-500 hover:text-red-500" />
              </button>
            </div>

            {/* Gig details section */}
            <div className="mt-4 flex flex-col gap-4 border-t pt-4">
              {getbygigId.description && (
                <div className="text-gray-700">
                  <h2 className="font-semibold mb-2">Description</h2>
                  <p>{getbygigId.description}</p>
                </div>
              )}

              {/* Price information */}
              {getbygigId.price && (
                <div className="mt-2 flex items-center">
                  <span className="font-semibold">Price:</span>
                  <span className="ml-2 text-lg text-green-600">
                    $
                    {typeof getbygigId.price === "number"
                      ? getbygigId.price.toFixed(2)
                      : getbygigId.price}
                  </span>
                </div>
              )}

              {/* Additional gig information can be added here */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
