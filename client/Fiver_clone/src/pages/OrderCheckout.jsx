import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Timer, Repeat2, ArrowLeft, CreditCard, Shield } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getGigByGigId } from "../redux/GigSlice/gigSlice";
import {
  getFreelancerDetails,
  getUserDetails,
} from "../redux/AuthSlice/authSlice";
import { placeOrder } from "../redux/OrderSlice/orderSlice";
import toast from "react-hot-toast";
import PaymentPage from "./PaymentPage";

export default function OrderCheckout() {
  const [requirements, setRequirements] = useState("");
  const [agreeToCancellation, setAgreeToCancellation] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [placeOrderError, setPlaceOrderError] = useState(null);
  const [currentOrder, setCurrentOrder] = useState(null);

  // Redux selectors
  const { getbygigId, loading: gigLoading } = useSelector((state) => state.gig);
  const {
    freelancer,
    email,
    userDetails,
    loading: authLoading,
  } = useSelector((state) => state.auth);
  const { currentOrder: currentOrderState, loading: orderLoading } =
    useSelector((state) => state.order);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  // Memoized values to prevent unnecessary recalculations
  const userId = useMemo(() => getbygigId?.userId, [getbygigId?.userId]);
  const currentUserId = useMemo(() => userDetails?.id, [userDetails?.id]);

  const pricing = useMemo(() => {
    const gigPrice =
      typeof getbygigId?.price === "number"
        ? getbygigId.price
        : parseFloat(getbygigId?.price) || 0;
    const serviceFee = Math.round(gigPrice * 0.05 * 100) / 100;
    const total = gigPrice + serviceFee;

    return { gigPrice, serviceFee, total };
  }, [getbygigId?.price]);

  // Fetch user details only once when email changes
  useEffect(() => {
    if (email && !userDetails) {
      dispatch(getUserDetails(email));
    }
  }, [dispatch, email, userDetails]);

  // Fetch gig details only once when id changes
  useEffect(() => {
    if (id && (!getbygigId || getbygigId.id !== id)) {
      dispatch(getGigByGigId(id));
    }
  }, [dispatch, id, getbygigId]);

  // Fetch freelancer details only when userId changes and we don't have the data
  useEffect(() => {
    if (userId && (!freelancer || freelancer.id !== userId)) {
      dispatch(getFreelancerDetails(userId));
    }
  }, [dispatch, userId, freelancer]);

  // Handle order state changes
  useEffect(() => {
    if (currentOrderState && currentOrderState.clientSecret && !showPayment) {
      setCurrentOrder({
        id: currentOrderState.id,
        clientSecret: currentOrderState.clientSecret,
        paymentIntentId: currentOrderState.paymentIntentId,
      });
      setShowPayment(true);
    }
  }, [currentOrderState, showPayment]);

  const handlePlaceOrder = useCallback(async () => {
    if (!currentUserId || !getbygigId) {
      toast.error("Missing user or gig information");
      return;
    }

    if (isPlacingOrder) return;

    const orderData = {
      buyerId: currentUserId,
      sellerId: getbygigId.userId,
      gigId: getbygigId.id,
      price: getbygigId.price,
      requirements: requirements.trim() || null,
    };

    setIsPlacingOrder(true);
    setPlaceOrderError(null);

    try {
      const resultAction = await dispatch(placeOrder(orderData));

      if (placeOrder.fulfilled.match(resultAction)) {
        toast.success("Order created successfully!");
        setTimeout(() => {
          navigate(`/checkout/payment/${id}/${resultAction.payload.id}`);
          window.location.reload();
        }, 1000);
      } else {
        const errorMessage =
          resultAction.payload?.message || "Failed to create order";
        setPlaceOrderError(errorMessage);
        toast.error(errorMessage);
      }
    } catch (error) {
      console.error("Error creating order:", error);
      const errorMessage = error.message || "An unexpected error occurred";
      setPlaceOrderError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsPlacingOrder(false);
    }
  }, [currentUserId, getbygigId, requirements, isPlacingOrder, dispatch]);

  const handleBack = useCallback(() => {
    if (showPayment) {
      setShowPayment(false);
      setCurrentOrder(null);
    } else {
      navigate(-1);
    }
  }, [showPayment, navigate]);

  const removePrefixFromName = useCallback((name) => {
    if (
      name &&
      typeof name === "string" &&
      name.toLowerCase().startsWith("i will")
    ) {
      return name.substring(6).trim();
    }
    return name || "";
  }, []);

  // Show loading state
  if (gigLoading || authLoading || !getbygigId || !userDetails) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading order details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-4 transition-colors"
          >
            <ArrowLeft size={20} />
            <span>Back to gig</span>
          </button>
          <h1 className="text-3xl font-bold text-gray-900">
            Review your order
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold mb-4">Gig Details</h2>
              <div className="flex gap-4">
                {getbygigId.imageUrl1 && (
                  <img
                    src={getbygigId.imageUrl1}
                    alt={getbygigId.title}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                )}
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-2">
                    {removePrefixFromName(getbygigId.title)}
                  </h3>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    {getbygigId.deliveryTime && (
                      <div className="flex items-center gap-1">
                        <Timer size={16} />
                        <span>{getbygigId.deliveryTime}-day delivery</span>
                      </div>
                    )}
                    {getbygigId.revisions && (
                      <div className="flex items-center gap-1">
                        <Repeat2 size={16} />
                        <span>{getbygigId.revisions} revisions</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {freelancer && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-semibold mb-4">Freelancer</h2>
                <div className="flex items-center gap-4">
                  <img
                    src={freelancer.picture}
                    alt={freelancer.username}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-semibold text-lg uppercase">
                      {freelancer.username}
                    </h3>
                    <p className="text-gray-600">Freelancer</p>
                  </div>
                </div>
              </div>
            )}

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold mb-4">Requirements</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Describe your requirements
                  </label>
                  <textarea
                    value={requirements}
                    onChange={(e) => setRequirements(e.target.value)}
                    placeholder="Please provide detailed information about what you need..."
                    className="w-full h-32 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Be as specific as possible to ensure the best results
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold mb-4">Terms & Conditions</h2>
              <div className="space-y-4">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={agreeToCancellation}
                    onChange={(e) => setAgreeToCancellation(e.target.checked)}
                    className="mt-1 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <div className="text-sm text-gray-700">
                    <p className="font-medium mb-1">Cancellation Policy</p>
                    <p>
                      I understand that cancelling an order may affect my
                      ability to purchase from this seller in the future, and
                      that some orders cannot be cancelled once work has begun.
                    </p>
                  </div>
                </label>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-8">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Service Price</span>
                  <span className="font-semibold">
                    ₹{pricing.gigPrice.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Service fee</span>
                  <span className="font-semibold">
                    ₹{pricing.serviceFee.toFixed(2)}
                  </span>
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between items-center text-lg font-semibold">
                    <span>Total</span>
                    <span className="text-green-600">
                      ₹{pricing.total.toFixed(2)}
                    </span>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                    <Shield size={16} />
                    <span>Secure payment with Stripe</span>
                  </div>

                  <button
                    onClick={handlePlaceOrder}
                    disabled={
                      !agreeToCancellation || isPlacingOrder || orderLoading
                    }
                    className="w-full bg-gray-800 text-white py-3 px-4 rounded-md font-semibold hover:bg-gray-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center gap-2"
                  >
                    {isPlacingOrder || orderLoading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Processing...</span>
                      </>
                    ) : (
                      <>
                        <CreditCard size={16} />
                        <span>Continue to Payment</span>
                      </>
                    )}
                  </button>

                  {placeOrderError && (
                    <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
                      <p className="text-red-700 text-sm">{placeOrderError}</p>
                    </div>
                  )}
                </div>

                <div className="text-xs text-gray-500 text-center">
                  <p>By continuing, you agree to Fiverr's Terms of Service</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
