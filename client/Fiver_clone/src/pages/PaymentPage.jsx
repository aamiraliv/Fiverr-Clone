import React, { useState } from "react";
import {
  ArrowLeft,
  CreditCard,
  Shield,
  Check,
  Star,
  Calendar,
  Clock,
  User,
  Mail,
  Phone,
} from "lucide-react";
import { useDispatch } from "react-redux";
import { confirmOrderPayment } from "../redux/OrderSlice/orderSlice";


function OrderSuccess({ gig, freelancer, order }) {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Check className="w-8 h-8 text-green-600" />
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Payment Successful!
        </h2>
        <p className="text-gray-600 mb-6">
          Your order has been confirmed and the freelancer will be notified.
        </p>

        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <div className="flex items-center gap-3 mb-3">
            <img
              src={freelancer?.picture || "/api/placeholder/40/40"}
              alt={freelancer?.username || "Freelancer"}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div className="text-left">
              <p className="font-semibold text-gray-900">
                {freelancer?.username || "Unknown Freelancer"}
              </p>
              <p className="text-sm text-gray-600">{gig?.title || "Service"}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-lg font-bold text-green-600">
              ₹{gig?.price || "0"}
            </p>
          </div>
        </div>

        <div className="space-y-2 text-sm text-gray-600 mb-6">
          <p>
            <strong>Order ID:</strong> #{order?.id || "ORD-" + Date.now()}
          </p>
          <p>
            <strong>Estimated Delivery:</strong>{" "}
            {gig?.deliveryTime || "3-5 business days"}
          </p>
        </div>

        <button
          onClick={() => (window.location.href = "/orders")}
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-md font-semibold hover:bg-blue-700 transition-colors"
        >
          View My Orders
        </button>
      </div>
    </div>
  );
}

function PaymentPage({ gig, freelancer, order, onBack }) {
  const dispatch = useDispatch();
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [cardDetails, setCardDetails] = useState({
    number: "",
    expiry: "",
    cvc: "",
    name: "",
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentError, setPaymentError] = useState("");
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [reduxPaymentError, setReduxPaymentError] = useState(null);
  const [billingDetails, setBillingDetails] = useState({
    email: "",
    phone: "",
  });

  const validateForm = () => {
    if (!cardDetails.number || cardDetails.number.length < 16) {
      setPaymentError("Please enter a valid card number");
      return false;
    }
    if (!cardDetails.expiry || cardDetails.expiry.length < 5) {
      setPaymentError("Please enter a valid expiry date");
      return false;
    }
    if (!cardDetails.cvc || cardDetails.cvc.length < 3) {
      setPaymentError("Please enter a valid CVC");
      return false;
    }
    if (!cardDetails.name.trim()) {
      setPaymentError("Please enter the cardholder name");
      return false;
    }
    if (!billingDetails.email || !billingDetails.email.includes("@")) {
      setPaymentError("Please enter a valid email address");
      return false;
    }
    return true;
  };

  const handlePayment = async () => {
    if (!validateForm()) return;

    setIsProcessing(true);
    setIsProcessingPayment(true);
    setPaymentError("");
    setReduxPaymentError(null);

    try {
      dispatch(
        confirmOrderPayment({
          orderId: order?.id,
          paymentIntentId: order?.paymentIntentId,
        })
      ).unwrap();

      await new Promise((resolve, reject) => {
        setTimeout(() => {
          if (Math.random() > 0.9) {
            reject(new Error("Payment failed. Please try again."));
          } else {
            resolve();
          }
        }, 2000);
      });

      setPaymentSuccess(true);
    } catch (error) {
      setReduxPaymentError(
        error.message || "Payment failed. Please try again."
      );
    } finally {
      setIsProcessing(false);
      setIsProcessingPayment(false);
    }
  };

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const parts = [];
    for (let i = 0; i < v.length; i += 4) {
      parts.push(v.substring(i, i + 4));
    }
    return parts.join(" ");
  };

  const formatExpiry = (value) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    if (v.length >= 2) {
      return v.substring(0, 2) + "/" + v.substring(2, 4);
    }
    return v;
  };

  // Calculate totals
  const gigPrice =
    typeof gig?.price === "number" ? gig.price : parseFloat(gig?.price) || 0;
  const serviceFee = Math.round(gigPrice * 0.05 * 100) / 100; // 5% service fee
  const total = gigPrice + serviceFee;

  if (paymentSuccess) {
    return <OrderSuccess gig={gig} freelancer={freelancer} order={order} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-4 transition-colors"
          >
            <ArrowLeft size={20} />
            <span>Back to order</span>
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Secure Payment</h1>
          <p className="text-gray-600 mt-2">
            Complete your order with our secure payment system
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Payment Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Billing Information */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <User size={20} />
                Billing Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={billingDetails.email}
                    onChange={(e) =>
                      setBillingDetails({
                        ...billingDetails,
                        email: e.target.value,
                      })
                    }
                    placeholder="john@example.com"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={billingDetails.phone}
                    onChange={(e) =>
                      setBillingDetails({
                        ...billingDetails,
                        phone: e.target.value,
                      })
                    }
                    placeholder="+91 9876543210"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <CreditCard size={20} />
                Payment Method
              </h2>

              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      value="card"
                      checked={paymentMethod === "card"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="h-4 w-4 text-blue-600"
                    />
                    <CreditCard size={20} />
                    <span>Credit/Debit Card</span>
                  </label>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Card Number *
                    </label>
                    <input
                      type="text"
                      value={cardDetails.number}
                      onChange={(e) =>
                        setCardDetails({
                          ...cardDetails,
                          number: formatCardNumber(e.target.value),
                        })
                      }
                      placeholder="1234 5678 9012 3456"
                      maxLength="19"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Expiry Date *
                      </label>
                      <input
                        type="text"
                        value={cardDetails.expiry}
                        onChange={(e) =>
                          setCardDetails({
                            ...cardDetails,
                            expiry: formatExpiry(e.target.value),
                          })
                        }
                        placeholder="MM/YY"
                        maxLength="5"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        CVC *
                      </label>
                      <input
                        type="text"
                        value={cardDetails.cvc}
                        onChange={(e) =>
                          setCardDetails({
                            ...cardDetails,
                            cvc: e.target.value
                              .replace(/\D/g, "")
                              .substring(0, 3),
                          })
                        }
                        placeholder="123"
                        maxLength="3"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Cardholder Name *
                    </label>
                    <input
                      type="text"
                      value={cardDetails.name}
                      onChange={(e) =>
                        setCardDetails({ ...cardDetails, name: e.target.value })
                      }
                      placeholder="John Doe"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                {(paymentError || reduxPaymentError) && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                    <p className="text-red-700 text-sm">
                      {paymentError || reduxPaymentError}
                    </p>
                  </div>
                )}

                <button
                  onClick={handlePayment}
                  disabled={isProcessing || isProcessingPayment}
                  className="w-full bg-green-600 text-white py-3 px-4 rounded-md font-semibold hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center gap-2"
                >
                  {isProcessing || isProcessingPayment ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Processing Payment...</span>
                    </>
                  ) : (
                    <>
                      <Shield size={16} />
                      <span>Pay ₹{total.toFixed(2)}</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-8">
              <h3 className="text-lg font-semibold mb-4">Order Summary</h3>

              {/* Gig Details */}
              <div className="border-b border-gray-200 pb-4 mb-4">
                <div className="flex items-start gap-3">
                  <img
                    src={gig?.thumbnailUrl || "/api/placeholder/60/60"}
                    alt={gig?.title || "Service"}
                    className="w-15 h-15 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 text-sm leading-tight">
                      {gig?.title || "Service Title"}
                    </h4>
                    <p className="text-xs text-gray-500 mt-1">
                      {gig?.category || "Service Category"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Freelancer Details */}
              <div className="border-b border-gray-200 pb-4 mb-4">
                <div className="flex items-center gap-3">
                  <img
                    src={freelancer?.picture || "/api/placeholder/40/40"}
                    alt={freelancer?.username || "Freelancer"}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 text-sm">
                      {freelancer?.username || "Unknown Freelancer"}
                    </p>
                    <div className="flex items-center gap-1 mt-1">
                      <Star
                        size={12}
                        className="text-yellow-400 fill-current"
                      />
                      <span className="text-xs text-gray-600">
                        {freelancer?.rating || "5.0"} (
                        {freelancer?.reviewCount || "0"} reviews)
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Delivery Info */}
              <div className="border-b border-gray-200 pb-4 mb-4 space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Clock size={14} />
                  <span>
                    Delivery: {gig?.deliveryTime || "3-5 business days"}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar size={14} />
                  <span>Order Date: {new Date().toLocaleDateString()}</span>
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Service Price</span>
                  <span className="text-gray-900">₹{gigPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Service Fee</span>
                  <span className="text-gray-900">
                    ₹{serviceFee.toFixed(2)}
                  </span>
                </div>
                <div className="border-t border-gray-200 pt-3">
                  <div className="flex justify-between text-lg font-semibold">
                    <span className="text-gray-900">Total</span>
                    <span className="text-green-600">₹{total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Security Notice */}
              <div className="mt-6 p-3 bg-blue-50 border border-blue-200 rounded-md">
                <div className="flex items-center gap-2 text-blue-700 text-sm">
                  <Shield size={14} />
                  <span className="font-medium">Secure Payment</span>
                </div>
                <p className="text-blue-600 text-xs mt-1">
                  Your payment information is encrypted and secure.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaymentPage;
